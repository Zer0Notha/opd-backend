import bcrypt from 'bcrypt';

import { createUser, getUserByEmail } from '../db';
import { CreateUserDto, LoginDto } from '../types';
import ApiStatus from '../handlers/api.handler';

class AuthService {
	static async createUser(user: CreateUserDto) {
		const candidate = await getUserByEmail(user.email);

		if (candidate) throw ApiStatus.badRequest('Пользователь уже существует');

		const hashedPassword = await bcrypt.hash(user.password, 5);

		const userData = await createUser({ ...user, password: hashedPassword });

		if (!userData) {
			throw new Error('Error on user creation');
		}

		return {
			id: userData.id,
			email: userData.email,
			firstName: userData.firstName,
			secondName: userData.secondName,
			patronymic: userData.patronymic,
			groupId: userData.groupId,
			vk: userData.vk,
			role: userData.role,
		};
	}

	static async login(user: LoginDto) {
		const candidate = await getUserByEmail(user.email);

		if (!candidate) throw ApiStatus.badRequest('Email или пароль неверны');

		const passwordMatch = await bcrypt.compare(
			user.password,
			candidate.password
		);

		if (!passwordMatch) throw ApiStatus.badRequest('Email или пароль неверны');

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

export default AuthService;
