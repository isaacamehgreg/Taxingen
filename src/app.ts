import * as Sentry from '@sentry/node';
import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
// import { Activities } from './Activities/activities.entity';

import { ConfigService, configVars, sentryConfig } from './config/config';
import { connectToDb } from './config/db';
import { Notifications } from './Notifications/notifications.entity';

import UserRouter from './User/routers';
import AuthRouter from './Authentication/routers';
import NotificationRouter from './Notifications/routers';

import RoleRouter from './Role/routers';

import { User } from './User/user.entity';
import { appErrorMiddleware } from './utils/central-error-middleware';

import { origins } from './config/origins';




dotenv.config();




new ConfigService(process.env).ensureValues(configVars);

const routes = [
	{
		path: '/api/v2/auth',
		resource: AuthRouter,
	},
	{
		path: '/api/v2/user',
		resource: UserRouter,
	},

	{
		path: '/api/v2/notification',
		resource: NotificationRouter,
	},

	{
		path: '/api/v2/role',
		resource: RoleRouter,
	},

];
 
interface IApp {
	// err: string;
	config(): void;
	routes(): void;
}

class App implements IApp {
	// public err: string;
	public app: express.Application;

	constructor() {
		this.app = express();
		this.app.use(cors());
		this.config();
		this.routes();
	}
 

  
	public config(): void {
		//Connect to Mongoose
	    this.app.use(cors());

		Sentry.init(sentryConfig(this.app));

		this.app.use(Sentry.Handlers.requestHandler());
		// TracingHandler creates a trace for every incoming request
		this.app.use(Sentry.Handlers.tracingHandler());

		//this.app.use(cors({ origin: origins }));
 
		//configurations
		this.app.use(express.json());

		this.app.use(express.urlencoded({ extended: false }));

		connectToDb({
			entities: [
				User,

				Notifications,
 
				
				// Activities,
			],
		})
			.then(() => {
				 console.log('-======>Database connected');
			})
			.catch((err) => {
				console.log(err);
				process.exit(1);
			});
	}
 
	public routes(): void {
		// this.app.use('*', UserRouter);

		routes.map((item) => {
			this.app.use(item.path, item.resource);
		});

		this.app.use(appErrorMiddleware);
	}
}

export default new App().app;
