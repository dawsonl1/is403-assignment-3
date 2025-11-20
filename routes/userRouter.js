// Router for user-related pages: home user list, add user, edit user, delete user
const path = require('path');
const express = require('express');

// Create an Express router to define the routes
const router = express.Router();

// Import the controller that contains the handler functions
const userController = require('../controller/userController');

// Import middleware that checks if the user is authenticated
const checkAuth = require('../middleware/checkAuth');

router.use(checkAuth);

// Home page route (requires authentication)
router.get('/', userController.getUsers);

// Router for loading the addUser.ejs page
router.get('/addUser', userController.getAddUser);

// Router for adding a user with the form on the addUser.ejs page
router.post('/addUser', userController.postAddUser);

// Router for editing a user
router.get('/editUser/:userid', userController.getEditUser);
router.post('/editUser/:userid', userController.postEditUser);

// Router for deleting a user
router.post('/deleteUser/:userid', userController.postDeleteUser);

// Export the module 
module.exports = router;