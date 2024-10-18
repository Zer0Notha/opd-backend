import { NextFunction, Request, Response } from 'express';
import ApiStatus from '../handlers/api.handler';
import TokenService from '../services/token.sevice';

export async function authMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const cookie = req.cookies['token'];

		if (cookie) {
			const accessVerified = TokenService.validateAccessToken(
				cookie.accessToken
			);
			if (!accessVerified) {
				if (cookie.refreshToken) {
					const userData = TokenService.validateRefreshToken(cookie);

					if (userData) {
						//@ts-ignore
						delete userData.iat;
						//@ts-ignore
						delete userData.exp;

						const token = TokenService.generateToken({
							...userData,
						});

						await TokenService.saveToken(userData.id, token.refreshToken);

						res.cookie('token', token, { maxAge: 6000000, httpOnly: true });
						//@ts-ignore
						req.user = userData;

						return next();
					}
				}

				return res.status(401).json({ error: 'Unauthorized' });
			}

			if (accessVerified) {
				//@ts-ignore
				req.user = accessVerified;
			}

			return next();
		}

		return res.status(401).json({ error: 'Unauthorized' });
	} catch (e) {
		console.log(e);
		return res.status(401).json({ error: 'Unauthorized' });
	}
}
