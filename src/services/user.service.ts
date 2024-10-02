import { getUserById } from '../db';
import ApiStatus from '../handlers/api.handler';

class UserService {
	static async getUserInfo(id: string) {
		const candidate = await getUserById(id);

		if (!candidate) {
			throw ApiStatus.badRequest('User not found');
		}

		return {
			id: candidate.id,
			email: candidate.email,
			firstName: candidate.firstName,
			secondName: candidate.secondName,
			patronymic: candidate.patronymic,
			groupId: candidate.groupId,
			vk: candidate.vk,
			role: candidate.role,
		};
	}
}

export default UserService;
