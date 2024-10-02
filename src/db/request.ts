import { ProjectRequestStatus } from '@prisma/client';
import prisma from '../config/db.config';
import { CreateProjectRequest } from '../types';

export const updateRequestsPriority = async (
	data: Array<{ id: string; priority: number }>
) => prisma.projectRequest.updateMany({ data: data });

export const findUserRequest = async (userId: string, projectId: string) =>
	prisma.projectRequest.findFirst({
		where: {
			userId,
			projectId,
			status: {
				not: 'rejected',
			},
		},
	});

export const findRequest = async (id: string) =>
	prisma.projectRequest.findUnique({
		where: {
			id,
		},
	});

export const createRequest = async (data: CreateProjectRequest) =>
	prisma.projectRequest.create({
		data: {
			...data,
			status: 'working',
		},
	});

export const updateRequestStatus = async (
	id: string,
	status: ProjectRequestStatus
) => prisma.projectRequest.update({ where: { id }, data: { status } });

export const getRequestProject = async (id: string) =>
	prisma.projectRequest.findUnique({
		where: { id },
		select: { project: true },
	});
