import * as dotenv from 'dotenv';
dotenv.config();
import { ConfigService } from '../src/config/config';
import * as fs from 'fs';
fs.writeFileSync(
	'ormconfig.json',
	JSON.stringify(new ConfigService(process.env).getTypeOrmConfig(), null, 2)
);
