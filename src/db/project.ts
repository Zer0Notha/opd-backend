import { ProjectStatus, ProjectType } from '@prisma/client';
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

export const getProjects = async (status?: ProjectStatus, type?: ProjectType) =>
	prisma.project.findMany({
		where: {
			status: status,
			type: type,
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

export const getProjectUsers = async (projectId: string) =>
	prisma.userProjects.findMany({
		where: {
			projectId,
		},
	});
