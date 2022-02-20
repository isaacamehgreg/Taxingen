import { User } from "../User/user.entity"
import nodemailer from "nodemailer";
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
const ejs = require("ejs");

export const sendTwelveMonthMail = async (first_name:string, email:string, current_date:string, one_year_date: string, reports:any) =>{


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

        const data = await ejs.renderFile(__dirname + "/twelve_month.ejs", { first_name, current_date, expiration_date:one_year_date, reports});



        const mailOptions = {
                from: 'Taxingen <taxingen@gmail.com>', // sender address
                to: email, // list of receivers
                subject: 'Taxingen 12 Month Tax Repot', // Subject line
                //html: htmlToSend,
                html:data
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