const nodemailer = require('nodemailer');
require('dotenv').config();

exports.sendEmail = async (to, subject, htmlContent) => {
    const transporter = nodemailer.createTransport({
        host: "chainconsults.com",
        port: 465,
        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: `Bloomnights <bloomnights.com>`,
        to,
        subject,
        html: htmlContent,
    };

    return transporter.sendMail(mailOptions);
};
