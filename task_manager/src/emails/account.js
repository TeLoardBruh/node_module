const sgMail = require('@sendgrid/mail');
require('dotenv/config');
const sendGridApiKey = process.env.SEND_GRID_API;

sgMail.setApiKey(sendGridApiKey);


const sendWelcomeEmail = (email, name) => {
    const msg = {
        to: email,
        from: 'damnloardbruh@gmail.com',
        subject: 'Welcome to the app',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app`,
        

    }
    sgMail.send(msg);
}

const cancelSendEmail = (email, name) => {
    const msg_cancel = {
        to: email,
        from: 'damnloardbruh@gmail.com',
        subject: 'What\'s with the app',
        text: `Hello , ${name}. this is from the service center can you give us feedback on you stop using our service ?`,
        

    }
    sgMail.send(msg_cancel);
}
module.exports = {
    sendWelcomeEmail,
    cancelSendEmail
};