const nodemailer = require('nodemailer');
require('dotenv').config();

exports.sendEmail = async (to, subject, htmlContent) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.hostinger.com",
        port: 465,
        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: `Bloomnights <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html: htmlContent,
    };

    return transporter.sendMail(mailOptions);
};
