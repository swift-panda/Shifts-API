const Router = require('koa-router');
const router = new Router({
  prefix: '/api',
});

const users = require('./users');
const shifts = require('./shifts');
const auth = require('./auth');

router.use(users);
router.use(shifts);
router.use(auth);

module.exports = router.routes();
