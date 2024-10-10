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

export interface CreateProjectReport {
	date: string;
	authorId: string;
	text: string;
	projectId: string;
}

export interface CreateReportFile {
	reportId: string;
	name: string;
	path: string;
}

export type UpdateProject = { id: string } & Partial<CreateProject>;
