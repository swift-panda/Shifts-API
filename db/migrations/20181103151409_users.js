exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', table => {
    table.increments('id');
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('email').notNullable().unique();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users');
};
