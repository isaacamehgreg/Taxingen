import * as dotenv from 'dotenv';
import * as Tracing from '@sentry/tracing';
import * as Sentry from '@sentry/node';
import * as express from 'express';
import { ConnectionOptions } from 'typeorm';
// import { conf } from 'typeorm';

dotenv.config();

const dbConfig = {
	db: process.env.DB_NAME,
	user: process.env.DB_USER,
	pass: process.env.DB_PASS,
};

const jwtConfig = {
	jwtSecret: 'PAPERDAZ',
	// jwtSecret:  process.env.SECRET_KEY,
	jwtExpireTime: process.env.TOKEN_TIME,
	jwtIssuer: process.env.TOKEN_ISSUER,
};

const sentryConfig = (app: express.Application): Sentry.NodeOptions => {
	return {
		environment: process.env.NODE_ENV,
		dsn: process.env.SENTRY_DSN,
		tracesSampleRate: 0.6,
		integrations: [
			// enable HTTP calls tracing
			new Sentry.Integrations.Http({ tracing: true }),
			// enable Express.js middleware tracing

			new Tracing.Integrations.Express({ app }),
		],
	};
};

const serverSettings = {
	port: process.env.PORT || 3000,
};

const configVars = [
	'DB_USERNAME',
	'DB_PASSWORD',
	'DB_NAME',
	'DB_HOST',
	'DB_PORT',
];

class ConfigService {
	constructor(private env: { [k: string]: string | undefined }) {}

	private getValue(key: string, throwOnMissing = true): string {
		const value = this.env[key];
		if (!value && throwOnMissing) {
			throw new Error(`config error - missing env.${key}. Add ${key} to .env`);
		}

		return value as string;
	}

	public ensureValues(keys: string[]) {
		keys.forEach((k) => this.getValue(k, true));
		return this;
	}

	public getPort() {
		return this.getValue('PORT', true);
	}

	public isProduction() {
		const mode = this.getValue('NODE_ENV', false);
		return mode !== 'development';
	}

	public getTypeOrmConfig(): ConnectionOptions {
		return {
			type: 'mysql',
			name: 'default',
			host: this.getValue('DB_HOST'),
			port: parseInt(this.getValue('DB_PORT')),
			username: this.getValue('DB_USERNAME'),
			password: this.getValue('DB_PASSWORD'),
			database: this.getValue('DB_NAME'),
			// ssl: this.isProduction(),
			logging: [],
			synchronize: true,
			entities: ['dist/src/**/*.entity.js'],
			migrationsTableName: 'migration',
			migrations: ['./migration/*.js'],

			cli: {
				migrationsDir: './migration',
			},
		};
	}
}

export {
	dbConfig,
	serverSettings,
	sentryConfig,
	ConfigService,
	configVars,
	jwtConfig,
};
