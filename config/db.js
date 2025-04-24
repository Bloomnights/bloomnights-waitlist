const { Pool } = require('pg');
const Knex = require('knex');
require('dotenv').config();

// Load connection string
const connectionString = process.env.DATABASE_URL;


const isProduction = process.env.NODE_ENV === 'production';

// Initialize pg Pool using DATABASE_URL
const pool = new Pool({
  connectionString,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

pool.on('connect', () => {
  console.log('Connected to the database');
});

// Initialize Knex using DATABASE_URL
const knex = Knex({
  client: 'pg',
  connection: {
    connectionString,
    ssl: isProduction ? { rejectUnauthorized: false } : false,
  },
  migrations: {
    directory: './migrations',
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
    knex.destroy();
  }
};

// Run migrations on startup
runMigrations();

module.exports = {
  query: (text, params) => pool.query(text, params),
  knex,
};
