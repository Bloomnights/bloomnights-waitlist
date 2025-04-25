const db = require('../config/db');

exports.createUser = async (firstname, lastname, email) => {
    const query = `
        INSERT INTO users (firstname, lastname, email)
        VALUES ($1, $2, $3) RETURNING *;
    `;
    const values = [firstname, lastname, email];
    const result = await db.query(query, values);
    return result.rows[0];
};

// psql -h dpg-cqth5uaj1k6c738lkam0-a -U waitlist_yc4n_user -d waitlist_yc4n -p 5432 sslmode=require

// postgresql://waitlist_yc4n_user:EihaYeg9ZBct7HiHraUmbV4cSjTfoubJ@dpg-cqth5uaj1k6c738lkam0-a.oregon-postgres.render.com/waitlist_yc4n