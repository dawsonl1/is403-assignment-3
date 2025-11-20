// Middleware to protect routes: only allow access when the user is logged in
module.exports = (req, res, next) => {
    if (req.session.isLoggedIn) {
        next();
    } else {
        res.redirect('/login');
    }
}