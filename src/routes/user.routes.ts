import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { UserController } from '../controllers/user.controller';

const router = Router();

router.get('/info', authMiddleware, UserController.getMyInfo);

router.get('/:id', authMiddleware, UserController.getUserInfo);

export default router;
