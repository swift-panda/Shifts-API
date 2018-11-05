require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
chai.use(chaiHttp);
const knex = require('../../db/connection.js');

describe('/shifts', () => {
  let api;
  beforeEach(async () => {
    api = chai.request('http://localhost:3000/api/shifts').keepOpen();
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
  });

  describe('GET /', () => {
    it('should list all shifts', async () => {
      const { body: shifts } = await api.get('');
      expect(shifts.length).to.be.equal(3);
    });

    it('should filter by start date', async () => {
      const now = new Date().toISOString();
      const { body: shifts } = await api.get(`?start=${now}`);
      expect(shifts.length).to.be.equal(2);
    });

    it('should filter by end date', async () => {
      const now = new Date();
      const twoDays = new Date(new Date().setDate(now.getDate() + 2)).toISOString();
      const { body: shifts } = await api.get(`?end=${twoDays}`);
      expect(shifts.length).to.be.equal(1);
    });
  });

  describe('GET /:id', () => {
    it('should get a single shift given id', async () => {
      const { body: shift } = await api.get('/1');
      expect(shift.id).to.be.equal(1);
    });

    it('should return 404 when given invalid id', async () => {
      const { status } = await api.get('/4');
      expect(status).to.be.equal(404);
    });
  });

  describe('POST /', () => {
    it('should create a single shift', () => {
    });

    it('should not allow id to be set', () => {
    });
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
