import { Request, Response, NextFunction } from 'express';
import ApiStatus from '../handlers/api.handler';
import UserService from '../services/user.service';
import { GenerateTokenProps } from '../types';

export class UserController {
	static async getMyInfo(req: Request, res: Response, next: NextFunction) {
		try {
			//@ts-ignore
			const user = req.user as GenerateTokenProps;

			if (!user.id) {
				throw ApiStatus.badRequest('User not found');
			}

			const userInfo = await UserService.getUserInfo(user.id as string);

			return res.status(200).json({
				...userInfo,
			});
		} catch (e) {
			next();
		}
	}

	static async getUserInfo(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			if (!id) throw ApiStatus.badRequest('User not found');

			const userInfo = await UserService.getUserInfo(id);

			return res.status(200).json({
				...userInfo,
			});
		} catch (e) {
			next(e);
		}
	}
}
