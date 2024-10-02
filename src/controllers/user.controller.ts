import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import ApiStatus from '../handlers/api.handler';
import UserService from '../services/user.service';

export class UserController {
	static async getMyInfo(req: Request, res: Response) {
		try {
			const userId = jwt.verify(req.cookies['token'], process.env.SECRET || '');

			if (!userId) {
				throw ApiStatus.badRequest('User not found');
			}

			const user = await UserService.getUserInfo(userId as string);

			return res.status(200).json({
				user,
			});
		} catch (e) {
			return res.status(500).json({
				message: (e as Error).message,
			});
		}
	}

	static async getUserInfo(req: Request, res: Response) {}
}
