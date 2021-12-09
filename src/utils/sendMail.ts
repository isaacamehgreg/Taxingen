import { User } from "../User/user.entity"
import nodemailer from "nodemailer";

export const sendMail = async (userId:string, message:string, verificationToken?:string) =>{
        const user = await User.findOne({id:userId})
        const email = user?.email
        //will triger send mail here
        if(verificationToken){

        }


        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
                user: 'blackgenius9000@gmail.com',
                pass: 'alechenu'
        }
        });
        const mailOptions = {
        from: 'Paperdaz', // sender address
        to: email, // list of receivers
        subject: 'Paperdaz Email Verification', // Subject line
        html: '<h3>Hi '+user?.first_name+'</h3><br><p>click the button below to verify your email</p><button style="background-color: #78C360; color: #fff; font-size:16px;"><a href="https://paperdaz-backend.herokuapp.com/api/v2/auth/verify_email/?verificationToken='+verificationToken+'">Verify</a></button>'
        };
        transporter.sendMail(mailOptions, function (err, info) {
        if(err)
        console.log(err)
        else
        console.log(info);
        });



       return email;
}