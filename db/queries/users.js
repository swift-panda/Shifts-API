const knex = require('../connection.js');
const users = knex('users');

const listUsers = () => users.select('*');

const getUser = userId => users
  .select('*')
  .where({ id: userId });

const createUser = user => users.insert(user);

const updateUser = (userId, user) => users
  .where('id', userId)
  .update(user);

const deleteUser = userId => users
  .where('id', userId)
  .del();

module.exports = {
  listUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
