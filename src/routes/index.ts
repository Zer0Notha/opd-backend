import { Router } from 'express';
import authRouter from './auth.routes';
import userRouter from './user.routes';
import projectRouter from './project.routes';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/project', projectRouter);

export default router;
