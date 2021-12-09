import { getRepository } from 'typeorm';
import { Logger } from '../../config/logger';
import { User } from '../user.entity';

/** Demo */
export class CreateUser {
	private logger: Logger;
	constructor() {
		this.logger = new Logger(CreateUser.name, __filename);
	}
	public async execute(id: string): Promise<any> {
		const userRepository = getRepository(User);
		try {
			const response = await userRepository.findOne(id);
			return response;
		} catch (error) {
			this.logger.log(error);
			throw error;
		}
	}
}

export default new CreateUser();
