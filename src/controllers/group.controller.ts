import { Request, Response, NextFunction } from 'express';
import { GroupService } from '../services/group.service';

export class GroupController {
	static async getGroups(req: Request, res: Response, next: NextFunction) {
		try {
			const groups = await GroupService.getGroups();

			return res.status(200).json({
				groups,
			});
		} catch (e) {

			next(e);

		}
	}
}
