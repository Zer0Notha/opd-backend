import {
	addUserToProject,
	createProject,
	getProjectById,
	getProjects,
	getProjectUsers,
	getUserProjects,
	updateProject,
} from '../db';
import ApiStatus from '../handlers/api.handler';
import { CreateProject, UpdateProject } from '../types';

export class ProjectService {
	static async getUserProjects(id: string) {
		const candidate = await getUserProjects(id);

		if (!candidate) {
			throw ApiStatus.badRequest('Projects not found');
		}

		return candidate;
	}

	static async getProjects() {
		const candidate = await getProjects();

		if (!candidate) {
			throw ApiStatus.badRequest('Projects not found');
		}

		return candidate;
	}

	static async getProject(id: string) {
		const candidate = await getProjectById(id);

		if (!candidate) {
			throw ApiStatus.badRequest('Project not found');
		}

		return candidate;
	}

	static async createProject(payload: CreateProject) {
		const candidate = await createProject(payload);

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
