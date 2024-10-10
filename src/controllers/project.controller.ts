import { Request, Response } from 'express';
import ApiStatus from '../handlers/api.handler';
import { ProjectService } from '../services/project.service';
import { CreateProject, GenerateTokenProps, UpdateProject } from '../types';
import { UploadedFile } from 'express-fileupload';
import { v4 as uuidv4, v4 } from 'uuid';
import path from 'path';

export class ProjectController {
	static async getUserProjects(req: Request, res: Response) {
		try {
			const { id } = req.params;
			if (!id) throw ApiStatus.badRequest('User not found');

			const projects = await ProjectService.getUserProjects(id);

			return res.status(200).json({
				projects,
			});
		} catch (e) {
			return res.status(500).json({
				message: (e as Error).message,
			});
		}
	}
	static async getProjects(req: Request, res: Response) {
		try {
			const projects = await ProjectService.getProjects();

			return res.status(200).json({
				projects,
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
				...project,
			});
		} catch (e) {
			return res.status(500).json({
				message: (e as Error).message,
			});
		}
	}

	static async getProjectPoster(req: Request, res: Response) {
		try {
			const { id } = req.params;
			if (!id) throw ApiStatus.badRequest('Project not found');

			const project = await ProjectService.getProject(id);

			return res
				.status(200)
				.sendFile(path.join(__dirname, '../../files/' + project.poster));
		} catch (e) {
			return res.status(500).json({
				message: (e as Error).message,
			});
		}
	}

	static async getProjectUsers(req: Request, res: Response) {
		try {
			const { id } = req.params;
			if (!id) throw ApiStatus.badRequest('Project not found');

			const users = await ProjectService.getProjectUsers(id);

			return res.status(200).json({ users });
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

			const allowedRoles = ['mentor', 'teacher'];

			if (!allowedRoles.includes(user.role)) {
				throw ApiStatus.forbidden('Forbidden');
			}

			if (!req.files) {
				throw ApiStatus.badRequest('No poster file provided');
			}

			const file = req.files.file as UploadedFile;

			const fileName =
				v4({}) + '.' + file.name.split('.')[file.name.split('.').length - 1];

			const path = __dirname + '../../../files/' + fileName;

			file.mv(path, (err) => {
				if (err) throw ApiStatus.badRequest('Error on file upload');
			});

			const status = user.role === 'teacher' ? 'opened' : 'not_confirmed';

			const project = await ProjectService.createProject({
				...projectDto,
				status,
				poster: fileName,
				maxUserNum: Number(projectDto.maxUserNum),
				managerId: user.id,
			});

			await ProjectService.addTeamMember(user.id, project.id);

			return res.status(200).json({
				project,
			});
		} catch (e) {
			return res.status(500).json({
				message: (e as Error).message,
			});
		}
	}

	static async updateProject(
		req: Request<never, never, Omit<UpdateProject, 'id' | 'status'>>,
		res: Response
	) {
		try {
			//@ts-ignore
			const user = req.user as GenerateTokenProps;
			const projectDto = req.body;

			const { id } = req.params;
			if (!id) throw ApiStatus.badRequest('Project not found');

			const candidate = await ProjectService.getProject(id);
			const allowedRoles = ['mentor', 'teacher'];

			if (
				user.id !== candidate.managerId ||
				!allowedRoles.includes(user.role)
			) {
				throw ApiStatus.forbidden('Forbidden');
			}

			const project = await ProjectService.updateProject({
				...projectDto,
				status: 'not_confirmed',
				id,
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

	static async approveProject(req: Request, res: Response) {
		try {
			//@ts-ignore
			const user = req.user as GenerateTokenProps;

			const allowedRoles = ['mentor', 'teacher'];

			if (!allowedRoles.includes(user.role)) {
				throw ApiStatus.forbidden('Forbidden');
			}

			const { id } = req.params;
			if (!id) throw ApiStatus.badRequest('Project not found');

			const project = await ProjectService.updateProject({
				status: 'opened',
				id,
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

	static async rejectProject(req: Request, res: Response) {
		try {
			//@ts-ignore
			const user = req.user as GenerateTokenProps;

			const allowedRoles = ['mentor', 'teacher'];

			if (!allowedRoles.includes(user.role)) {
				throw ApiStatus.forbidden('Forbidden');
			}

			const { id } = req.params;
			if (!id) throw ApiStatus.badRequest('Project not found');

			const project = await ProjectService.updateProject({
				status: 'rejected',
				id,
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
