const User = require('../models/userModel');
const emailService = require('../services/emailService');
const fs = require('fs');
const path = require('path');

exports.storeUser = async (req, res) => {
    const { username, email, phone, country } = req.body;

    try {
        // Store the user in the database
        const newUser = await User.createUser(username, email, phone, country);

        // Load the email template
        const templatePath = path.join(__dirname, '../views/emailTemplate.html');
        const emailTemplate = fs.readFileSync(templatePath, 'utf8');

        // Replace placeholders with actual data
        const emailContent = emailTemplate
            .replace('{{username}}', username)
            .replace('{{email}}', email)
            .replace('{{phone}}', phone)
            .replace('{{country}}', country);

        // Send an email to the user
        await emailService.sendEmail(email, 'Thank you for Joining', emailContent);

        // Respond with success
        res.status(201).json({ message: "You're on the list! We'll notify you when we launch in your country.", user: newUser});
    } catch (error) {
        console.error('Error storing user data or sending email:', error);
        res.status(500).json({ message: 'Oops, you have already been added to our waitlist.', error});
    }
};

exports.deleteUser = async (req, res) => {
    const { email } = req.body;

    try {
        await query('DELETE FROM users WHERE email = $1', [email]);
        res.status(201).json({message: `User with email ${email} has been deleted`});
    } catch (err) {
        res.status(500).json({ message: 'Error deleting user:', err});
    }
};