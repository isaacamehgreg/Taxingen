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
import moment from 'moment';
import { hashPassword } from './utils/hash-password';

//routers
import UserRouter from './User/routers';
import AuthRouter from './Authentication/routers';
import CategoryRouter from './Category/routers';
import JurisdictionRouter from './Jurisdiction/routes'; 
import TaxreportRouter from './Taxreport/routes';
import FaqRouter from './FAQ/routes'
import FilenameRouter from './Filename/routes'; 
import WebinarRouter from "./webinar/routes"

//entities
import { Category } from './Category/categories.entities';
import { Faq } from './FAQ/faq.entities';
import { Jurisdiction } from './Jurisdiction/jurisdiction.entities';
import { Taxreport } from './Taxreport/taxreport.entities';
import { Company } from './Company/company.entities';
import { Filename } from './Filename/filename.entities';
import { Webinar } from './webinar/webinar.entity';



import { sendRegistrationMail } from './utils/sendRegistrationMail';
import {CronJobs} from './helpers/cronjobs'



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
		resource: JurisdictionRouter,
	},
	// {
	// 	path: '/api/v1/taxreport',
	// 	resource: TaxreportRouter,
	// },
	{
		path: '/api/v1/faq',
		resource: FaqRouter,
	},
	{
		path: '/api/v1/taxreport',
		resource: FilenameRouter,
	},
	{
		path: '/api/v1/webinar',
		resource:WebinarRouter
	}

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
		this.app.set('view engine', 'ejs');
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
				Filename, 
				Webinar	  
			],
		})
			.then(async () => {
				 console.log('🚀 Database connected');
				 const hash = await hashPassword("12345");
			//	 console.log((await User.find({id: "de61971e-0e0d-4f1e-adee-795c7e537aee"})).length)
			 //    await User.update({id: "de61971e-0e0d-4f1e-adee-795c7e537aee"},{password: hash, role: "admin", email: "isaacamehgreg@gmail.com"}).then(async () => {console.log('Updated')})               
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
  