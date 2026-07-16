import { Router } from 'express';
import { generateContent } from '../controllers/generate.controller';
import { verifyToken } from '../middlewares/verifyToken';

const router = Router();

router.post('/', verifyToken, generateContent);

export default router;
