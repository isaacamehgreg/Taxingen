import { User } from '../../User/user.entity';
import { BadRequestException } from '../../utils/exceptions';

export const updateUserRole = async (id: string, role: string) => {
	const update = await User.update(id, {
		role,
	});

	if (!update) {
		throw new BadRequestException('An error occurred, role not updated');
	}

	return update;
};
