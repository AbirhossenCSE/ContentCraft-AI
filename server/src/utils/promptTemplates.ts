export type ContentType = 'blog' | 'caption' | 'description' | 'newsletter';
export type ContentLength = 'short' | 'medium' | 'long';

export interface PromptResult {
  system: string;
  user: string;
}

const lengthLimits: Record<ContentType, Record<ContentLength, string>> = {
  blog: {
    short: 'around 150-200 words',
    medium: 'around 400-500 words',
    long: 'around 800-1000 words',
  },
  caption: {
    short: 'very short and punchy, around 20-40 words',
    medium: 'moderately detailed, around 60-90 words',
    long: 'comprehensive and highly engaging, around 120-150 words',
  },
  description: {
    short: 'brief and concise, around 50-80 words',
    medium: 'balanced and detailed, around 150-200 words',
    long: 'in-depth and persuasive, around 300-400 words',
  },
  newsletter: {
    short: 'concise and direct, around 100-150 words',
    medium: 'informative and engaging, around 250-350 words',
    long: 'detailed and deep, around 500-700 words',
  },
};

const contentTypeInstructions: Record<ContentType, string> = {
  blog: `You are an expert blogger. Write a well-structured blog post. 
- Use a compelling title/headline.
- Create clear headings (using Markdown #, ##, ###) to separate sections.
- Include an engaging introduction that hooks the reader, followed by informative body paragraphs, and a concise conclusion with a final thought or takeaway.
- Keep the style informative, readable, and highly valuable.`,

  caption: `You are an expert social media copywriter. Write a highly engaging social media caption.
- Start with a powerful hook in the first sentence to stop users from scrolling.
- Keep the paragraphs short and scan-ready, using line breaks.
- Integrate emojis naturally to make it visually engaging and friendly.
- End with a strong Call to Action (CTA) and 3-5 relevant, trending hashtags.`,

  description: `You are a persuasive product copywriter. Write a high-converting product/service description.
- Start with an attention-grabbing tagline that defines the value proposition.
- Focus heavily on user benefits (why it matters to them) rather than just listing technical features.
- Use a bulleted list for key features/benefits to make the details easy to scan.
- End with a clear call to action or purchase instruction.`,

  newsletter: `You are a professional email marketer. Write an engaging email newsletter.
- Suggest 2-3 potential Subject Line options at the very top.
- Write a warm, personal greeting/salutation.
- Keep the writing conversational, engaging, and story-driven where possible.
- Include a clear call to action (CTA) button/link placeholder.
- End with a friendly sign-off/signature placeholder.`,
};

/**
 * Builds the system and user prompts for Groq LLM generation.
 *
 * @param type The type of content to generate ('blog', 'caption', 'description', 'newsletter')
 * @param topic The topic or main idea of the content
 * @param tone The tone of voice (e.g. professional, humorous, educational, witty)
 * @param length The length category ('short', 'medium', 'long')
 * @param audience Optional target audience for the content
 * @param language Optional language code (e.g. 'bn' for Bengali, 'en' for English)
 */
export function buildPrompt(
  type: ContentType,
  topic: string,
  tone: string,
  length: ContentLength,
  audience?: string,
  language?: string
): PromptResult {
  // 1. Compile System Instructions
  let systemPrompt = `You are ContentCraft AI, an elite content generation assistant. Your objective is to create outstanding, high-quality content.

Role & Format Guidelines:
${contentTypeInstructions[type]}

Tone of Voice:
- Write in a "${tone}" tone. Maintain this tone consistently throughout the entire output.

Length Requirement:
- The generated content must be ${lengthLimits[type][length]}. Do not write significantly more or less than this target.

Formatting:
- Use clean Markdown syntax.
- Do not wrap the final content in conversational preambles (like "Here is your blog post:") or postscripts (like "Hope this helps!"). Start directly with the content.`;

  // 2. Handle Language constraints (e.g., Bengali)
  if (language === 'bn' || (language && language.toLowerCase() === 'bn')) {
    systemPrompt += `\n\nLanguage Requirement:
- IMPORTANT: You MUST write the entire generated content in Bengali (বাংলা). Maintain the requested tone ("${tone}") naturally within the Bengali language. Translate all formatting structure appropriately.`;
  } else if (language) {
    systemPrompt += `\n\nLanguage Requirement:
- IMPORTANT: You MUST write the entire generated content in the requested language/locale: ${language}.`;
  }

  // 3. Compile User Prompt
  const audienceInfo = audience
    ? `Target Audience: ${audience}`
    : 'Target Audience: General audience';

  const userPrompt = `Generate the following content details:
Content Type: ${type.toUpperCase()}
Topic: ${topic}
${audienceInfo}

Please write the content following the system guidelines, structure, and length constraint.`;

  return {
    system: systemPrompt,
    user: userPrompt,
  };
}
