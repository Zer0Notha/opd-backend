import { createProject, getProjectById, getUserProjects } from '../db';
import ApiStatus from '../handlers/api.handler';
import { CreateProject } from '../types';

export class ProjectService {
	static async getUserProjects(id: string) {
		const candidate = await getUserProjects(id);

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
}
