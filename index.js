const Koa = require('koa');
const app = new Koa();
const port = 3000;

app.use(async ctx => {
  ctx.body = 'Hello World';
});

const server = app.listen(post, () => {
  console.log(`server listening on port: ${post}`);
});

module.exports = server;
