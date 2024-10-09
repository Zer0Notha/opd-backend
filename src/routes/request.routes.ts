import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { RequestController } from '../controllers/request.controller';

const router = Router();

router.get('/user/:id', authMiddleware, RequestController.getUserRequests);
router.get(
	'/project/:id',
	authMiddleware,
	RequestController.getProjectRequests
);

router.post(
	'/priority',
	authMiddleware,
	RequestController.updateRequestsPriority
);
router.post(
	'/create/:projectId',
	authMiddleware,
	RequestController.createRequest
);
router.post('/approve/:id', authMiddleware, RequestController.approveRequest);
router.post('/reject/:id', authMiddleware, RequestController.cancelRequest);

export default router;
