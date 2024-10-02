import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/auth.service';
import { CreateUserDto, LoginDto } from '../types';
import jwt from 'jsonwebtoken';

class AuthController {
	static async register(
		req: Request<never, never, CreateUserDto>,
		res: Response
	) {
		try {
			console.log(1);
			const payload = req.body;

			if (!payload) {
				throw new Error('No request body');
			}

			const user = await AuthService.createUser(payload);

			// @ts-ignore
			req.session.session = jwt.sign(user, process.env.SECRET || '');
			return res.status(200).json({
				user,
			});
		} catch (e) {
			return res.status(500).json({
				message: (e as Error).message,
			});
		}
	}

	static async login(req: Request<never, never, LoginDto>, res: Response) {
		try {
			const payload = req.body;

			if (!payload) throw new Error('No request body');

			const user = await AuthService.login(payload);

			// @ts-ignore
			req.session.session = jwt.sign(user, process.env.SECRET || '');
			return res.status(200).json({ user });
		} catch (e) {
			return res.status(500).json({
				message: (e as Error).message,
			});
		}
	}
}

export default AuthController;
