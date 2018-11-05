const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
chai.use(chaiHttp);
const knex = require('../../../db/connection.js');

describe('/users', () => {
  let api;
  beforeEach(async () => {
    api = chai.request('http://localhost:3000/api/users').keepOpen();
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
  });

  describe('GET /', () => {
  });

  describe('GET /:id', () => {
  });

  describe('POST /', () => {
  });

  describe('PUT /:id', () => {
  });

  describe('DELETE /:id', () => {
  });

  afterEach(async () => {
    await knex.migrate.rollback();
    api.close();
  });
});
