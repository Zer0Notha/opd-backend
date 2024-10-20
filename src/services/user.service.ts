import { group } from 'console';
import { getUserById } from '../db';
import ApiStatus from '../handlers/api.handler';

class UserService {
	static async getUserInfo(id: string) {
		const candidate = await getUserById(id);

		if (!candidate) {
			throw ApiStatus.badRequest('Пользователь не найден');
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
			group: candidate.group,
			allowWatchMyGrades: candidate.allowWatchMyGrades,
		};
	}
}

export default UserService;
