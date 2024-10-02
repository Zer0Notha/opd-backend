import { ProjectStatus, ProjectType } from '@prisma/client';

export interface CreateProject {
	name: string;
	description: string;
	poster: string;
	type: ProjectType;
	maxUserNum: number;
	problem: string;
	wayOfSolving: string;
	status: ProjectStatus;
	managerId: string;
}
