import { NextFunction, Request, Response } from 'express';
import ApiStatus from '../handlers/api.handler';

export function authMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		//@ts-ignore
		if (req.cookies['session']) {
			return next();
		}

		next(ApiStatus.UnauthorizedError());
	} catch (e) {
		return next(ApiStatus.UnauthorizedError());
	}
}
