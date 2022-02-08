import { Response, Request, NextFunction } from 'express';
import Joi from 'joi';
import { User } from '../User/user.entity';
import {
	BadRequestException,
	ForbiddenException,
	validationError,
} from '../utils/exceptions';


const validateLoginFields = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email } = req.body;

	const format = Joi.object().keys({
		email: Joi.string().email().required(),
		//password: Joi.string().required(),
	});

	format
		.validateAsync({ email }, { stripUnknown: true })
		.then(() => {
			next();
		})
		.catch((err) => {
			return res
				.status(validationError().status)
				.json(validationError(err.details[0].message).response);
		});
};

const validateRegistrationFields = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { first_name, last_name, email, phone } = req.body;

	try {
		const format = Joi.object().keys({
			email: Joi.string().email().required(),
			first_name: Joi.string().required(),
			last_name: Joi.string().required(),
			phone: Joi.string().required()

		});

		await format.validateAsync(
			{
				first_name,
				last_name,
				email,
				phone	
			
			},
			{ stripUnknown: true }
		);

		if ((await User.count({ where: { email } })) > 0) {
			return res
				.status(401)
				.json(
					new ForbiddenException('User with email already exists').response
				);
		}
		if ((await User.count({ where: { phone } })) > 0) {
			return res
				.status(401)
				.json(
					new ForbiddenException('phone number already exists').response
				);
		}


		next();
	} catch (error) {
		const err: any = error;
		return res
			.status(400)
			.json(new BadRequestException(err?.details[0].message).response);
	}
};

const validateCompanyFields = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { company_name, address,city,state,postal_code,country } = req.body;

	try {
		const format = Joi.object().keys({
			company_name: Joi.string().required(),
			address: Joi.string().required(),
			city: Joi.string().required(),
			state: Joi.string().required(),
			postal_code: Joi.string().required(),
			country: Joi.string().required()
		});

		await format.validateAsync(
			{
				company_name, address,city,state,postal_code,country	
			
			},
			{ stripUnknown: true }
		);


		next();
	} catch (error) {
		const err: any = error;
		return res
			.status(400)
			.json(new BadRequestException(err?.details[0].message).response);
	}
};


const validateUpdateFields = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { first_name, last_name, country, state, phone } = req.body;

	const format = Joi.object().keys({
		first_name: Joi.string().required(),
		last_name: Joi.string().required(),
		country: Joi.string(),
		state: Joi.string(),
		phone: Joi.string(),
	});

	format
		.validateAsync(
			{
				first_name,
				last_name,
				country,
				state,
				phone
			},
			{ stripUnknown: true }
		)
		.then(async () => {
			if (first_name == '') {
				throw 'First name cannot be empty';
			}

			if (last_name == '') {
				throw 'Last name cannot be empty';
			}

			next();
		})
		.catch((err) => {
			return res
				.status(validationError().status)
				.json(validationError(err.details[0].message).response);
		});
};

const validateUpdatePasswordFields = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { old_password, new_password, confirm_password } = req.body;

	const format = Joi.object().keys({
		old_password: Joi.string().required(),
		new_password: Joi.string().min(8).required(),
		confirm_password: Joi.string().min(8).required(),
	});

	format
		.validateAsync(
			{
				
				old_password,
				new_password,
				confirm_password,
			},
			{ stripUnknown: true }
		)
		.then(async () => {
			if (old_password == new_password) {
				throw 'New password is same as old password';
			}
			if (confirm_password != new_password) {
				throw 'confirm password does not match new password';
			}
			next();
		})
		.catch((err) => {
			return res
				.status(validationError().status)
				.json(validationError(err.details[0].message).response);
		});
};

export {
	validateRegistrationFields,
	validateLoginFields,
	validateUpdateFields,
	validateUpdatePasswordFields,
	validateCompanyFields

};
