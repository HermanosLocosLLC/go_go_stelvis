import { Router } from 'express';
import authRouter from './auth-routes';
import userRouter from './user-routes';
import tripRouter from './trip-routes';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/trip', tripRouter);

export default router;
