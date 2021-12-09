import { createConnection, Connection } from 'typeorm';
import { ConfigService } from './config';
const config = new ConfigService(process.env);
const options = config.getTypeOrmConfig();

interface ConnectDB {
	entities?: Array<any>;
}
export const connectToDb = ({
	entities = [],
}: ConnectDB): Promise<Connection> => {
	return new Promise((resolve, reject) => {
		createConnection({
			...options,
			entities: entities,
		})
			.then((connection) => {
				resolve(connection);
			})
			.catch((error) => reject(error));
	});
};
