import { Connection } from 'typeorm';
import { Notifications } from './notifications.entity';

export class NotificationModule {
	
	constructor(private connection: Connection) {
		this.connection = connection;
	}

	static getEntity() {
		return Notifications;
	}

	repository() {
		return this.connection.getRepository(Notifications);
	}
}
