import prisma from '../config/db.config';

export const getGroups = () => prisma.group.findMany();
