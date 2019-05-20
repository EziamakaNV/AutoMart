/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable linebreak-style */
import mocha from 'mocha';

import chai from 'chai';

import chaiHttp from 'chai-http';

import server from '../server';

const { expect } = chai;

chai.use(chaiHttp);

describe('POST /api/v1/auth/signup', () => {
  describe('When all values in the POST body are the right format', () => {
    it('Should return an object with properties "status" and "data" on success', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .type('form')
        .send({
          firstName: 'James',
          lastName: 'Potter',
          email: 'JamesP@hogwarts.com',
          password: 'expeliamus',
          address: 'lower bunk, room 23, Gryfindor House, Hogwarts',
        })
        .end((err, res) => {
          // eslint-disable-next-line no-unused-expressions
          expect(err).to.be.null;
          expect(res).to.has.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.haveOwnProperty('status');
          expect(res.body.status).to.equal(200);
          expect(res.body).to.haveOwnProperty('data');
          expect(res.body.data).to.be.a('object');
          done();
        });
    });

    it('Should return an error if the email already exists', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .type('form')
        .send({
          firstName: 'James',
          lastName: 'Potter',
          email: 'john@test.com',
          password: 'expeliamus',
          address: 'lower bunk, room 23, Gryfindor House, Hogwarts',
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.has.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.haveOwnProperty('status');
          expect(res.body.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('error');
          expect(res.body.error).to.be.a('string');
          done();
        });
    });

    it('Should return an error if the length of any of the paremeters is less than 3', (done) => { // Mocha done callback for asynchronous tests
      chai.request(server)
        .post('/api/v1/auth/signup')
        .type('form')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'Me@test.com',
          password: 'secret',
          address: 'nowhere',
        })
        .end((err, res) => {
          // eslint-disable-next-line no-unused-expressions
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          // eslint-disable-next-line no-unused-expressions
          expect(res.body).to.be.a('object');
          expect(res.body).to.haveOwnProperty('status');
          expect(res.body.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('error');
          expect(res.body.error).to.be.a('string');
          done();
        });
    });

    describe('When the POST body parameters are not in the right format', () => {
      it('should not be able to post if all the parameters are not present', (done) => {
        chai.request(server)
          .post('/api/v1/auth/signup')
          .type('form')
          .send({
            firstName: 'John',
            lastName: 'Doe',
            email: 'for@loop.com',
          })
          .end((err, res) => {
            // eslint-disable-next-line no-unused-expressions
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body).to.be.a('object');
            expect(res.body).to.haveOwnProperty('status');
            expect(res.body.status).to.equal(400);
            expect(res.body).to.haveOwnProperty('error');
            expect(res.body.error).to.be.a('string');
            done();
          });
      });
    });
  });
});
