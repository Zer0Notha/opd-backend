import { NextFunction, Request, Response } from 'express';
import ApiStatus from '../handlers/api.handler';
import TokenService from '../services/token.sevice';

export function authMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		//@ts-ignore
		if (req.session?.session) {
			return next();
		}

		next(ApiStatus.UnauthorizedError());
	} catch (e) {
		return next(ApiStatus.UnauthorizedError());
	}
}
