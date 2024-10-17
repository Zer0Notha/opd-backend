import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/auth.service';
import { CreateUserDto, LoginDto } from '../types';
import TokenService from '../services/token.sevice';

class AuthController {
	static async register(
		req: Request<never, never, CreateUserDto>,
		res: Response, 
		next: NextFunction
	) {
		try {
			const payload = req.body;

			if (!payload) {
				throw new Error('No request body');
			}

			const user = await AuthService.createUser(payload);

			const cookie = TokenService.generateToken(user);
			await TokenService.saveToken(user.id, cookie.refreshToken);
			res.cookie('token', cookie, { maxAge: 6000000, httpOnly: true });
			return res.status(200).json({
				...user,
			});
		} catch (e) {
			return next(e);
		}
	}

	static async login(
		req: Request<never, never, LoginDto>,
		res: Response,
		next: NextFunction
	) {
		try {
			const payload = req.body;

			if (!payload) throw new Error('No request body');

			const user = await AuthService.login(payload);

			const cookie = TokenService.generateToken(user);
			await TokenService.saveToken(user.id, cookie.refreshToken);
			res.cookie('token', cookie, { maxAge: 6000000, httpOnly: true });
			return res.status(200).json({ ...user });
		} catch (e) {
			return next(e);
		}
	}

	static async logout(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			res.clearCookie('token');
			return res.status(200).json('User Logged out');
		} catch (e) {
			return next(e);
		}
	}
}

export default AuthController;
