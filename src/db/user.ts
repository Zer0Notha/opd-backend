import prisma from '../config/db.config';
import { CreateUserDto } from '../types';

export const getUserById = async (id: string) =>
	prisma.user.findFirstOrThrow({
		where: {
			id,
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
	prisma.user.findUnique({
		where: {
			id: id,
		},
		select: {
			projects: true,
		},
	});
