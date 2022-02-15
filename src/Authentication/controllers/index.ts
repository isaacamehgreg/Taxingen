import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { SuccessResponse } from '../../utils/success-response';
import { loginUser } from '../services/loginUser';
import { registerUser } from '../services/registerUser';

import jwt from 'jsonwebtoken';
import { User } from '../../User/user.entity';
import { Company } from '../../Company/company.entities';
import { jwtConfig } from '../../config/config';
import { sendRegistrationMail } from '../../utils/sendRegistrationMail';
import { Filename } from '../../Filename/filename.entities';


const Register = async (req: Request, res: Response) => {
	const { first_name,last_name, title, email,  phone } = req.body;

	try {
		const user = await registerUser( first_name,last_name, title, email, phone);
		return res
			.status(httpStatus.OK)
			.json(new SuccessResponse('Registration successful a verification mail has been sent to your email', user));
	} catch (error) {
		res.status(400).json({ error: error});
	}
};

 

const verifyCode = async (req: Request, res: Response) => {

     const user_id:any = req.params.user_id;
	
	 if(!user_id){
		return res.json({status:"failed", message:"user id not provided"})
	 }

	 const user = await User.findOne({id: user_id});
	 if(!user){
		return res.json({status:'failed', message:"couldnt find user"}) 
	 } 
	 const tokenizeUser = {
		 email: user.email
	 }

	 const token = await jwt.sign(tokenizeUser,jwtConfig.jwtSecret)

	 const updated = await User.update({id: user.id},{email_verified_at:Date.now()})
 	return res.json({status:'success', message:"user fetched from link", user:user, token}) 

}

const resendEmail = async (req: Request, res: Response) => {

	const user_id:any = req.params.user_id;
   
	if(!user_id){
	   return res.json({status:"failed", message:"user id not provided"})
	}

	const user = await User.findOne({id: user_id});
	if(!user){
	   return res.json({status:'failed', message:"couldnt find user"}) 
	} 


	const resend = await sendRegistrationMail(user_id,user.first_name,user.email,user.code)
	return res.json({status:'success', message:"email resent successfully"}) 

}

const checkTaxReport = async (req: Request, res: Response) => {

	const user_id:any = req.params.user_id;
   
	if(!user_id){
	   return res.json({status:"failed", message:"user id not provided"})
	}

	const user = await User.findOne({id: user_id});
	if(!user){
	   return res.json({status:'failed', message:"couldnt find user"}) 
	} 

	const check_taxreport = await Filename.findOne({user})
	if(check_taxreport){return res.status(400).json({status:'failed', message:'user already filed a report'})}
    else{
		res.status(200).json({status:'success', message:'user can proceed to file a report'})
	}

}

const companyInfo = async (req: Request, res: Response) => {

	const user_id:any = res.locals.user.id
	
	if(!user_id){
	   return res.json({status:"failed", message:"user id not provided"})
	}

	const user = await User.findOne({id: user_id});
	if(!user){
	   return res.status(404).json({status:'failed', message:"couldnt find user"}) 
	} 


	const {company_name, address,city,state,postal_code,country} = req.body

	if(!company_name || !address || !city || !state || !postal_code || !country){
      res.status(403).json({status:'fail', message:'please provide company_name, address,city,state,postal_code,country' })
	}

	const check = await Company.findOne({user});
	if(check){
		res.status(400).json({status:'failed', message:"you have added a company already"})
	}
	
	try{
		const newCompany = new Company();
		newCompany.name = company_name;
		newCompany.address = address;
		newCompany.city = city;
		newCompany.state =state;
		newCompany.postal_code = postal_code;
		newCompany.country = country;
		newCompany.user= user;
		newCompany.save();

		res.status(200).json({status: 'success', message:"company created"});
	}catch(error){

		res.status(400).json({ status:'failed', message:"failed to create company", error})
	}

}

const getCompanyInfo = async (req: Request, res: Response) => {
	const user_id:any = res.locals.user.id

	if(!user_id){
	   return res.json({status:"failed", message:"user id not provided"})
	}

	const user = await User.findOne({id: user_id});
	if(!user){
	   return res.status(404).json({status:'failed', message:"couldnt find user"}) 
	} 

	const company = await Company.findOne({user});
	
	if(!company){
		return res.status(404).json({status:'failed', message:"no company found"}) 
	}

	res.status(200).json({status:'success', company})

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









export default {
	Login,
	Register,
	verifyCode,
	companyInfo,
	getCompanyInfo,
	resendEmail,
    checkTaxReport
};
