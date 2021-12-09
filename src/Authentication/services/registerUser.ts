import { validate } from 'class-validator';
import { sendMail } from '../../utils/sendMail';
import { getManager, getRepository } from 'typeorm';
import { User } from '../../User/user.entity';
import { hashPassword } from '../../utils/hash-password';
import * as jwt from 'jsonwebtoken'


export const registerUser = async (
	first_name: string,
	last_name: string,
	email: string,
	password: string
): Promise<any> => {
	try {
		const hash = await hashPassword(password);

		const user = new User();
		user.first_name = first_name;
		user.last_name = last_name;
		user.email = email;
		user.password = hash;

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
			first_name: user.first_name,
			last_name: user.last_name,
			email: user.email,
			profile_picture: user.profile_picture,
			email_verified_at: user.email_verified_at,
			id: user.id,
			role: user.role,
			created_at: user.created_at,
			updated_at: user.updated_at,
		}
	);
};

