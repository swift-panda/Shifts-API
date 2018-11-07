const knex = require('../connection.js');

const listShifts = ({ userId, start, end }) => {
  const list = knex('shifts').select('*');
  if (userId) list.andWhere('user_id', userId);
  if (start) list.andWhere('start', '>=', start);
  if (end) list.andWhere('end', '<=', end);
  return list;
}

const findConflictingShifts = ({ userId, start, end, shiftId }) => {
  const conflicts = knex('shifts')
  .select('*')
  .where('user_id', userId)
  .andWhere(builder =>
    builder.where('start', '>=', start).andWhere('end', '<=', end)
    .orWhere(builder => builder.where('start', '<=', start).andWhere('end', '>=', end))
    .orWhere(builder => builder.where('start', '>', start).andWhere('start', '<', end).andWhere('end', '>', start).andWhere('end', '>', end))
    .orWhere(builder => builder.where('start', '<', start).andWhere('start', '<', end).andWhere('end', '>', start).andWhere('end', '<', end))
  );
  if (shiftId) conflicts.whereNot('id', shiftId);
  return conflicts
};

const getShift = shiftId => knex('shifts')
  .first('*')
  .where({ id: shiftId });

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
  findConflictingShifts,
  getShift,
  createShift,
  updateShift,
  deleteShift,
};
