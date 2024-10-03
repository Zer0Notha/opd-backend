import prisma from '../config/db.config';
import { CreateProject, UpdateProject } from '../types/project';

export const getProjectById = async (id: string) =>
	prisma.project.findFirstOrThrow({ where: { id: id } });

export const createProject = async (data: CreateProject) =>
	prisma.project.create({
		data: {
			...data,
		},
	});

export const getProjects = async () =>
	prisma.project.findMany({
		select: {
			manager: true,
		},
	});

export const updateProject = async (data: UpdateProject) =>
	prisma.project.update({
		where: {
			id: data.id,
		},
		data: data,
	});

export const addUserToProject = async (userId: string, projectId: string) =>
	prisma.userProjects.create({
		data: {
			userId,
			projectId,
		},
	});
