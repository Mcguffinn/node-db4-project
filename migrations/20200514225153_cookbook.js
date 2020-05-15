exports.up = function (knex) {
  return (
    knex.schema
      .createTable("recipes", function (recipes) {
        recipes.increments(); // <-- Makes default id
        recipes.string("recipe_name").notNullable();
      })
      .createTable("ingredients", function (ingredients) {
        ingredients.increments();
        ingredients.string("ingrediants_name").notNullable();
        ingredients.float("ingrediant_value").notNullable();
      })
      .createTable("recipe-ingredients", (ri) => {
        ri.primary(["recipe_id", "ingredients_id"]); // <-- Primary key is a combo of args
        ri.integer("recipe_id")
          .references("id")
          .inTable("recipes")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");

        ri.string("ingredients_id")
          .references("id")
          .inTable("ingredients")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
      })
      .createTable("steps"),
    (steps) => {
      steps.increments();
      steps.string("steps_name").notNullable();
      steps
        .integer("recipe_id")
        .notNullable()
        .references("id")
        .inTable("refrences");
    }
  );
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("steps")
    .dropTableIfExists("recipe-ingredients")
    .dropTableIfExists("ingredients")
    .dropTableIfExists("recipes");
};
