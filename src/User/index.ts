import { Connection } from 'typeorm';
import { User } from './user.entity';
export class UserModule {
	constructor(private connection: Connection) {
		this.connection = connection;
	}

	static getEntity() {
		return User;
	}

	repository() {
		return this.connection.getRepository(User);
	}
}
