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
    console.error(err);
  }
});

router.get('/:id', async (ctx, next) => {
  try {
    const user = await getUser(ctx.params.id);
    ctx.body = user;
  } catch (err) {
    console.error(err);
  }
});

router.get('/:id/shifts', async (ctx, next) => {
  try {
    const { start, end } = ctx.request.query;
    const shifts = await listShifts({ userId: ctx.params.id, start, end });
    ctx.body = shifts;
  } catch (err) {
    console.error(err);
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
    deleteUser(ctx.params.id);
    ctx.body = { message: `successfully deleted user ${ctx.params.id}` };
  } catch (err) {
    console.error(err);
  }
});

module.exports = router.routes();
