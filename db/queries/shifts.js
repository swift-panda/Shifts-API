const knex = require('knex');

const getShift = shiftId => {
  return knex
    .select('*')
    .from('shifts')
    .where({ id: shiftId });
};

const listShifts = () => {
  return knex
    .select('*')
    .from('shifts');
};

module.exports = {
  getShift,
  listShifts,
  // createShift,
  // updateShift,
  // deleteShift,
};
