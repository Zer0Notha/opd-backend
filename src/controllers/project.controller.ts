import { Request, Response } from 'express';
import ApiStatus from '../handlers/api.handler';
import { ProjectService } from '../services/project.service';
import { CreateProject, GenerateTokenProps } from '../types';

export class ProjectController {
	static async getUserProjects(req: Request, res: Response) {
		try {
			const { id } = req.params;
			if (!id) throw ApiStatus.badRequest('User not found');

			const projects = await ProjectService.getUserProjects(id);

			return res.status(200).json({
				...projects,
			});
		} catch (e) {
			return res.status(500).json({
				message: (e as Error).message,
			});
		}
	}

	static async getProject(req: Request, res: Response) {
		try {
			const { id } = req.params;
			if (!id) throw ApiStatus.badRequest('Project not found');

			const project = await ProjectService.getProject(id);

			return res.status(200).json({
				project,
			});
		} catch (e) {
			return res.status(500).json({
				message: (e as Error).message,
			});
		}
	}

	static async createProject(
		req: Request<never, never, Omit<CreateProject, 'status' | 'managerId'>>,
		res: Response
	) {
		try {
			//@ts-ignore
			const user = req.user as GenerateTokenProps;
			const projectDto = req.body;

			if (user.role !== 'mentor' && user.role !== 'teacher') {
				throw ApiStatus.forbidden('Forbidden');
			}

			const status = user.role === 'teacher' ? 'opened' : 'not_confirmed';

			const project = await ProjectService.createProject({
				...projectDto,
				status,
				managerId: user.id,
			});

			return res.status(200).json({
				project,
			});
		} catch (e) {
			return res.status(500).json({
				message: (e as Error).message,
			});
		}
	}
}
