const Koa = require('koa');
const routes = require('./routes');
const app = new Koa();
const port = 3000;

// app.use(async ctx => {
//   ctx.body = 'You found me!';
// });

app.use(routes);

const server = app.listen(port, () => {
  console.log(`server listening on port: ${port}`);
});

module.exports = server;
