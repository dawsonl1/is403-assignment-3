// Load environment variables from the .env file
require('dotenv').config();

// Knex configuration: creates a reusable database connection for the app
const knex = require('knex')({
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
    }
});

// Export the configured Knex instance so models can run queries
module.exports = knex;