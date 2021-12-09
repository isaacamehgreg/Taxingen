import { Connection } from 'typeorm';
import { Activities } from './activities.entity';

export class ActivitiesModule {
	
	constructor(private connection: Connection) {
		this.connection = connection;
	}

	static getEntity() {
		return Activities;
	}

	repository() {
		return this.connection.getRepository(Activities);
	}
}
