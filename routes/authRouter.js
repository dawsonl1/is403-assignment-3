// Router for authentication: login form, login submit, and logout
const path = require('path');
const express = require('express');
const authController = require('../controller/authController');

// Create an Express router to define route endpoints for the app
const router = express.Router();

router.get('/login', authController.getLogIn);

router.post('/login', authController.postLogIn);

router.post('/logout', authController.postLogOut)

module.exports = router;