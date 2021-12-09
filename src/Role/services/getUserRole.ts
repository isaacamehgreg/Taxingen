import { User } from '../../User/user.entity';
import { BadRequestException } from '../../utils/exceptions';

export const getUserRole = async (id: number) => {
	const getUser = await User.findOne(id);

	if (!getUser) {
		throw new BadRequestException('An error occurred, role not fetched');
	}

	return getUser?.role;
};
