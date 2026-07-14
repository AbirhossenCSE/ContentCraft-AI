import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import User from '../models/User';

const registerSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().trim().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validationResult = registerSchema.safeParse(req.body);
    if (!validationResult.success) {
      res.status(400).json({
        status: 'error',
        message: validationResult.error.issues[0].message,
      });
      return;
    }

    const { name, email, password } = validationResult.data;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res
        .status(400)
        .json({ status: 'error', message: 'Email is already registered' });
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate JWT
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not configured.');
    }

    const token = jwt.sign({ userId: newUser._id.toString() }, jwtSecret, {
      expiresIn: '7d',
    });

    res.status(201).json({
      status: 'success',
      token,
      user: {
        id: newUser._id.toString(),
        name: newUser.name,
        email: newUser.email,
        credits: newUser.credits,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

const loginSchema = z.object({
  email: z.string().trim().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validationResult = loginSchema.safeParse(req.body);
    if (!validationResult.success) {
      res.status(400).json({
        status: 'error',
        message: validationResult.error.issues[0].message,
      });
      return;
    }

    const { email, password } = validationResult.data;

    const user = await User.findOne({ email });
    if (!user) {
      res
        .status(401)
        .json({ status: 'error', message: 'Invalid email or password' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res
        .status(401)
        .json({ status: 'error', message: 'Invalid email or password' });
      return;
    }

    // Generate JWT
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not configured.');
    }

    const token = jwt.sign({ userId: user._id.toString() }, jwtSecret, {
      expiresIn: '7d',
    });

    res.status(200).json({
      status: 'success',
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        credits: user.credits,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};
