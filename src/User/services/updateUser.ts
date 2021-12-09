import { User } from '../user.entity';

export const updateUser = async (
	id: string,
	first_name: string,
	last_name: string,
	phone: string,
	country: string,
	state: string,
	timezone: string

) => {
	const update = await User.update(
		{ id },
		{
			first_name,
			last_name,
			phone,
			country,
			state,
			timezone
		}
	);

	if (!update) {
		throw 'User profile not updated';
	}

	return User.findOne(id);
};
