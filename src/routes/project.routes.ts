import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { ProjectController } from '../controllers/project.controller';

const router = Router();

router.get('/user/:id', authMiddleware, ProjectController.getUserProjects);
router.get('/:id', authMiddleware, ProjectController.getProject);

router.post('/create', authMiddleware, ProjectController.createProject);
router.post('/update/:id', authMiddleware, ProjectController.updateProject);

export default router;
