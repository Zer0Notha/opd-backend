import prisma from '../config/db.config';
import { CreateUserDto } from '../types';

export const getUserById = async (id: string) =>
	prisma.user.findFirstOrThrow({
		where: {
			id,
		},
		include: {
			group: true,
		},
	});

export const getUserByEmail = async (email: string) =>
	prisma.user.findFirst({
		where: { email },
	});

export const createUser = async (data: CreateUserDto) =>
	prisma.user.create({
		data,
	});

export const getUserProjects = async (id: string) =>
	prisma.userProjects.findMany({
		where: {
			userId: id,
		},
		select: {
			project: true,
		},
	});

export const getUserRequests = async (id: string) =>
	prisma.user.findUnique({
		where: {
			id,
		},
		select: {
			requests: {
				select: {
					id: true,
					userId: true,
					priority: true,
					projectId: true,
					status: true,
					project: true,
				},
			},
		},
	});
