import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import { MovieRouter } from './movie';
import { UserRouter } from './user';

const router = Router();

router.use('/movie', authMiddleware, MovieRouter);
router.use('/user', UserRouter);

export { router as API };