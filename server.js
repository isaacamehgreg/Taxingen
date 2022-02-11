var nodemailer = require("nodemailer");
console.log("started");
const transport = nodemailer.createTransport({
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

var mailOptions = {
    from: 'taxingen@hotmail.com', // sender address
    to: 'isaacamehgreg@gmail.com', // my mail
    subject: `message subject`, // Subject line
    text: 'plain text', // plain text body
    // html: params.html, // html body
    // attachments: params.attachments
};

transport.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log('Error while sending mail: ' + error);
    } else {
        console.log('Message sent: %s', info.messageId);
    }
    transport.close(); // shut down the connection pool, no more messages.
});  

