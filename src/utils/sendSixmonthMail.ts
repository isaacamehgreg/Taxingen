import { User } from "../User/user.entity"
import nodemailer from "nodemailer";
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

export const sendSixMail = async (first_name:string, email:string, report_name:string, state:string, date:string, expiration_date:string) =>{
        console.log('emailail is sent')
        const filePath = path.join(__dirname, '../Emails/templates/six_month.html');
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        const template = handlebars.compile(source);
      
        const replacements = {
        first_name: first_name,
        report_name:report_name,
        state:state,
        date:date, 
        expiration_date:expiration_date
      
        };
        const htmlToSend = template(replacements);
        var transporter = nodemailer.createTransport({
        service: 'gmail',
        host:'smtp.gmail.com',
        port:465,
        secure: true,
        
        auth: {
                user: 'taxingen@gmail.com',
                pass: 'Taxingen1970!@#$',
        }
        });
        const mailOptions = {
                from: 'Taxingen <taxingen@gmail.com>', // sender address
                to: email, // list of receivers
                subject: 'Tax-Report Success', // Subject line
                html: htmlToSend,
                // html: '<h3>Hello '+user?.first_name+'</h3><br><p>You have begin the process to register on Taxingen, </b> Follow this link, with this code to, complete you registeration process</p></b><h3>'+code+'</h3></b><p><a href="http://taxingen.com/company-registration/?code='+code+'&user_id:'+user?.id+'">Click Here To Verify</a></p>'
                };
                transporter.sendMail(mailOptions, function (err, info) {
                if(err)
                console.log(err)
                else
                console.log(info);
        });

       return email;
}