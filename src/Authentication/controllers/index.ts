import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { SuccessResponse } from '../../utils/success-response';
import { loginUser } from '../services/loginUser';
import { registerUser } from '../services/registerUser';
import { registerFacebookUser} from '../services/registerFacebookUser';
import { loginSocialUser } from '../services/loginSocialUser';
import { registerGoogleUser } from '../services/registerGoogleUser copy';
import jwt from 'jsonwebtoken';
import { User } from '../../User/user.entity';

const Register = async (req: Request, res: Response) => {
	const { first_name, last_name, email,  password } = req.body;

	try {
		const user = await registerUser(
			first_name,
			last_name,
			email,
			password
		);
		return res
			.status(httpStatus.OK)
			.json(new SuccessResponse('Registration successful a verification mail has been sent to your email', user));
	} catch (error) {
		throw error;
	}
};

const verifyEmail = async (req: Request, res: Response) => {

	

     const verificationToken:any = req.query.verificationToken;
	
	 if(!verificationToken){
		return res.json({status:"failed", message:"token not submitted"})
	 }

	 const userId:string|any = await jwt.verify(verificationToken,'paperdaz');
	 if(!userId){
		return res.json({status:'failed', message:"token invalid or expired"})
	 }

 
	 const user = await User.findOne({id: userId});
	 if(!user){
		return res.json({status:'failed', message:"couldnt find user associated with the token"}) 
	 }
	 const updateVerifyEmail = await User.update({id: userId},{email_verified_at:new Date().toISOString()})
	 
     

	 if(!updateVerifyEmail){
		return	res.json({status:'failed', message:"failed to verify email"}) 
	 }

 	return res.json({status:'success', message:"email verified successfully"}) 

}

const Login = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	try {
		const result = await loginUser(email, password);
		
		
			return res
				.status(result.status)
				.json(result);
		
	} catch (error) {
		throw error;
	}
};




const Google = async (req: Request, res: Response) => {
	const { social_id, first_name, last_name, email, profile_picture  } = req.body;

	try {
		const checkToGetToken = await loginSocialUser(social_id, email);
		if(checkToGetToken){
			return res
			.status(httpStatus.OK)
			.json(new SuccessResponse('Registration successful', checkToGetToken));
		}else{

		const user = await registerGoogleUser(
			social_id,
			first_name,
			last_name,
			email,
			profile_picture
		);
		return res
			.status(httpStatus.OK)
			.json(new SuccessResponse('Registration successful', user));

		}	
	} catch (error) {
		throw error;
	}
};

const Facebook = async (req: Request, res: Response) => {
	const { social_id, first_name, last_name, profile_picture  } = req.body;

	try {
		const checkToGetToken = await loginSocialUser(social_id);
		if(checkToGetToken){
			return res
			.status(httpStatus.OK)
			.json(new SuccessResponse('Registration successful', checkToGetToken));
		}else{
		const user = await registerFacebookUser(
			social_id,
			first_name,
			last_name,
		
			profile_picture
		);
		return res
			.status(httpStatus.OK)
			.json(new SuccessResponse('Registration successful', user));

		}	
	} catch (error) {
		throw error;
	}
};

const Twitter = async (req: Request, res: Response) => {
	const { social_id, first_name, last_name, profile_picture  } = req.body;

	try {
		const checkToGetToken = await loginSocialUser(social_id);
		if(checkToGetToken){
			return res
			.status(httpStatus.OK)
			.json(new SuccessResponse('Registration successful', checkToGetToken));
		}else{
		const user = await registerFacebookUser(
			social_id,
			first_name,
			last_name,
		
			profile_picture
		);
		return res
			.status(httpStatus.OK)
			.json(new SuccessResponse('Registration successful', user));

		}	
	} catch (error) {
		throw error;
	}
};





export default {
	Login,
	Register,
	Google,
	Facebook,
	Twitter,
	verifyEmail,
};
