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
			const payload = req.body;

			if (!payload) {
				throw new Error('No request body');
			}

			const user = await AuthService.createUser(payload);

			const cookie = jwt.sign(user.id, process.env.SECRET || '');
			res.cookie('token', cookie, { maxAge: 60000, httpOnly: true });
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

			const cookie = jwt.sign(user.id, process.env.SECRET || '');
			res.cookie('token', cookie, { maxAge: 60000, httpOnly: true });
			return res.status(200).json({ user });
		} catch (e) {
			return res.status(500).json({
				message: (e as Error).message,
			});
		}
	}
}

export default AuthController;
