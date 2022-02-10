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
	async getAllUser (req: Request, res: Response) {
	
        const user =  await User.find();
		if(!user)return res.status(404).json({message:'user not found'});
		return res
			.status(httpStatus.OK)
			.json(new SuccessResponse('User info fetched successfully', user));

	}
	async getUser (req: Request, res: Response) {
		const id = req.params.user_id
        const user =  await User.findOne({id});
		if(!user)return res.status(404).json({message:'user not found'});
		return res
			.status(httpStatus.OK)
			.json(new SuccessResponse('User info fetched successfully', user));

	}

	async editUser (req: Request, res: Response) {
		const user_id = req.params.user_id
		const user =  await User.find();
		if(!user)return res.status(404).json({message:'user not found'});
		const {first_name, last_name, title, email, phone} = req.body

		if(!first_name || !last_name || !title || !email || !phone ){
			return res.status(400).json({message:' please provide first_name, last_name, title, email, phone, company_name, company_address,company_city,company_state,company_postal_code,company_country'})
		}

		const update = User.update({id:user_id},{first_name, last_name, title, email, phone})

		return res
			.status(httpStatus.OK)
			.json(new SuccessResponse('User info updaate successfully'));

	}

	async editCompany (req: Request, res: Response) {
		const user_id = req.params.user_id
		const user =  await User.find();
		if(!user)return res.status(404).json({message:'user not found'});
		const {company_name, company_address,company_city,company_state,company_postal_code,company_country} = req.body

		if(  !company_name|| !company_address|| !company_city || !company_state || !company_postal_code || !company_country){
			return res.status(400).json({message:' please provide first_name, last_name, title, email, phone, company_name, company_address,company_city,company_state,company_postal_code,company_country'})
		}

		const update = User.update({id:user_id},{ company_name, company_address,company_city,company_state,company_postal_code,company_country})

		return res
			.status(httpStatus.OK)
			.json(new SuccessResponse('User info updaate successfully'));

	}

	async deleteUser (req: Request, res: Response) {
		const user_id = req.params.user_id
		const checkUser = User.findOne({id:user_id});
		if(!checkUser) {
			res.status(404).json({message: 'User not found'});
		}

		const update = await User.delete({id:user_id});

		return res.status(httpStatus.OK).json(new SuccessResponse('User info updaate successfully'));

	}



}

export default new UserController();
