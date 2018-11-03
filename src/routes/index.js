const Router = require('koa-router');
const router = new Router({
  prefix: '/api',
});

const users = require('./users');
const shifts = require('./shifts');

router.use(users);
router.use(shifts);

module.exports = router.routes();
