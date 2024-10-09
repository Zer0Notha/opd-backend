import { ProjectRequestStatus } from '@prisma/client';
import { getUserRequests } from '../db';
import {
	createRequest,
	findRequest,
	findUserRequest,
	getProjectRequests,
	updateRequestsPriority,
	updateRequestStatus,
} from '../db/request';
import ApiStatus from '../handlers/api.handler';
import { CreateProjectRequest } from '../types';

export class RequestSerice {
	static async getUserRequests(userId: string) {
		const candidate = await getUserRequests(userId);

		return candidate;
	}

	static async getProjectRequests(projectId: string) {
		const candidate = await getProjectRequests(projectId);

		return candidate;
	}

	static async setPriority(requests: Array<{ id: string; priority: number }>) {
		const candidate = await updateRequestsPriority(requests);

		return candidate;
	}

	static async getRequest(id: string) {
		const candidate = await findRequest(id);

		return candidate;
	}

	static async createRequest(payload: CreateProjectRequest) {
		const requests = await getUserRequests(payload.userId);

		if (requests?.requests.length === 5)
			throw ApiStatus.badRequest('Request limit is 5');

		const existing = await findUserRequest(payload.userId, payload.projectId);

		if (existing && existing.status !== 'rejected')
			throw ApiStatus.badRequest('Request already exists');

		const candidate = await createRequest(payload);

		return candidate;
	}

	static async updateRequest(id: string, status: ProjectRequestStatus) {
		const candidate = await updateRequestStatus(id, status);

		return candidate;
	}
}
