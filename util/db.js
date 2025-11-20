// Load environment variables from the .env file
require('dotenv').config();

// Knex configuration: creates a reusable database connection for the app
const knex = require("knex")({
    client: "pg",
    connection: {
        host: process.env.RDS_HOSTNAME || process.env.DB_HOST,
        user: process.env.RDS_USERNAME || process.env.DB_USER,
        password: process.env.RDS_PASSWORD || process.env.DB_PASSWORD,
        database: process.env.RDS_DB_NAME || process.env.DB_NAME,
        port: process.env.RDS_PORT || process.env.DB_PORT,
        ssl: process.env.DB_SSL ? {rejectUnauthorized: false} : false 
    }
});
// Export the configured Knex instance so models can run queries
module.exports = knex;

