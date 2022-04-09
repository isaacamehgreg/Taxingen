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


export const loginAdmin = async (
	email: string,
	password: string
): Promise<any> => {
	try{
		console.log(1)
	const user = await User.findOne({email});
	if (!user) {
	  return  {status:404, message:'Your login details is incorrect'};
	} 
	console.log(password, user.password)

	const checkPassword = await bcryptjs.compare(password, user.password);
	console.log(2)
	if (!checkPassword) {
		return {status:404, message:'password entered is incorrect'};
	}
	console.log(3)
	const token:any = await generateToken(user);
	if (!token) {
		return {status:403, message:'Token error'};
	}
	console.log(4)
	return {status:200, message:'success',token} 

   }catch (error){ 
	throw error;
   }
};
