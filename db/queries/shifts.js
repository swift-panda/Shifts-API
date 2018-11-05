const knex = require('../connection.js');

const listShifts = ({ userId, start, end }) => {
  const list = knex('shifts').select('*');
  if (userId) list.andWhere('user_id', userId);
  if (start) list.andWhere('start', '>=', start);
  if (end) list.andWhere('end', '<=', end);
  return list;
}

const getShift = shiftId => knex('shifts')
  .select('*')
  .where({ id: shiftId })
  .first();

const createShift = shift => knex('shifts')
  .insert(shift)
  .returning('*');

const updateShift = (shiftId, shift) => knex('shifts')
  .where('id', shiftId)
  .update(shift)
  .returning('*');

const deleteShift = shiftId => knex('shifts')
  .where('id', shiftId)
  .del();

module.exports = {
  listShifts,
  getShift,
  createShift,
  updateShift,
  deleteShift,
};
