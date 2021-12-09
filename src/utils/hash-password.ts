import * as bcryptjs from 'bcryptjs';
import { Logger } from '../config/logger';

const logger = new Logger('Authentication', __filename);

export const hashPassword = async (password: string) => {
	try {
		return bcryptjs.hashSync(password, 10);
	} catch (error) {
		throw error;
	}
};
