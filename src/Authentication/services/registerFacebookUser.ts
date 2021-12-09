import { validate } from 'class-validator';
import { getManager, getRepository } from 'typeorm';
import { User } from '../../User/user.entity';
import { hashPassword } from '../../utils/hash-password';

export const registerFacebookUser = async (
	social_id: string,
	first_name: string,
	last_name: string,
	profile_picture: string
): Promise<any> => {

	try {

		//check if the user exists theen just create a session for that user

		
		const user = new User();
		user.social_id = social_id;
		user.first_name = first_name;
		user.last_name = last_name;
		user.profile_picture = profile_picture;
		user.social_media = 'facebook';
		//user.email = 'uwdicbwjlnfk@jhbfebv.com';
 
		const errors = await validate(user, {
			validationError: { target: false },
			stopAtFirstError: true,
		});

		if (errors.length) {
			throw errors;
		}

		/**Register User */
		const newUser = await getManager().save(user);

		// /**Create Wallet */
		// await Wallets.create({
		// 	userId: newUser.id,
		// }).save();

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
