// Data access layer for the `users` table using Knex
const knex = require('../util/db');

class Users {
    // Fetch all users for the home page table
    static async getAll() {
        return knex('users').select('*').orderBy('userid', 'asc');
    }

    // Check if a user exists in the database for login authentication
    static async checkUser(username) {
        const user = await knex('users').where({username}).first();

        return user;
    }

    // Add a new user to the database for future login authentication
    static async addUser(username, password, user_level) {
        await knex('users').insert({ username, password, user_level });
    }

    // Fetch a single user by ID for editing
    static async getById(userid) {
        return knex('users').where({ userid }).first();
    }

    // Update an existing user record by ID
    static async updateUser(userid, username, password, user_level) {
        return knex('users')
            .where({ userid })
            .update({ username, password, user_level });
    }

    // Delete a user by ID
    static async deleteUser(userid) {
        return knex('users')
            .where({ userid })
            .del();
    }
}

module.exports = Users;