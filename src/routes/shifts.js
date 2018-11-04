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
    console.error(err);
  }
});

router.get('/:id', async (ctx, next) => {
  try {
    const shift = await getShift(ctx.params.id);
    ctx.body = shift;
  } catch (err) {
    console.error(err);
  }
});

router.post('/', async (ctx, next) => {
  try {
    const shift = await createShift(ctx.req);
    ctx.body = shift;
  } catch (err) {
    console.error(err);
  }
});

router.put('/:id', async (ctx, next) => {
  try {
    const user = await updateShift(ctx.params.id, ctx.req);
    ctx.body = shift;
  } catch (err) {
    console.error(err);
  }
});

router.delete('/:id', async (ctx, next) => {
  try {
    deleteShift(ctx.params.id);
    ctx.body = { message: `successfully deleted shift ${ctx.params.id}` };
  } catch (err) {
    console.error(err);
  }
});

module.exports = router.routes();
