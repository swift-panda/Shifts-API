exports.up = (knex, Promise) => {
  return knex.schema.createTable('shifts', table => {
    table.increments('id');
    table.datetime('start').notNullable();
    table.datetime('end').notNullable();

    table.integer('user_id').notNullable().unsigned();
    table.foreign('user_id').references('id').inTable('users');

    table.timestamps(true, true);
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('shifts');
};
