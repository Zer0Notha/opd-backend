import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { ProjectController } from '../controllers/project.controller';

const router = Router();

router.get('/user/:id', authMiddleware, ProjectController.getUserProjects);

export default router;
