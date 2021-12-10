import { User } from '../../User/user.entity';
import * as bcryptjs from 'bcryptjs';
import generateToken from '../../utils/generate-token';
import { ForbiddenException } from '../../utils/exceptions';


export const loginUser = async (
	email: string,
	password: string
): Promise<any> => {
	try{
	const user = await User.findOne({
		where: { email },
		select: ['first_name', 'last_name', 'email', 'password'],
	});
	if (!user) {
	  return  {status:404, message:'Your login details is incorrect'};
	}

	const passwordIsMatch = await bcryptjs.compare(password, user.password);
	if (!passwordIsMatch) {
		return {status:404, message:'Password entered is incorrect'};
	}

	const token:any = await generateToken(user);
	if (!token) {
		return {status:403, message:'Token error'};
	}

	return {status:200, message:'Password entered is incorrect',token}

   }catch (error){
	throw error;
   }
};
