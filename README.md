# Assignment 3 – Pokémon & User Management App (Node/Express + EJS + PostgreSQL)

### Name: Dawson Pitcher
### Date: 2025-11-19

This project is a small MVC-style Node/Express app that has:

- A **login system** with sessions.
- A **user management area** (for managers) where you can add, edit, and delete users.
- A **Pokémon database page** where you can browse and search Pokémon.

Views are rendered with EJS templates, data access is handled via Knex, and styling is a single CSS file served from `public/styles.css`.

## Tech Stack
- Node.js, Express
- EJS templating
- PostgreSQL
- Knex query builder
- express-session
- Static CSS

## How Everything Fits Together

### 1. Entry Point: `index.js`
- Creates and configures the Express app.
- Loads environment variables and configures `express-session`.
- Sets EJS as the view engine and `views/` as the views folder.
- Adds middleware:
  - `body-parser.urlencoded()` to parse HTML form posts.
  - `express.static(path.join(__dirname, 'public'))` to serve `public/styles.css` and other static assets.
- Mounts feature routers:
  - `authRouter` for login/logout.
  - `userRouter` for the home page and user admin.
  - `pokemonRouter` for Pokémon pages under `/pokemon`.
- Adds a final catch-all 404 handler that renders `views/404.ejs`.
- Starts the HTTP server on port `3005`.

### 2. Authentication Flow
- `routes/authRouter.js` wires routes to `controller/authController.js`.
- Typical flow:
  - `GET /login` renders `views/login.ejs`.
  - `POST /login` checks the submitted username/password via the users table.
  - On success, it stores `user_level` in the session and redirects to `/`.
  - `POST /logout` clears the session and sends the user back to the login page.
- `middleware/checkAuth.js` protects routes by checking for a valid session before allowing access.

### 3. User Management (Home / Users)
- `routes/userRouter.js` wires routes to `controller/userController.js` and uses `checkAuth`.
- `model/usersModel.js` (via Knex) talks to the `users` table.

Main routes:
- `GET /` → `userController.getUsers`
  - Uses `usersModel.getAll()` to fetch all users.
  - Renders `views/index.ejs` which shows a table of users (ID, username, user_level) with **Edit** and **Delete** buttons.

- `GET /addUser` → `userController.getAddUser`
  - Renders `views/addUser.ejs` with a form to create a new user (username, password, user level radio buttons).

- `POST /addUser` → `userController.postAddUser`
  - Reads values from the add-user form.
  - Calls `usersModel.addUser(...)` to insert into the `users` table.
  - On success, redirects back to `/` (user list).

- `GET /editUser/:userid` → `userController.getEditUser`
  - Uses `usersModel.getById(userid)` to load a single user.
  - Renders `views/editUser.ejs` populated with that user’s current values.

- `POST /editUser/:userid` → `userController.postEditUser`
  - Reads updated values from the edit form.
  - Calls `usersModel.updateUser(...)` to update the record.
  - On success, redirects back to `/`.

- `POST /deleteUser/:userid` → `userController.postDeleteUser`
  - Calls `usersModel.deleteUser(userid)` to remove the user.
  - Redirects back to `/`.
  - On the UI side, the Delete button has a JavaScript `confirm(...)` so the user must confirm before the delete is sent.

### 4. Pokémon Pages
- `routes/pokemonRouter.js` wires routes to `controller/pokemonController.js`.
- The Pokémon controller uses Knex to read from a `pokemon` table.

Main routes:
- `GET /pokemon`
  - Fetches all Pokémon and renders `views/pokemon.ejs`.
  - Shows a **search form** and a **table of all Pokémon**.
  - Clicking a table row posts a search for that Pokémon.

- `POST /pokemon/searchPokemon`
  - Reads `pokemonName` from the form.
  - Looks up that Pokémon by name in the database.
  - Renders `views/searchResult.ejs` with a single result (name, base_total, and image from pokemondb.net).

### 5. Views and Layout
- `views/includes/head.ejs`: Shared `<head>` partial, used by all pages.
- `views/includes/header.ejs`: The top navigation bar with links to **Home**, **Pokemon DB**, optional **Add User** (for managers), and **Logout**.
- `views/login.ejs`: Simple login form.
- `views/index.ejs`: User list table with Edit/Delete actions.
- `views/addUser.ejs`: Form to add a new user with a Back button returning to the index.
- `views/editUser.ejs`: Form to edit an existing user with a Save button and Back link.
- `views/pokemon.ejs`: Pokémon list and search page.
- `views/searchResult.ejs`: Shows the details for one Pokémon and a styled **Back to Home** button that returns to `/pokemon`.
- `views/404.ejs`: Simple not-found page with a link back to home.

### 6. Styling
- `public/styles.css` contains all of the styling:
  - Header/navigation bar.
  - Login, add user, and edit user forms.
  - Users and Pokémon tables.
  - Pokémon search result card.
  - Shared back/secondary buttons and the 404 page.

### 7. Database
- `util/db.js` exports a configured Knex instance pointed at a PostgreSQL database (`assignment3`).
- The app interacts with the following tables:
  - A `users` table (for login and user management).
  - A `pokemon` table (for the Pokémon pages).

## Running the App
1. Install dependencies:
   ```bash
   npm install
   ```
2. Ensure PostgreSQL is running and both `users` and `pokemon` tables exist in your database.
3. Start the dev server:
   ```bash
   npm start
   ```
4. Visit http://localhost:3005

## High-Level Usage Flow
- **Log in** via `/login`.
- After login you land on `/` which lists users (if your `user_level` allows management features).
- Use the navigation bar to switch between **Home** (users) and **Pokemon DB**.
- On **Home** you can add, edit, and delete users.
- On **Pokemon DB** you can see all Pokémon, search by name, and view a single Pokémon’s details.

