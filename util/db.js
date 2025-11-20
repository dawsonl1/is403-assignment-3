// Knex configuration: creates a reusable database connection for the app
const knex = require('knex')({
    client: 'pg',
    connection: {
        // Local PostgreSQL instance and database used for this assignment
        host: '127.0.0.1',
        user: 'dawsonpitcher',
        database: 'assignment3'
    }
});

// Export the configured Knex instance so models can run queries
module.exports = knex;