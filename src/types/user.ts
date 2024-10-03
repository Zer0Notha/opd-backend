export interface CreateUserDto {
	email: string;
	password: string;
	vk: string;
	groupId: string;
	firstName: string;
	secondName: string;
	patronymic: string;
}

export interface LoginDto {
	email: string;
	password: string;
}

export interface UpdateUserDto extends CreateUserDto {}
