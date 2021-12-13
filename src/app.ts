import * as Sentry from '@sentry/node';
import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import { ConfigService, configVars, sentryConfig } from './config/config';
import { connectToDb } from './config/db';
import { User } from './User/user.entity';
import { appErrorMiddleware } from './utils/central-error-middleware';
import { origins } from './config/origins';

//routers
import UserRouter from './User/routers';
import AuthRouter from './Authentication/routers';
import CategoryRouter from './Category/routers';

//entities
import { Category } from './Category/categories.entities';
import { Faq } from './FAQ/faq.entities';
import { Jurisdiction } from './Jurisdiction/jurisdiction.entities';
import { Taxreport } from './Taxreport/taxreport.entities';
import { Company } from './Company/company.entities';




dotenv.config();




new ConfigService(process.env).ensureValues(configVars);

const routes = [
	{
		path: '/api/v1/auth',
		resource: AuthRouter,
	},
	{
		path: '/api/v1/user',
		resource: UserRouter,
	},
	{
		path: '/api/v1/category',
		resource: CategoryRouter,
	},
	{
		path: '/api/v1/jurisdiction',
		resource: CategoryRouter,
	},
	{
		path: '/api/v1/taxreport',
		resource: CategoryRouter,
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
		this.config();
		this.routes();
	}
 

  
	public config(): void {
		//Connect to Mongoose
	
		this.app.use(cors({ origin: origins }));

		Sentry.init(sentryConfig(this.app));

		this.app.use(Sentry.Handlers.requestHandler());
		// TracingHandler creates a trace for every incoming request
		this.app.use(Sentry.Handlers.tracingHandler());

 
		//configurations
		this.app.use(express.json());

		this.app.use(express.urlencoded({ extended: false }));

		connectToDb({
			entities: [
				User,
				Category,
				Faq,
				Jurisdiction,
				Taxreport,
				Company,
				
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
