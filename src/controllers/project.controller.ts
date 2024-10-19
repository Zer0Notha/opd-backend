import { Request, Response, NextFunction } from 'express';
import ApiStatus from '../handlers/api.handler';
import { ProjectService } from '../services/project.service';
import {
	CreateProject,
	CreateProjectReport,
	GenerateTokenProps,
	UpdateProject,
} from '../types';
import { UploadedFile } from 'express-fileupload';
import { v4 as uuidv4, v4 } from 'uuid';
import path from 'path';
import { ProjectStatus, ProjectType } from '@prisma/client';

export class ProjectController {
	static async getUserProjects(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			if (!id) throw ApiStatus.badRequest('User not found');
			const projects = await ProjectService.getUserProjects(id);
			
			return res.status(200).json({
				projects,
			});
		} catch (e) {
			return next(e);
		}
	}
	static async getProjects(req: Request, res: Response, next: NextFunction) {
		try {
			//@ts-ignore
			const user = req.user as GenerateTokenProps;

			const { status, type } = req.query as {
				status: ProjectStatus | 'null';
				type: ProjectType | 'null';
			};

			let args: {
				status?: ProjectStatus;
				type?: ProjectType;
			} = {};

			if (status !== 'null') {
				args.status = status;
			}

			if (type !== 'null') args.type = type;

			let projects = await ProjectService.getProjects(args);

			if(user.role == 'student'){
				const excludedStatuses: ProjectStatus[] = [
					ProjectStatus.not_confirmed,
					ProjectStatus.rejected,
				];
				projects = projects.filter(
					(project) => !excludedStatuses.includes(project.status)
				);
			}
			
			return res.status(200).json({
				projects,
			});
		} catch (e) {
			return next(e);
		}
	}

	static async getProject(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			if (!id) throw ApiStatus.badRequest('Project not found');

			const project = await ProjectService.getProject(id);

			return res.status(200).json({
				...project,
			});
		} catch (e) {
			return next(e);
		}
	}

	static async getProjectPoster(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			if (!id) throw ApiStatus.badRequest('Project not found');

			const project = await ProjectService.getProject(id);

			return res
				.status(200)
				.sendFile(path.join(__dirname, '../../files/' + project.poster));
			} catch (e) {
				return next(e);
			}
	}

	static async getReportFile(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			if (!id) throw ApiStatus.badRequest('Report not found');

			const reportFile = await ProjectService.getReportFile(id);

			return res.status(200).json({ ...reportFile });
		} catch (e) {
			return next(e);
		}
	}

	static async getProjectUsers(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			if (!id) throw ApiStatus.badRequest('Project not found');

			const users = await ProjectService.getProjectUsers(id);

			return res.status(200).json({ users });
		} catch (e) {
			return next(e);
		}
	}

	static async createProject(
		req: Request<never, never, Omit<CreateProject, 'status' | 'managerId'>>,
		res: Response, 
		next: NextFunction
	) {
		try {
			//@ts-ignore
			const user = req.user as GenerateTokenProps;
			const projectDto = req.body;

			const allowedRoles = ['mentor', 'teacher', 'admin', 'student'];

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

			const status =
				user.role === 'teacher' || user.role === 'admin'
					? 'opened'
					: 'not_confirmed';

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
			return next(e);
		}
	}

	static async createProjectReport(
		req: Request<
			never,
			never,
			Omit<CreateProjectReport, 'projectId' | 'authorId' | 'attachedFile'>
		>,
		res: Response, 
		next: NextFunction
	) {
		try {
			//@ts-ignore
			const user = req.user as GenerateTokenProps;
			const { id } = req.params;

			const reportDto = req.body;

			const users = await ProjectService.getProjectUsers(id);

			if (!users.includes(user.id)) {
				throw ApiStatus.forbidden('Forbidden');
			}

			const file = req.files?.file as UploadedFile;
			let fileName = '';
			let path = '';

			if (file) {
				fileName =
					v4({}) + '.' + file.name.split('.')[file.name.split('.').length - 1];

				path = __dirname + '../../../files/' + fileName;

				file.mv(path, (err) => {
					if (err) throw ApiStatus.badRequest('Error on file upload');
				});
			}

			const report = await ProjectService.createProjectReport({
				...reportDto,
				projectId: id,
				authorId: user.id,
			});

			await ProjectService.createReportFile({
				name: fileName,
				path,
				reportId: report.id,
			});

			return res.status(200).json({
				report,
			});
		} catch (e) {
			return next(e);
		}
	}

	static async updateProject(
		req: Request<never, never, Omit<UpdateProject, 'id' | 'status'>>,
		res: Response, 
		next: NextFunction
	) {
		try {
			//@ts-ignore
			const user = req.user as GenerateTokenProps;
			const projectDto = req.body;

			const { id } = req.params;
			if (!id) throw ApiStatus.badRequest('Project not found');

			const candidate = await ProjectService.getProject(id);
			const allowedRoles = ['mentor', 'teacher', 'admin'];
			if (
				user.role !== 'admin' &&
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
			return next(e);
		}
	}

	static async approveProject(req: Request, res: Response, next: NextFunction) {
		try {
			//@ts-ignore
			const user = req.user as GenerateTokenProps;

			const allowedRoles = ['teacher', 'admin'];

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
			return next(e);
		}
	}

	static async rejectProject(req: Request, res: Response, next: NextFunction) {
		try {
			//@ts-ignore
			const user = req.user as GenerateTokenProps;

			const allowedRoles = ['teacher', 'admin'];

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
			return next(e);
		}
	}
}
