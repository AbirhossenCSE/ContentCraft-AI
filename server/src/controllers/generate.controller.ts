import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import axios from 'axios';
import User from '../models/User';
import { buildPrompt } from '../utils/promptTemplates';
import { openRouter, MODEL } from '../config/openrouter';

const generateSchema = z.object({
  topic: z.string().trim().min(3, 'Topic must be at least 3 characters long'),
  type: z.enum(['blog', 'caption', 'description', 'newsletter']),
  tone: z.string().trim().min(1, 'Tone is required'),
  length: z.enum(['short', 'medium', 'long']),
  audience: z.string().trim().optional(),
  language: z.enum(['en', 'bn']).optional().default('en'),
});

export const generateContent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // 1. Validate request body
    const validationResult = generateSchema.safeParse(req.body);
    if (!validationResult.success) {
      res.status(400).json({
        status: 'error',
        message: validationResult.error.issues[0].message,
      });
      return;
    }

    const { topic, type, tone, length, audience, language } =
      validationResult.data;

    // 2. Fetch User and verify credits
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({
        status: 'error',
        message: 'Unauthorized access.',
      });
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'User not found.',
      });
      return;
    }

    // Check and apply daily credit reset if a new day has started
    await user.checkAndResetCredits();

    if (user.credits <= 0) {
      res.status(402).json({
        status: 'error',
        message:
          'Insufficient credits. Please top up your account to generate more content.',
      });
      return;
    }

    // 3. Build AI prompt
    const { system, user: userPrompt } = buildPrompt(
      type,
      topic,
      tone,
      length,
      audience,
      language
    );

    // 4. Call OpenRouter API
    let generatedContent = '';
    try {
      const response = await openRouter.post('/chat/completions', {
        model: MODEL,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: userPrompt },
        ],
      });

      generatedContent = response.data?.choices?.[0]?.message?.content;
      if (!generatedContent) {
        throw new Error('No content returned from OpenRouter API.');
      }
    } catch (apiError: unknown) {
      let statusCode = 500;
      let errorMessage =
        'An error occurred while generating content. Please try again.';

      if (axios.isAxiosError(apiError)) {
        console.error(
          'OpenRouter API Error:',
          apiError.response?.data || apiError.message
        );

        if (apiError.response) {
          const apiStatus = apiError.response.status;
          if (apiStatus === 429) {
            statusCode = 429;
            errorMessage =
              'Too many requests. Please slow down and try again later.';
          } else if (apiStatus === 401 || apiStatus === 403) {
            statusCode = 500;
            errorMessage =
              'AI service configuration issue. Please contact support.';
          } else if (apiStatus >= 500) {
            statusCode = 502;
            errorMessage =
              'The AI provider is currently experiencing issues. Please try again later.';
          }
        } else if (
          apiError.code === 'ECONNABORTED' ||
          apiError.message?.includes('timeout')
        ) {
          statusCode = 504;
          errorMessage = 'The generation request timed out. Please try again.';
        }
      } else {
        const error = apiError as Error;
        console.error('Unknown generation error:', error.message || error);
      }

      res.status(statusCode).json({
        status: 'error',
        message: errorMessage,
      });
      return;
    }

    // 5. Deduct credit, save user, and return response
    user.credits -= 1;
    await user.save();

    const wordCount = generatedContent
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;

    res.status(200).json({
      content: generatedContent,
      wordCount,
      creditsRemaining: user.credits,
      generatedAt: new Date(),
    });
  } catch (error) {
    next(error);
  }
};
