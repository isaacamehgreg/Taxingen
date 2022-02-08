import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { SuccessResponse } from '../../utils/success-response';
import createUserService from '../services/createUser';
import {forbiddenError} from "../../utils/exceptions";


import { not } from 'joi';
import { User } from '../user.entity';


class UserController {
	async createUser(req: Request, res: Response, next: NextFunction) {
		try {
			const result = await createUserService.execute('id');
			return res
				.status(httpStatus.OK)
				.json(new SuccessResponse('Your request was successful', result));
		} catch (error) {
			next(error);
		}
	}

	async getUser (req: Request, res: Response) {
		const user = res.locals.user
		return res
			.status(httpStatus.OK)
			.json(new SuccessResponse('User info fetched successfully', user));

	}

}

export default new UserController();
