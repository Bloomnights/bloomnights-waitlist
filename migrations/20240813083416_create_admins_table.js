exports.up = function(knex) {
  return knex.schema.createTable('admins', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('email', 255).notNullable().unique();
    table.string('password', 255).notNullable(); // Store hashed passwords
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('admins');
};
