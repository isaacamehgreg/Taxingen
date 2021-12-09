import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { validationError } from '../utils/exceptions';

const validateBankAccountFields = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { bank, bank_code, account_name, account_number } = req.body;

	const format = Joi.object().keys({
		bank: Joi.string().required(),
		bank_code: Joi.number().required(),
		account_name: Joi.string().required(),
		account_number: Joi.number().required(),
	});

	format
		.validateAsync(
			{
				bank,
				bank_code,
				account_name,
				account_number,
			},
			{ stripUnknown: true }
		)
		.then(async () => {
			if (bank == '') {
				throw 'Bank name is required';
			}

			if (bank_code == '') {
				throw 'Bank code is required';
			}

			if (account_name == '') {
				throw 'Account name is required';
			}

			if (account_number == '') {
				throw 'Account number is required';
			}

			next();
		})
		.catch((err) => {
			return res
				.status(validationError().status)
				.json(validationError(err.details[0].message).response);
		});
};

export { validateBankAccountFields };
