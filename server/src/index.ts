import dotenv from 'dotenv';
// Load environment variables immediately before any other imports
dotenv.config();

import express, { Request, Response } from 'express';
import dns from 'dns';
import cors from 'cors';
import { connectDB } from './config/db';
import './config/openrouter'; // Trigger validation check on startup
import { errorHandler } from './middlewares/errorHandler';
import authRoutes from './routes/auth.routes';
import generateRoutes from './routes/generate.routes';
import userRoutes from './routes/user.routes';

dns.setServers(['8.8.8.8', '8.8.4.4']);

// Connect to Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Standard Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/generate', generateRoutes);
app.use('/api/user', userRoutes);

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Error handling middleware (MUST be the last middleware)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
