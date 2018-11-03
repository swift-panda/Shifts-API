// Update with your config settings.

const path = require('path');
const BASE_PATH = path.join(__dirname, 'db');

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'shifts_dev',
      user:     'postgres',
      password: 'postgres'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'shifts',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  }

};
