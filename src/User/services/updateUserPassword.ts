import { User } from '../user.entity';
import * as bcryptjs from 'bcryptjs';
import { hashPassword } from '../../utils/hash-password';

export const updateUserPassword = async (
	id: string,
	old_password: string,
	new_password: string,
	confirm_password: string
) => {
	const user = await User.findOne({
		where: { id },
		select: ['password'],
	});
	const passwordIsMatch = await bcryptjs.compare(
		old_password,
		<string>user?.password
	);
	if (!passwordIsMatch) {
		throw 'Old password does not match';
	}

	if (new_password != confirm_password) {
		throw 'New password and confirm password does not match';
	}

	// if (new_password === confirm_password) {
	// 	throw 'New password cannot be old password';
	// }

	const hash = await hashPassword(new_password);
	if (!hash) {
		throw 'Password hash error';
	}
	const update = await User.update(
		{ id },
		{
			password: hash,
		}
	);
	if (!update) {
		throw 'User password not updated';
	}

	return User.findOne(id);
};
