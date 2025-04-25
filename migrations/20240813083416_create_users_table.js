exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.string('firstname', 255).notNullable();
      table.string('lastname', 255).notNullable();
      table.string('email', 255).notNullable().unique();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('users');
  };
  