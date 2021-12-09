import { Response } from 'express';
import httpStatus from 'http-status';

import dotenv from 'dotenv';
import { BaseHttpException } from './exceptions';
import { Logger } from '../config/logger';
dotenv.config();
export class ErrorResponseFilter {
	private res: Response;

	private logger: Logger;
	constructor(res: Response) {
		this.res = res;
		this.logger = new Logger(ErrorResponseFilter.name, __filename);
	}

	response(exception: unknown) {
		const errException: any = exception;
		const status =
			exception instanceof BaseHttpException
				? exception.status
				: httpStatus.INTERNAL_SERVER_ERROR;

		return this.res.status(status).json(this.createResponse(errException));
	}

	private createResponse(exception: unknown) {
		console.log(exception);
		if (exception instanceof BaseHttpException) {
			return exception.response;
		}
		this.logger.error(exception);
		return {
			status: 'error',
			message: 'Ooops! Something went wrong. We are looking into it.',
		};
	}
}
