const knex = require('../connection.js');
const shifts = knex('shifts');

const listShifts = () => shifts.select('*');

const getShift = shiftId => shifts
  .select('*')
  .where({ id: shiftId });

const createShift = shift => shift.insert(shift);

const updateShift = (shiftId, shift) => shifts
  .where('id', shiftId)
  .update(shift);

const deleteUser = shiftId => shifts
  .where('id', shiftId)
  .del();

module.exports = {
  listShifts,
  getShift,
  createShift,
  updateShift,
  deleteShift,
};
