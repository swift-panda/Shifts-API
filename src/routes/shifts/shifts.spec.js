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
    it('should create a single shift', async () => {
      const now = new Date();
      const { body: shift } = await api.post('').send({
        user_id: 5,
        start: now.toISOString(),
        end: now.toISOString(),
      });
      const { body: shifts } = await api.get('');
      expect(shifts.length).to.be.equal(4);
    });

    it('should not allow id to be set', async () => {
      const now = new Date();
      const { body: shift } = await api.post('').send({
        id: 42,
        user_id: 4,
        start: now.toISOString(),
        end: now.toISOString(),
      });
      expect(shift.id).to.not.equal(42);
      const { body: shifts } = await api.get('');
      expect(shifts.length).to.be.equal(4);
    });

    it('should not allow created_at to be set', async () => {
    });

    it('should not allow updated_at to be set', async () => {
    });

    it('should not allow a shift to be created the overlaps with users shifts', async () => {
    });
  });

  describe('PUT /:id', () => {
    it('should update a single shift', async () => {
    });

    it('should not allow an id to be changed', async () => {
    });

    it('should not allow created_at to be updated', async () => {
    });

    it('should not allow updated_at to be manually updated', async () => {
    });

    it('should not allow shifts to overlap for the same user', async () => {
    });
  });

  describe('DELETE /:id', () => {
    it('should delete a single shift and give success message', async () => {
      const { status } = await api.delete('/1');
      expect(status).to.be.equal(200);
      const { body: shifts } = await api.get('');
      expect(shifts.length).to.be.equal(2);
    });

    it('should return 404 when given invalid id', async () => {
    });
  });

  afterEach(async () => {
    await knex.migrate.rollback();
    api.close();
  });
});
