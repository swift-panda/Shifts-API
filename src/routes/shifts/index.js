const Router = require('koa-router');
const router = new Router({
  prefix: '/shifts',
});

const {
  listShifts,
  findConflictingShifts,
  getShift,
  createShift,
  updateShift,
  deleteShift,
} = require('../../../db/queries/shifts.js');

router.get('/', async (ctx, next) => {
  try {
    const { start, end } = ctx.request.query;
    const shifts = await listShifts({ start, end });
    ctx.body = shifts;
  } catch (err) {
    // console.error(err);
  }
});

router.get('/:id', async (ctx, next) => {
  try {
    const shift = await getShift(ctx.params.id);
    if (!shift) throw new Error(`Shift ${ctx.params.id} not found`);
    ctx.body = shift;
  } catch (err) {
    ctx.status = 404; // Not found
    ctx.body = { message: err.toString() };
  }
});

router.post('/', async (ctx, next) => {
  try {
    const { user_id, start, end } = ctx.request.body;
    await validateShift(user_id, start, end);
    const shift = await createShift(ctx.request.body);
    ctx.body = shift;
  } catch (err) {
    ctx.status = 400; // Bad data
    ctx.body = { message: err.toString() };
  }
});

router.patch('/:id', async (ctx, next) => {
  try {
    const { start: originalStart, end: originalEnd } = fetchShift(ctx.params.id);
    // extract start and end, only they can be updated
    const { user_id, start, end } = ctx.request.body;
    await validateShift(user_id, start || originalStart, end || originalEnd);
    const shift = await updateShift(ctx.params.id, { start, end });
    ctx.body = shift;
  } catch (err) {
    ctx.status = 400; // Bad data
    ctx.body = { message: err.toString() };
  }
});

router.delete('/:id', async (ctx, next) => {
  try {
    await deleteShift(ctx.params.id);
    ctx.body = { message: `Successfully deleted shift ${ctx.params.id}` };
  } catch (err) {
    ctx.status = 404
    ctx.body = { message: `Error: Shift ${ctx.params.id} not found` };
  }
});

const fetchShift = async id => {
  const shift = await getShift(id);
  if (!shift) throw new Error(`Shift ${id} not found`);
  return shift;
}

// function that checks if there is an overlapping shift
const validateShift = async (userId, start, end) => {
  const shifts = await findConflictingShifts({ userId, start, end });
  if (shifts.length > 0) {
    const shiftIds = shifts.map(shift => shift.id).join(', ');
    throw new Error(`Shift cannot be created, conflicts with the following ${shiftIds}`);
  }
};

module.exports = router.routes();
