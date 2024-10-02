import prisma from '../config/db.config';
import { CreateProject } from '../types/project';

export const getProjectById = async (id: string) =>
	prisma.project.findFirstOrThrow({ where: { id: id } });

export const createProject = async (data: CreateProject) =>
	prisma.project.create({
		data: {
			...data,
		},
	});
