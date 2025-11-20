// Controller layer for user management: list users, add user, edit user, delete user
const session = require('express-session');
const usersModel = require('../model/usersModel');

// GET / - render a table of all users on the home page
exports.getUsers = async (req, res) => {
    try {
        const users = await usersModel.getAll();
        res.render('index', {
            pageTitle: 'Users',
            user_level: req.session.user_level,
            users: users,
            error: null
        });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send('Error fetching users');
    }
};

// GET addUser / render the addUser view
exports.getAddUser = (req, res) => {
    res.render('addUser', {
        pageTitle: "Add User",
        user_level: req.session.user_level,
        error: null
    })
}

// POST addUser / add a user record to the users table in the assignment3 database
exports.postAddUser = async (req, res) => {
    // Pull values from the form
    const { username, password, user_level } = req.body;

    try {
       await usersModel.addUser(username, password, user_level);
       res.redirect('/')
    } catch (err) {
        // Log the error
        console.log('Database error:', err)
        res.render('addUser', {
            pageTitle: 'Add User',
            user_level: req.session.user_level,
            error: 'Failed to add the user'
        })
    }
    
}

exports.getEditUser = async (req, res) => {
    const { userid } = req.params;

    try {
        const user = await usersModel.getById(userid);

        if (!user) {
            return res.status(404).render('404', {
                pageTitle: 'User Not Found',
                user_level: req.session.user_level
            });
        }

        res.render('editUser', {
            pageTitle: 'Edit User',
            user_level: req.session.user_level,
            user,
            error: null
        });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send('Error loading user for edit');
    }
};

exports.postEditUser = async (req, res) => {
    const { userid } = req.params;
    const { username, password, user_level } = req.body;

    try {
        await usersModel.updateUser(userid, username, password, user_level);
        res.redirect('/');
    } catch (err) {
        console.error('Database error:', err);

        try {
            const user = await usersModel.getById(userid);

            res.render('editUser', {
                pageTitle: 'Edit User',
                user_level: req.session.user_level,
                user,
                error: 'Failed to update the user'
            });
        } catch (innerErr) {
            console.error('Database error while reloading user:', innerErr);
            res.status(500).send('Error updating user');
        }
    }
};

exports.postDeleteUser = async (req, res) => {
    const { userid } = req.params;

    try {
        await usersModel.deleteUser(userid);
        res.redirect('/');
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send('Error deleting user');
    }
};