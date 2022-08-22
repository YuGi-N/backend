import { Router } from 'express';
import { MovieRouter } from './movie';
import { UserRouter } from './user';

const router = Router();

router.use('/movie', MovieRouter);
router.use('/user', UserRouter);

export { router as API };