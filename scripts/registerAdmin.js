const bcrypt = require('bcryptjs');
const { query } = require('../config/db');
require('dotenv').config();

const seedAdmin = async () => {
    const email = 'admin@example.com';
    const password = 'your_password';

    // Check if admin already exists
    const existingAdmin = await query('SELECT * FROM admins WHERE email = $1', [email]);
    if (existingAdmin.rows.length > 0) {
        console.log('Admin with this email already exists');
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await query('INSERT INTO admins (email, password) VALUES ($1, $2)', [email, hashedPassword]);
    console.log('Admin registered successfully');
};

seedAdmin().catch(console.error).finally(() => process.exit());
