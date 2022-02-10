const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const config = require('./config.js');

const OAuth2 = google.auth.oauth2;

const OAuth2_client = OAuth2(config.clientId, config.clientSecret)
OAuth2_client.setCredentials({refresh_token : config.refresh_token})

function sendMail(){
    const  accessToken = OAuth2_client.getAccessToken()

    const transport = nodemailer.createTransport({
        service:"gmail",
        auth:{
            type:'OAuth2',
            user: config.user,
            clientId: config.clientId, 
            clientSecret: config.clientSecret,
            refreshToken: config.refresh_token,
            accessToken:accessToken
        }
    })


    const mail_options = {
        from:"Taxingen <mai@taxingen.com>",
        to: recipient,
        subject:" this is a test mail",
        html: get_html_message()
    
    }

    transport.sendMail(mail_options, function(err,result){
        if(err){
            console.log(err)
        }else{
            console.log(result)
        }
        transport.close()
    })

}
function get_html_message(name){
    return ` <h1>test<h1>`
}

send_mail('isaac', 'isaacamegreg@gmail.com')
