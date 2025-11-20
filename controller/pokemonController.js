// Controller layer: handles HTTP requests and responses for Pokémon routes
const Pokemon = require('../model/pokemonModel');

// GET / - render the home page with the full Pokémon list
exports.getHome = async (req, res) => {
  try {
    // Ask the model for all Pokémon
    const pokemonList = await Pokemon.getAll();

    // Render the Pokémon database page and pass data into the template
    res.render('pokemon.ejs', {
      pageTitle: 'Pokémon Database',
      pokemonList: pokemonList,
      user_level: req.session.user_level
    });
  } catch (err) {
    // Log the error and return a generic 500 response
    console.error('Database error:', err);
    res.status(500).render('pokemon.ejs', {
      pageTitle: 'Pokémon Database',
      pageTitle: 'Home Page',
      pokemonList: pokemonList,
      user_level: req.session.user_level
    });
  }};

// POST /searchPokemon - handle search form submissions
exports.postSearchPokemon = async (req, res) => {
  try {
    // Use the model to find a Pokémon by the name provided in the form
    const pokemon = await Pokemon.findByName(req.body.pokemonName);

    // Render the search result view with either a Pokémon or null
    res.render('searchResult.ejs', {
      pageTitle: 'Pokémon Search Result',
      pokemon: pokemon,
      user_level: req.session.user_level
    });
  } catch (err) {
    // Log the error and return a generic 500 response
    console.error('Database error:', err);
    res.status(500).render('/', {
      pageTitle: 'Home Page',
      pokemonList: pokemonList,
      user_level: req.session.user_level
      });
    }
  };

