// ===== Application entrypoint: sets up Express, middleware, routes, and starts the server =====

// Core Tools
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

// Create the main Express application object
const app = express()

// Load environment variables from .env file
require('dotenv').config();




app.use(
  session({
    secret: process.env.SESSION_SECRET || 'fallback-secret-key',   // Uses the secret from .env (or the fallback) to sign the session cookie.
    resave: false,    // Do NOT save the session back to the store if nothing changed.
    saveUninitialized: false   // Do NOT create a session until you actually store something in req.session.
  })
);

// Configure EJS as the templating engine and specify the folder for view files
app.set('view engine', 'ejs');   // Now I can use ejs as my templating engine
app.set('views', 'views');      // So it knows to look in the views folder

// Import the router objects which define app routes
const pokemonRouter = require('./routes/pokemonRouter')
const authRouter = require('./routes/authRouter')
const userRouter = require('./routes/userRouter')

// Middleware to parse URL-encoded form data from POST requests
app.use(bodyParser.urlencoded())  // Middleware to parse form data

// Middleware to serve static assets (CSS, images, client-side JS) from the public folder
app.use(express.static(path.join(__dirname, 'public')));  // Middleware to serve the static css file

// Register the authentication router with the application
app.use(authRouter)

// Register the user router with the application (home and user management)
app.use(userRouter)

// Register the Pokémon router under /pokemon
app.use('/pokemon', pokemonRouter)


// 404 page catchall for any routes that were not matched above
app.use('/', (req, res, next) => {
    res.status(404).render('404.ejs', {
        pageTitle: 'Page Not Found',
        user_level: req.session.user_level
    })
})

// Start the HTTP server on port 3005
app.listen(3005);   // It will run on port 3005


