import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { GroupController } from '../controllers/group.controller';

const router = Router();

router.get('/list', authMiddleware, GroupController.getGroups);

export default router;
