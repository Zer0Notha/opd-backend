import { ProjectStatus, ProjectType } from '@prisma/client';
import {
	addUserToProject,
	createProject,
	createProjectReport,
	createReportFile,
	deleteProject,
	getProjectById,
	getProjects,
	getProjectUsers,
	getReportFile,
	getUserProjects,
	updateProject,
} from '../db';
import ApiStatus from '../handlers/api.handler';
import {
	CreateProject,
	CreateProjectReport,
	CreateReportFile,
	UpdateProject,
} from '../types';
import { RequestSerice } from './request.service';

export class ProjectService {
	static async getUserProjects(id: string) {
		const candidate = await getUserProjects(id);

		if (!candidate) {
			throw ApiStatus.badRequest('Проект не найден');
		}

		return [...candidate.map((item) => item.project)];
	}

	static async getProjects(args: {
		status?: ProjectStatus;
		type?: ProjectType;
	}) {
		const candidate = await getProjects(args.status, args.type);

		if (!candidate) {
			throw ApiStatus.badRequest('Проекты не найдены');
		}

		return candidate;
	}

	static async getProject(id: string) {
		const candidate = await getProjectById(id);

		if (!candidate) {
			throw ApiStatus.badRequest('Проект не найден');
		}

		return candidate;
	}

	static async createProject(payload: CreateProject) {
		const candidate = await createProject(payload);

		return candidate;
	}

	static async deleteProject(id: string) {
		const project = await getProjectById(id);

		await deleteProject(id);

		project.team.map(async (user) => {
			const requests = await RequestSerice.getUserRequests(user.userId);

			await RequestSerice.setPriority(
				requests?.requests.map((item, index) => ({
					id: item.id,
					priority: index + 1,
				})) ?? []
			);

			await RequestSerice.updateAnotherUsersRequests(user.userId, false);
		});
	}

	static async createProjectReport(payload: CreateProjectReport) {
		const candidate = await createProjectReport(payload);

		return candidate;
	}

	static async getReportFile(payload: string) {
		const candidate = await getReportFile(payload);

		return candidate;
	}

	static async createReportFile(payload: CreateReportFile) {
		const candidate = await createReportFile(payload);

		return candidate;
	}

	static async updateProject(payload: UpdateProject) {
		const candidate = await updateProject(payload);

		return candidate;
	}

	static async addTeamMember(userId: string, projectId: string) {
		const candidate = await addUserToProject(userId, projectId);

		return candidate;
	}

	static async getProjectUsers(projectId: string) {
		const users = await getProjectUsers(projectId);

		return users.map((item) => item.userId);
	}
}
