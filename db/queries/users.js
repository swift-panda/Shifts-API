const knex = require('../connection.js');

const listUsers = () => knex('users').select('*');

const getUser = userId => knex('users')
  .select('*')
  .where({ id: userId })
  .first();

const fetchUser = email => knex('users')
  .select('*')
  .where({ email })
  .first();

const createUser = user => knex('users')
  .insert(user)
  .returning('*');

const updateUser = (userId, user) => knex('users')
  .where('id', userId)
  .update(user)
  .returning('*');

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
