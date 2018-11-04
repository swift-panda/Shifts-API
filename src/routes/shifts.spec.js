require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
chai.use(chaiHttp);
const knex = require('../../db/connection.js');

describe('/shifts', () => {
  let api;
  beforeEach(async () => {
    api = chai.request('http://localhost:3000').keepOpen();
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
  });

  describe('GET /', () => {
    it('should list all shifts', async () => {
      const shifts = await api.get('/');
      expect(shifts.length).to.be.equal(3);
    });

    it('should filter by start date', () => {
    });

    it('should filter by end date', () => {
    });

    it('should fetch a single shift', () => {
    });
  });

  describe('GET /:id', () => {
    it('should get a single shift given id', () => {
    });

    it('should return 404 when given invalid id', () => {
    });
  });

  describe('POST /', () => {
  });

  describe('PUT /:id', () => {
    it('should update a single shift', () => {
    });

    it('should not allow an id to be changed', () => {
    });

    it('should not allow shifts to overflap for the same user', () => {
    });
  });

  describe('DELETE /:id', () => {
    it('should delete a single shift and give success message', () => {
    });

    it('should fail to find deleted shift', () => {
    });
  });

  afterEach(async () => {
    await knex.migrate.rollback();
    api.close();
  });
});
