import { User } from "../User/user.entity"
import nodemailer from "nodemailer";

export const sendMail = async (userId:string, message:string, code:string) =>{
        const user = await User.findOne({id:userId})
        const email = user?.email
        //will triger send mail here
        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
                user: 'blackgenius9000@gmail.com',
                pass: '1.Alechenu'
        }
        });
        const mailOptions = {
        from: 'Taxingen', // sender address
        to: email, // list of receivers
        subject: 'Taxingen', // Subject line
        html: '<h3>Hello '+user?.first_name+'</h3><br><p>You have begin the process to register on Taxingen, </b> Follow this link, with this code to, complete you registeration process</p></b><h3>'+code+'</h3></b><p><a href="http://www.taxingen.com/api/v1/auth/verify_code/'+user?.id+'">http://www.taxingen.com/api/v1/auth/verify_code/'+user?.id+'</a></p>'
        };
        transporter.sendMail(mailOptions, function (err, info) {
        if(err)
        console.log(err)
        else
        console.log(info);
        });

       return email;
}