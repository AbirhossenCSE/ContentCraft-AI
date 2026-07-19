import { Router } from 'express';
import { getUserCredits } from '../controllers/user.controller';
import { verifyToken } from '../middlewares/verifyToken';

const router = Router();

router.get('/credits', verifyToken, getUserCredits);

export default router;
