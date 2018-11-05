const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const routes = require('./routes');

const port = 3000;
const app = new Koa();
app.use(bodyParser());
app.use(routes);

const server = app.listen(port, () => {
  console.log(`server listening on port: ${port}`);
});

module.exports = server;
