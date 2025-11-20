// Controller layer for authentication: login, session setup, and logout
const usersModel = require('../model/usersModel');

// POST /login - handle login form submissions
exports.postLogIn = async (req, res) => {
    try {
        const { username, password } = req.body;

        // 1. Check if the user exists in the database
        const user = await usersModel.checkUser(username);

        // 2. If the user doesn't exist, return an error
        if (!user) {
            return res.status(401).render('login.ejs', {
                error: 'Invalid username or password',
                pageTitle: 'Login'
            });
        }

        // 3. Check if the password is correct
        if (user.password !== password) {
            return res.status(401).render('login.ejs', {
                error: 'Invalid username or password',
                pageTitle: 'Login'
            });
        }

        // 4. Set the user as logged in with a permission level
        req.session.isLoggedIn = true;
        req.session.user_level = user.user_level;

        // 5. Redirect to the home page
        res.redirect('/');
    } catch {
        console.error(err);
        return res.status(500).render('login.ejs', { 
            error: 'Server error', 
            pageTitle: 'Login' 
        });

    }
}

// GET /login - render the login page
exports.getLogIn = (req, res) => {
    if (req.session.isLoggedIn) {
        return res.redirect('/');
    }
    res.render('login.ejs', {
        pageTitle: 'Login',
        error: null
    });
}

// POST /logout - logs the user out
exports.postLogOut = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        }
        res.redirect('/');   // This send the client back to the homepage, and then they get sent to the /login page
    });
}