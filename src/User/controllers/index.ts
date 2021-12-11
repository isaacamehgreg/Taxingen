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

	

	// async updateUser (req: Request, res: Response){
	// 	console.log(res.locals);
	// 	const id = res.locals.user.id
	// 	const {
	// 		first_name,
	// 		last_name,
	// 		phone,
	// 		country,
	// 		state,
	// 		timezone
	// 	} = req.body;
	// 	try{
	// 		const user = await updateUser(id, first_name, last_name, phone, country, state, timezone)
	// 		return	res.status(httpStatus.OK)
	// 			.json(new SuccessResponse('User profile updated successfully', user));
	// 	} catch (error) {
	// 		if(error){

	// 			return res
	// 			.status(forbiddenError().status)
	// 			.json(forbiddenError(error).response);
	// 		}
	// 	}

	// }

	// async updateUserPassword (req: Request, res: Response){
	// 	console.log(res.locals);
	// 	const id = res.locals.user.id
	// 	const {
	// 		old_password,
	// 		new_password,
	// 		confirm_password
	// 	} = req.body;
	// 	try{
	// 		const user = await updateUserPassword(id, old_password, new_password, confirm_password)
	// 		return	res.status(httpStatus.OK)
	// 			.json(new SuccessResponse('User password updated successfully', user));
	// 	} catch (error) {
		

	// 			return res
	// 			.status(forbiddenError().status)
	// 			.json(forbiddenError(error).response);
		
	// 	}

	// }
	//  async getUserById (req: Request, res: Response){
	
	// 	const {
	// 		id
	// 	} = req.body;
	// 	try{
			
	// 		const user = await User.findOne({id});
	// 		if(!user) return "user not found";
	// 		return	res.status(httpStatus.OK)
	// 			.json(new SuccessResponse('User found', user));

	// 	} catch (error) {
		

	// 			return res
	// 			.status(forbiddenError().status)
	// 			.json(forbiddenError(error).response);
		
	// 	}

	// }

}

export default new UserController();
