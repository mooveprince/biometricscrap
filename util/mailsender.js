const nodeMailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const refreshToken = process.env.REFRESH_TOKEN;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const url =  "https://developers.google.com/oauthplayground";

const oauth2Client = new OAuth2 (clientId, clientSecret, url)

var sendEmail = function (message) {

    oauth2Client.setCredentials({
        refresh_token: refreshToken
   });
   const accessToken = oauth2Client.getAccessToken();

    let transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: process.env.FROM_EMAIL, 
            clientId: clientId,
            clientSecret: clientSecret,
            refreshToken: refreshToken,
            accessToken: accessToken,
            grant_type: "authorization_code"
       }
    });

    let mailOptions = {
        from: process.env.FROM_EMAIL, // sender address
        to: process.env.TO_EMAIL.split(","), // list of receivers
        subject: "BioMetric Status", // Subject line
        text: "Bio Metric status has been changed", // plain text body
        html: "<b>" + message + "</b>" // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
            res.render('index');
        });
}



module.exports = {
    sendEmail : sendEmail
}