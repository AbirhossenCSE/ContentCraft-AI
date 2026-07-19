import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

export const getUserCredits = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
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

    res.status(200).json({
      status: 'success',
      credits: user.credits,
    });
  } catch (error) {
    next(error);
  }
};
