/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.hasTable("pokemon").then((exists) => {
    if (!exists) {
      return knex.schema.createTable("pokemon", function (table) {
        table.increments("pokemonid").primary();   // SERIAL PRIMARY KEY
        table.string("description", 30).notNullable(); // varchar(30) NOT NULL
        table.integer("base_total").notNullable();     // integer NOT NULL
      });
    }
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("pokemon");
};