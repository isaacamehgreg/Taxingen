import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

export const sendRegEmail = async (email: string, name:string, subject: string, url: string) => {
 
  const filePath = path.join(__dirname, './templates/registration.html');
  const source = fs.readFileSync(filePath, 'utf-8').toString();
  const template = handlebars.compile(source);
  const replacements = {
    Email: "Isaac"
  };
  const htmlToSend = template(replacements);
  const transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:465,
    secure: true,
    auth: {
      user: "taxingen@gmail.com",
      pass: "Paperdaz1970!@#$"
    } 
  }); 
  const mailOptions = {
    from: '"Taxingen" <taxingen@gmail.com>',
    to: email,
    subject: subject,
    text: url,
    //html: htmlToSend,
    // attachments: [  {   // use URL as an attachment
    //   filename: 'testfile.pdf',
    //   path: 'https://paperdazfile.nyc3.digitaloceanspaces.com/users_document/file%20%283%29.pdf1641629067904'
    //   } ]
  };
  const info = await transporter.sendMail(mailOptions);
  console.log("Message sent: %s", info.messageId);
  console.log(info);
 return;

} 

