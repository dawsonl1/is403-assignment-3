// Router for Pokémon pages: list all Pokémon and handle search requests
const path = require('path');
const express = require('express');

// Create an Express router to define route endpoints for the app
const router = express.Router();

// Import the controller that contains the handler functions
const pokemonController = require('../controller/pokemonController');

// Import the middleware that checks if the user is authenticated
const checkAuth = require('../middleware/checkAuth');

// Use the middleware to check if the user is authenticated
router.use(checkAuth);

// Pokémon database route - delegates to controller for logic and rendering
router.get('/', pokemonController.getHome);

// Search route - handles form submissions for searching a Pokémon
router.post('/searchPokemon', pokemonController.postSearchPokemon);

// Export the router so it can be mounted in index.js
module.exports = router;