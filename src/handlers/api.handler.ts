class ApiStatus extends Error {
	private status;

	constructor(status: number, message: string) {
		super();
		this.status = status;
		this.message = message;
	}

	//Ошибки клиента
	static badRequest(message: string) {
		return new ApiStatus(400, message);
	}

	static UnauthorizedError() {
		return new ApiStatus(401, 'Пользователь не авторизован');
	}

	static forbidden(message: string) {
		return new ApiStatus(403, message);
	}

	static pageNotFound(message: string) {
		return new ApiStatus(404, message);
	}

	//ошибки сервера
	static internal(message: string) {
		return new ApiStatus(500, message);
	}

	//Успех
	static ok(message: string) {
		return new ApiStatus(200, message);
	}

	static created(message: string) {
		return new ApiStatus(201, message);
	}

	static accepted(message: string) {
		return new ApiStatus(202, message);
	}

	static noContent(message: string) {
		return new ApiStatus(204, message);
	}
}

export default ApiStatus;
