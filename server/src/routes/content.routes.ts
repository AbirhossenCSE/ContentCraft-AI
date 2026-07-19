import { Router } from 'express';
import {
  saveContent,
  getContents,
  deleteContent,
  toggleFavorite,
} from '../controllers/content.controller';
import { verifyToken } from '../middlewares/verifyToken';

const router = Router();

// Apply verifyToken middleware on all routes
router.use(verifyToken);

router.post('/save', saveContent);
router.get('/', getContents);
router.delete('/:id', deleteContent);
router.patch('/:id/favorite', toggleFavorite);

export default router;
