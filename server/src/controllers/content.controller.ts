import { Request, Response, NextFunction } from 'express';
import Content from '../models/Content';

export const saveContent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ status: 'error', message: 'Unauthorized' });
      return;
    }

    const { type, topic, tone, length, generatedText } = req.body;

    if (!type || !topic || !tone || !length || !generatedText) {
      res.status(400).json({
        status: 'error',
        message: 'Missing required content parameters in body.',
      });
      return;
    }

    const savedContent = await Content.create({
      userId,
      type,
      topic,
      tone,
      length,
      generatedText,
    });

    res.status(201).json({
      status: 'success',
      content: savedContent,
    });
  } catch (error) {
    next(error);
  }
};

export const getContents = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ status: 'error', message: 'Unauthorized' });
      return;
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const totalCount = await Content.countDocuments({ userId });
    const contents = await Content.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({
      status: 'success',
      contents,
      totalCount,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ status: 'error', message: 'Unauthorized' });
      return;
    }

    const { id } = req.params;
    const content = await Content.findById(id);

    if (!content) {
      res.status(404).json({ status: 'error', message: 'Content not found.' });
      return;
    }

    // Ownership verification
    if (content.userId.toString() !== userId) {
      res.status(403).json({
        status: 'error',
        message: 'Forbidden. You do not own this content.',
      });
      return;
    }

    await content.deleteOne();

    res.status(200).json({
      status: 'success',
      message: 'Content deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};

export const toggleFavorite = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ status: 'error', message: 'Unauthorized' });
      return;
    }

    const { id } = req.params;
    const content = await Content.findById(id);

    if (!content) {
      res.status(404).json({ status: 'error', message: 'Content not found.' });
      return;
    }

    // Ownership verification
    if (content.userId.toString() !== userId) {
      res.status(403).json({
        status: 'error',
        message: 'Forbidden. You do not own this content.',
      });
      return;
    }

    content.isFavorite = !content.isFavorite;
    await content.save();

    res.status(200).json({
      status: 'success',
      content,
    });
  } catch (error) {
    next(error);
  }
};
