const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'mail.ihawp.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.NOREPLY_EMAIL,
    pass: process.env.NOREPLY_PASSWORD
  }
});

const nodemailerTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_APP_PASSWORD
    }
});

const sendEmailTemplate = async (emailTemplate) => {
    return await nodemailerTransporter.sendMail(emailTemplate);
}

module.exports = { 
    sendEmailTemplate,
};