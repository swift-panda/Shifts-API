const Router = require('koa-router');
const router = new Router({
  prefix: '/shifts',
});

const {
  listShifts,
  getShift,
  createShift,
  updateShift,
  deleteShift,
} = require('../../db/queries/shifts.js');

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
    ctx.status = 404;
    ctx.body = { message: err.toString() };
  }
});

router.post('/', async (ctx, next) => {
  try {
    const shift = await createShift(ctx.request.body);
    ctx.body = shift;
  } catch (err) {
    ctx.body = err
  }
});

router.put('/:id', async (ctx, next) => {
  try {
    const shift = await updateShift(ctx.params.id, ctx.request.body);
    ctx.body = shift;
  } catch (err) {
    console.error(err);
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

module.exports = router.routes();
