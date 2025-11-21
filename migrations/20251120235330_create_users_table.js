/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.hasTable("users").then((exists) => {
    if (!exists) {
      return knex.schema.createTable("users", function (table) {
        table.increments("userid").primary();   // SERIAL PRIMARY KEY
        table.string("username");               // varchar
        table.string("password");               // varchar
        table.string("user_level", 1);          // varchar(1)
      });
    }
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};