const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const config = require('./config.js');

const OAuth2 = google.auth.oauth2;

const OAuth2_client = new OAuth2(config.clientId, config.clientSecret)
OAuth2_client.setCredentials({refresh_token : config.refresh_token})

function sendMail(){
    const  accessToken = OAuth2_client.getAccessToken()

    const transport = nodemailer.createTransport({
        service:"gmail"
        auth:{
            
        }
    })


}
