import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import prisma from '../config/db.config';

class TokenService {
	static generateToken(payload: Omit<User, 'password' | 'groupId' | 'group'>) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET || '', {
			expiresIn: '30m',
		});
		const refreshToken = jwt.sign(
			payload,
			process.env.JWT_REFRESH_SECRET || '',
			{
				expiresIn: '30d',
			}
		);

		return {
			accessToken,
			refreshToken,
		};
	}

	static validateAccessToken(token: string) {
		try {
			const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET || '');
			return userData;
		} catch (e) {
			return null;
		}
	}

	static idByAccessToken(token: string) {
		try {
			const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET || '');
			return (userData as User).id;
		} catch (e) {
			return null;
		}
	}

	static validateRefreshToken(token: { refreshToken: string }) {
		try {
			const userData = jwt.verify(
				token.refreshToken,
				process.env.JWT_REFRESH_SECRET || ''
			);
			return userData;
		} catch (e) {
			return null;
		}
	}

	static async saveToken(id: string, refreshToken: string) {
		const tokenData = await prisma.token.findFirstOrThrow({
			where: { userId: id },
		});
		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			return prisma.token.update({
				where: { id: tokenData.id },
				data: { ...tokenData },
			});
		}
		const token = await prisma.token.create({
			data: { userId: id, refreshToken },
		});
		return token;
	}

	static async removeToken(id: string) {
		return await prisma.token.delete({
			where: { id: id },
		});
	}

	static async findToken(token: string) {
		const tokenFind = await prisma.token.findFirstOrThrow({
			where: { refreshToken: token },
		});
		return tokenFind;
	}
}

export default TokenService;
