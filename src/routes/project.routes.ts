import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { ProjectController } from '../controllers/project.controller';

const router = Router();

router.get('/user/:id', authMiddleware, ProjectController.getUserProjects);
router.get('/list', authMiddleware, ProjectController.getProjects);
router.get('/:id', authMiddleware, ProjectController.getProject);
router.get(
	'/get-poster/:id',
	authMiddleware,
	ProjectController.getProjectPoster
);
router.get('/get-users/:id', authMiddleware, ProjectController.getProjectUsers);

router.post('/create', authMiddleware, ProjectController.createProject);
router.post('/update/:id', authMiddleware, ProjectController.updateProject);
router.post('/approve/:id', authMiddleware, ProjectController.approveProject);
router.post('/reject/:id', authMiddleware, ProjectController.rejectProject);

export default router;
