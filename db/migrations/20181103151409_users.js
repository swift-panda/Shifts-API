exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', table => {
    table.increments('id');
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('email').notNullable().unique();
    table.boolean('admin').notNullable().defaultTo(false);
    table.timestamps(true, true);
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users');
};
