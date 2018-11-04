const Router = require('koa-router');
const router = new Router({
  prefix: '/users',
});

const {
  listUsers,
  getUsers,
  createUser,
  updateUser,
  deleteUser
} = require('../../db/queries/users.js');

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

router.post('/', async (ctx, next) => {
  try {
    const user = await createUser(ctx.req);
    ctx.body = user;
  } catch (err) {
    console.error(err);
  }
});

router.put('/:id', async (ctx, next) => {
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
