// helpers/emailHelper.js
require('dotenv').config();
const nodemailer = require('nodemailer');

// Create a transporter object using the SMTP transport
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, 
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

/**
 * Sends an OTP email using SMTP.
 * @param {string} email - The recipient's email address.
 * @param {string} otp - The OTP code to send.
 * @returns {Promise} - A promise that resolves when the email is sent.
 */
async function sendOtpEmail(email, otp) {
    const mailOptions = {
        from: `nguyenmanhsonbg@gmail.com`, // Sender address
        to: email, // Recipient address
        subject: 'Your OTP Code', // Subject line
        text: `Your OTP code is: ${otp}. It will expire in 60 seconds.`, // Plain text body
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('OTP email sent successfully: %s', info.messageId);
        return info;
    } catch (err) {
        console.error('Error sending OTP email:', err);
        throw new Error('Email sending failed');
    }
}

module.exports = {
    sendOtpEmail
};
