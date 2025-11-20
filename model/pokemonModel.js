// Model responsible for interacting with the `pokemon` table in the database
const db = require('../util/db');

class Pokemon {
  // Fetch all Pokémon records ordered alphabetically by description (name)
  static async getAll() {
    return db('pokemon').select('*').orderBy('description', 'asc');
  }

  // Find a single Pokémon by its name (case-insensitive, trimmed input)
  static async findByName(name) {
    // Normalize incoming name: handle null/undefined and trim whitespace
    const cleanedName = (name || '').trim();
    if (!cleanedName) {
      // If the user submits only spaces or nothing, return null instead of querying
      return null;
    }

    // Convert to Capitalized form to match how names are stored in the DB
    const formattedName =
      cleanedName.charAt(0).toUpperCase() + cleanedName.slice(1).toLowerCase();

    // Query the `pokemon` table by description (name)
    const result = await db('pokemon')
      .select('*')
      .where('description', formattedName);

    // Return a single Pokémon object or null if not found
    return result[0] || null;
  }
}

// Export the model so controllers can use it
module.exports = Pokemon;
