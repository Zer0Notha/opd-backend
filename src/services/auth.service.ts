import bcrypt from 'bcrypt';

import { createUser, getUserByEmail } from '../db';
import { CreateUserDto, LoginDto } from '../types';

class AuthService {
	static async createUser(user: CreateUserDto) {
		const candidate = await getUserByEmail(user.email);

		if (candidate) throw new Error('User already exists');

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

		if (!candidate) throw new Error('Email or password are incorrect');

		const passwordMatch = await bcrypt.compare(
			user.password,
			candidate.password
		);

		if (!passwordMatch) throw new Error('Email or password are incorrect');

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
