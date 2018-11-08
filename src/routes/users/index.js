const Router = require('koa-router');
const router = new Router({
  prefix: '/users',
});

const {
  listUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../../../db/queries/users.js');
const { listShifts } = require('../../../db/queries/shifts.js');

router.get('/', async (ctx, next) => {
  try {
    const users = await listUsers();
    ctx.body = users;
  } catch (err) {
    ctx.status = 400;
    ctx.body = { message: err.toString() };
  }
});

router.get('/:id', async (ctx, next) => {
  try {
    const user = await getUser(ctx.params.id);
    if (!user) throw new Error(`User ${ctx.params.id} not found`);
    ctx.body = user;
  } catch (err) {
    ctx.status = 404;
    ctx.body = { message: err.toString() };
  }
});

router.get('/:id/shifts', async (ctx, next) => {
  try {
    const { start, end } = ctx.request.query;
    const shifts = await listShifts({ userId: ctx.params.id, start, end });
    ctx.body = shifts;
  } catch (err) {
    ctx.status = 400;
    ctx.body = { message: err.toString() };
  }
});

router.post('/', async (ctx, next) => {
  try {
    const user = await createUser(ctx.req);
    ctx.body = user;
  } catch (err) {
    console.error(err);
  }
});

router.patch('/:id', async (ctx, next) => {
  try {
    const user = await updateUser(ctx.params.id, ctx.req);
    ctx.body = user;
  } catch (err) {
    console.error(err);
  }
});

router.delete('/:id', async (ctx, next) => {
  try {
    await deleteUser(ctx.params.id);
    ctx.body = { message: `successfully deleted user ${ctx.params.id}` };
  } catch (err) {
    ctx.status = 404;
    ctx.body = { message: `Shift ${ctx.params.id} not found` };
  }
});

module.exports = router.routes();
