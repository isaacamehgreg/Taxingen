import { User } from '../../User/user.entity';
import * as bcryptjs from 'bcryptjs';
import generateToken from '../../utils/generate-token';
import { ForbiddenException } from '../../utils/exceptions';


export const loginUser = async (
	email: string,
	code: string
): Promise<any> => {
	try{
	const user = await User.findOne({email});
	if (!user) {
	  return  {status:404, message:'Your login details is incorrect'};
	}
 
	const codeIsMatch = await bcryptjs.compare(code, user.code);
	if (!codeIsMatch) {
		return {status:404, message:'code entered is incorrect'};
	}

	const token:any = await generateToken(user);
	if (!token) {
		return {status:403, message:'Token error'};
	}

	return {status:200, message:'code entered is incorrect',token}

   }catch (error){
	throw error;
   }
};
