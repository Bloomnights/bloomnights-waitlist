const { Pool } = require('pg');
const Knex = require('knex');
require('dotenv').config();

// Initialize pg Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

pool.on('connect', () => {
  console.log('Connected to the database');
});

// Initialize Knex
const knex = Knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: { rejectUnauthorized: false }, // Enable SSL if necessary
  },
  migrations: {
    directory: '../migrations', // Ensure this path is correct and exists
  },
});

// Function to run migrations
const runMigrations = async () => {
  try {
    console.log('Running migrations...');
    await knex.migrate.latest();
    console.log('Migrations completed.');
  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    knex.destroy(); // Close Knex connection after migration
  }
};

// Run migrations on startup
runMigrations();

module.exports = {
  query: (text, params) => pool.query(text, params),
  knex,
};
