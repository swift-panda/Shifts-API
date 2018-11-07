const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
chai.use(chaiHttp);
const knex = require('../../../db/connection.js');

const totalShifts = 5;

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
      expect(shifts.length).to.be.equal(totalShifts);
    });

    it('should filter by start date', async () => {
      const { body: shifts } = await api.get('?start=2018-10-07T09:00:00.000Z');
      expect(shifts.length).to.be.equal(2);
    });

    it('should filter by end date', async () => {
      const { body: shifts } = await api.get('?end=2018-10-07T17:00:00.000Z');
      expect(shifts.length).to.be.equal(4);
    });
  });

  describe('GET /:id', () => {
    it('should get a single shift given id', async () => {
      const { body: shift } = await api.get('/1');
      expect(shift.id).to.be.equal(1);
    });

    it('should return 404 when given invalid id', async () => {
      const { status } = await api.get('/6');
      expect(status).to.be.equal(404);
    });
  });

  describe('POST /', () => {
    it('should create a single shift', async () => {
      const { body: shift } = await api.post('').send({
        user_id: 5,
        start: '2018-10-06T09:00:00.000Z',
        end: '2018-10-06T17:00:00.000Z',
      });
      const { body: shifts } = await api.get('');
      expect(shifts.length).to.be.equal(totalShifts + 1);
    });

    it('should not allow id to be set', async () => {
      const { body: shift } = await api.post('').send({
        id: 42,
        user_id: 5,
        start: '2018-10-06T09:00:00.000Z',
        end: '2018-10-06T17:00:00.000Z',
      });
      expect(shift.id).to.not.equal(42);
      const { body: shifts } = await api.get('');
      expect(shifts.length).to.be.equal(totalShifts + 1);
    });

    it('should not allow created_at to be set', async () => {
    });

    it('should not allow updated_at to be set', async () => {
    });

    describe('check shift bookends', () => {
      it('should allow shift to be created with start at the end of previous shift', async () => {
        await api.post('').send({
          user_id: 1,
          start: '2018-10-06T17:00:00.000Z',
          end: '2018-10-06T18:00:00.000Z',
        });
        const { body: shifts } = await api.get('');
        expect(shifts.length).to.be.equal(totalShifts + 1);
      });

      it('should allow shift to be created with end at the start of next shift', async () => {
        await api.post('').send({
          user_id: 1,
          start: '2018-10-06T08:00:00.000Z',
          end: '2018-10-06T09:00:00.000Z',
        });
        const { body: shifts } = await api.get('');
        expect(shifts.length).to.be.equal(totalShifts + 1);
      });
    });

    describe('check shift overlap', () => {
      it('should not allow shift to be created within existing shift', async () => {
        const { status } = await api.post('').send({
          user_id: 1,
          start: '2018-10-06T10:00:00.000Z',
          end: '2018-10-06T16:00:00.000Z',
        });
        expect(status).to.be.equal(400);
        const { body: shifts } = await api.get('');
        expect(shifts.length).to.be.equal(totalShifts);
      });

      it('should not allow shift to be created that envelops existing shift', async () => {
        const { status } = await api.post('').send({
          user_id: 1,
          start: '2018-10-06T08:00:00.000Z',
          end: '2018-10-06T18:00:00.000Z',
        });
        expect(status).to.be.equal(400);
        const { body: shifts } = await api.get('');
        expect(shifts.length).to.be.equal(totalShifts);
      });

      it('should not allow shift to be created that starts before existing shift and ends between start and end of existing shift', async () => {
        const { status } = await api.post('').send({
          user_id: 1,
          start: '2018-10-06T08:00:00.000Z',
          end: '2018-10-06T16:00:00.000Z',
        });
        expect(status).to.be.equal(400);
        const { body: shifts } = await api.get('');
        expect(shifts.length).to.be.equal(totalShifts);
      });

      it('should not allow shift to be created that ends after existing shift and starts between start and end of existing shift', async () => {
        const { status } = await api.post('').send({
          user_id: 1,
          start: '2018-10-06T10:00:00.000Z',
          end: '2018-10-06T18:00:00.000Z',
        });
        expect(status).to.be.equal(400);
        const { body: shifts } = await api.get('');
        expect(shifts.length).to.be.equal(totalShifts);
      });
    });
  });

  describe('PATCH /:id', () => {
    it('should update a single shift', async () => {
      const { status, body } = await api.patch('/1').send({
        start: '2018-10-06T08:00:00.000Z',
        end: '2018-10-06T18:00:00.000Z',
      });
      expect(status).to.be.equal(200);
      expect(body[0].start).to.be.equal('2018-10-06T08:00:00.000Z');
    });

    it('should not allow an id to be changed', async () => {
    });

    it('should not allow created_at to be updated', async () => {
    });

    it('should not allow updated_at to be manually updated', async () => {
    });
  });

  describe('DELETE /:id', () => {
    it('should delete a single shift and give success message', async () => {
      const { status } = await api.delete('/1');
      expect(status).to.be.equal(200);
      const { body: shifts } = await api.get('');
      expect(shifts.length).to.be.equal(totalShifts - 1);
    });

    it('should return 404 when given invalid id', async () => {
    });
  });

  afterEach(async () => {
    await knex.migrate.rollback();
    api.close();
  });
});
