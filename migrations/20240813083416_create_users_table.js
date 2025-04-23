exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('fullname', 255).notNullable();
      table.string('email', 255).notNullable().unique();
      table.string('phone', 20).notNullable();
      table.string('country', 100).notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('users');
  };
  