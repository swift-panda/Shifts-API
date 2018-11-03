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
});

router.post('/', async (ctx, next) => {
});

router.put('/:id', async (ctx, next) => {
});

router.delete('/:id', async (ctx, next) => {
});

module.exports = router.routes();
