import { validate } from 'class-validator';
import { sendMail } from '../../utils/sendMail';
import { getManager, getRepository } from 'typeorm';
import { User } from '../../User/user.entity';
import { hashPassword } from '../../utils/hash-password';
import * as jwt from 'jsonwebtoken'
import generator from "generate-password"
import { generateCode } from '../../utils/generate-code';


export const registerUser = async (
	name: string,
	title: string,
	email: string,
	phone: string,
): Promise<any> => {

    let code = await generateCode()
	
	try {
		const hash = await hashPassword(code);
		const user = new User();
		user.name = name;
		user.title = title;
		user.email = email;
		user.phone = phone;
		user.code = code;

		const errors = await validate(user, {
			validationError: { target: false },
			stopAtFirstError: true,
		});

		if (errors.length) {
			throw errors;
		}

		/**Register User */
		const newUser = await getManager().save(user);
		const verificationToken = await jwt.sign(newUser.id,'paperdaz');
		if(verificationToken){
			sendMail(user.id,'click the link to verify your email', verificationToken)
		}


		return fromEntity(newUser);
	} catch (error) {
		throw error;
	}
};

const fromEntity = (user: User) => {

	return Object.assign(
		{},
		{
			id: user.id,
			name: user.name,
			title: user.title,
			email: user.email,
			email_verified_at: user.email_verified_at,
			phone: user.phone,
			code: user.code,
			created_at: user.created_at,
			updated_at: user.updated_at,
		}
	);
};

