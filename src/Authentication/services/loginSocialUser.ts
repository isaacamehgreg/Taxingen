import { User } from '../../User/user.entity';
import * as bcryptjs from 'bcryptjs';
import generateToken from '../../utils/generate-token';
import { ForbiddenException } from '../../utils/exceptions';

export const loginSocialUser = async (
	social_id: string,
	email?: string
): Promise<any> => {

	const user = await User.findOne({social_id});
	if (!user) {
		if(email){
		   const userExist = await User.findOne({email});
		   if(userExist) {
			throw new ForbiddenException('a user with this email already exists, try another login method');
		   }else{
			return false; //user does not exist
		   }
		}
		return false;
	}
	


	const token = await generateToken(user);
	if (!token) {
		throw new ForbiddenException('Token error');
	}

	return {user_id:user.id,token};
};
