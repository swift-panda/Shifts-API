const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const passport = require('koa-passport');
const routes = require('./routes');

const port = 3000;
const app = new Koa();
app.use(session({}, app));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser());
app.use(routes);

const server = app.listen(port, () => {
  console.log(`server listening on port: ${port}`);
});

module.exports = server;
