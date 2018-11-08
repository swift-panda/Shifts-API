const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const Router = require('koa-router');
const router = new Router({
  prefix: '/auth',
});

router.post('/login', async ctx => {
});

router.get('/logout', async ctx => {
  if (ctx.isAuthenticated()) {
    ctx.logout();
  } else {
    ctx.body = { success: false };
    ctx.throw(401);
  }
});

module.exports = router.routes();
