import { getGroups } from '../db';
import ApiStatus from '../handlers/api.handler';

export class GroupService {
	static async getGroups() {
		const candidate = await getGroups();

		if (!candidate) {
			throw ApiStatus.badRequest('Groups not found');
		}

		return candidate;
	}

	static async createGroup() {}
}
