import { User } from '@prisma/client';

export type GenerateTokenProps = Pick<
	User,
	| 'id'
	| 'email'
	| 'firstName'
	| 'secondName'
	| 'patronymic'
	| 'role'
	| 'groupId'
	| 'vk'
>;
