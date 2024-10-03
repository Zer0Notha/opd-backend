import { Request, Response } from 'express';
import { GroupService } from '../services/group.service';

export class GroupController {
	static async getGroups(req: Request, res: Response) {
		try {
			const groups = await GroupService.getGroups();

			return res.status(200).json({
				groups,
			});
		} catch (e) {
			return res.status(500).json({
				message: (e as Error).message,
			});
		}
	}
}
