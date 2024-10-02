import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { RequestController } from '../controllers/request.controller';

const router = Router();

router.get('/user/:id', authMiddleware, RequestController.getUserRequests);

router.post(
	'/priority',
	authMiddleware,
	RequestController.updateRequestsPriority
);

router.post(
	'/create/:projectId',
	authMiddleware,
	RequestController.updateRequestsPriority
);

export default router;
