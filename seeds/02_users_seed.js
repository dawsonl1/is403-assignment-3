/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Check if a manager already exists
  const existing = await knex("users")
    .where({ username: "dawson" })
    .first();

  if (!existing) {
    // Create a default manager user
    await knex("users").insert({
      username: "dawson",
      password: "dawson",  // You can change this
      user_level: "M"
    });
  }
};