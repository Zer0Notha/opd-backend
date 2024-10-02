import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import ApiStatus from '../handlers/api.handler';

export function authMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		//@ts-ignore
		if (req.cookies['token']) {
			const verified = jwt.verify(
				req.cookies['token'],
				process.env.SECRET || ''
			);
			if (!verified) next(ApiStatus.UnauthorizedError());
			return next();
		}

		next(ApiStatus.UnauthorizedError());
	} catch (e) {
		return next(ApiStatus.UnauthorizedError());
	}
}
