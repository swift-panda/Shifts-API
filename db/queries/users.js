const knex = require('../connection.js');

const listUsers = () => knex('users').select('*');

const getUser = userId => knex('users')
  .select('*')
  .where({ id: userId });

const createUser = user => knex('users').insert(user);

const updateUser = (userId, user) => knex('users')
  .where('id', userId)
  .update(user);

const deleteUser = userId => knex('users')
  .where('id', userId)
  .del();

module.exports = {
  listUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
