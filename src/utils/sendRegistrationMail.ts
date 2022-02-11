import { User } from "../User/user.entity"
const nodemailer = require("nodemailer");
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';


export const sendRegistrationMail = async (user_id:string,first_name:string, email:string, code:string) =>{

        const filePath = path.join(__dirname, './Emails/templates/registration.html');
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        const template = handlebars.compile(source);
        const link = 'http://taxingen.com/company-registration/?code='+code+'&user_id='+user_id
        const replacements = {
        first_name: first_name,
        code:code,
        link:link,
        };
        const htmlToSend = template(replacements);
        const transporter = nodemailer.createTransport({
                //service: "hotmail",
                host: "smtp-mail.outlook.com", 
                secureConnection: false, // TLS requires secureConnection to be false
                port: 587,
                tls: {
                    ciphers:'SSLv3'
                 },
                auth: {
                    user: "taxingen@hotmail.com",
                    pass: "mai1970!@#$"
                },
               
            });
        const mailOptions = {
                from: 'Taxingen <taxingen@hotmail.com>', // sender address
                to: email, // list of receivers
                subject: 'Taxingen Registration', // Subject line
                html: htmlToSend,
                // html: '<h3>Hello '+user?.first_name+'</h3><br><p>You have begin the process to register on Taxingen, </b> Follow this link, with this code to, complete you registeration process</p></b><h3>'+code+'</h3></b><p><a href="http://taxingen.com/company-registration/?code='+code+'&user_id:'+user?.id+'">Click Here To Verify</a></p>'
                }; 
                transporter.sendMail(mailOptions, function (err: any, info:any) {
                if(err)
                console.log(err)
                else
                console.log(info);
        });

       return email;
}