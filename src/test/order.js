/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable linebreak-style */
import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import db from '../models/usingDb/Db/index';

const { expect } = chai;

chai.use(chaiHttp);

describe('POST /api/v2/order', () => {
  describe('A request with a valid token in the cookie (Client logged in)', () => {
    let orderId;
    after((done) => {
      db.query('DELETE FROM orders WHERE id = $1', [orderId]).then(() => done());
    });
  
    it('The request should be successful when all parameters are supplied correctly', (done) => {
      chai.request(server)
        .post('/api/v2/order')
        .type('json')
        .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJqcEBob2d3YXJ0cy5jb20iLCJpYXQiOjE1NTg2MDQzNTEsImV4cCI6MTU5MDE0MDM1MX0.JAM_xR0UEPbdAF5LJC7CwO7nMECAlWJ_nhsXZX-pzWU')
        .send({
          carId: 2,
          amount: 500000,
        })
        .end((err, res) => {
          orderId = res.body.data.id;
          expect(err).to.be.null;
          expect(res, 'response object status').to.have.status(201);
          expect(res.body, 'response body').to.be.a('object');
          expect(res.body, 'response body').to.haveOwnProperty('status');
          expect(res.body.status, 'status property').to.equal(201);
          expect(res.body, 'response body').to.haveOwnProperty('data');
          expect(res.body.data, 'data property').to.be.a('object');
          done();
        });
    });
  
    it('The request shoud not be successful if any of the parameters are missing from the request body', (done) => {
      chai.request(server)
        .post('/api/v2/order')
        .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTU4NDMwNzUwLCJleHAiOjE1ODk5NjY3NTB9.AKuYgp8_C5AdMAmm5EGe1_y_rCl9jctdl4m1yskK-uc')
        .send({
          carId: 1,
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res, 'response object status').to.have.status(400);
          expect(res.body, 'response body').to.be.a('object');
          expect(res.body, 'response body').to.haveOwnProperty('status');
          expect(res.body.status, 'status property').to.equal(400);
          expect(res.body, 'response body').to.haveOwnProperty('error');
          expect(res.body.error, 'data property').to.be.a('string');
          done();
        });
    });
  });
  
  it('The request shouldnt go through if the token in the cookie is missing', (done) => {
    // Jwt missing in cookie
    chai.request(server)
      .post('/api/v2/order')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(401);
        expect(res.body, 'response body').to.be.a('object');
        expect(res.body, 'response body').to.haveOwnProperty('status');
        expect(res.body.status, 'status property').to.equal(401);
        expect(res.body, 'response body').to.haveOwnProperty('error');
        expect(res.body.error).to.be.a('string');
        done();
      });
  });
});

describe('PATCH /api/v2/order/<:order-id>/price', () => {
  describe('A request with a valid token in the cookie (Client logged in)', () => {
    it('The request should be successful when all parameters are supplied correctly', (done) => {
      chai.request(server)
        .patch('/api/v2/order/1/price')
        .type('form')
        .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0QHRlc3Rlci5jb20iLCJpYXQiOjE1NTg2MDIxMDgsImV4cCI6MTU5MDEzODEwOH0.SgG1OgwgrjF76K9U6edowCEpS5HFJP2hy_06DvwV3jg')
        .send({
          amount: 500000,
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res, 'response object status').to.have.status(200);
          expect(res.body, 'response body').to.be.a('object');
          expect(res.body, 'response body').to.haveOwnProperty('status');
          expect(res.body.status, 'status property').to.equal(200);
          expect(res.body, 'response body').to.haveOwnProperty('data');
          expect(res.body.data, 'data property').to.be.a('object');
          done();
        });
    });
  
    let orderId;
    it('Only the person who created the order should be able to update it', (done) => {
      // First make the API request to create an order with user two
      chai.request(server)
        .post('/api/v2/order')
        .type('json')
        .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0QHRlc3Rlci5jb20iLCJpYXQiOjE1NTg2MDIxMDgsImV4cCI6MTU5MDEzODEwOH0.SgG1OgwgrjF76K9U6edowCEpS5HFJP2hy_06DvwV3jg')
        .send({
          carId: 2,
          amount: 500000,
        })
        .end((err, res) => {
          orderId = res.body.data.id;
          expect(err).to.be.null;
          expect(res, 'response object status').to.have.status(201);
          expect(res.body, 'response body').to.be.a('object');
          expect(res.body, 'response body').to.haveOwnProperty('status');
          expect(res.body.status, 'status property').to.equal(201);
          expect(res.body, 'response body').to.haveOwnProperty('data');
          expect(res.body.data, 'data property').to.be.a('object');
          // Make another request with user three(token) to update the same order
          chai.request(server)
            .patch(`/api/v2/order/${orderId}/price`)
            .type('form')
            .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJqcEBob2d3YXJ0cy5jb20iLCJpYXQiOjE1NTg2MDQzNTEsImV4cCI6MTU5MDE0MDM1MX0.JAM_xR0UEPbdAF5LJC7CwO7nMECAlWJ_nhsXZX-pzWU')
            .send({
              amount: 500000,
            })
            .end((error, resp) => {
              expect(error).to.be.null;
              expect(resp, 'response object status').to.have.status(401);
              expect(resp.body, 'response body').to.be.a('object');
              expect(resp.body, 'response body').to.haveOwnProperty('status');
              expect(resp.body.status, 'status property').to.equal(401);
              expect(resp.body, 'response body').to.haveOwnProperty('error');
              expect(resp.body.error, 'error property').to.be.a('string');
              done();
            });
        });
    });
  
    after((done) => {
      db.query('DELETE FROM orders WHERE id = $1', [orderId]).then(() => { done(); });
    });
  
    it('The request shoud not be successful if any of the parameters are missing from the request body', (done) => {
      chai.request(server)
        .patch('/api/v2/order/1/price')
        .type('form')
        .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTU4NDMwNzUwLCJleHAiOjE1ODk5NjY3NTB9.AKuYgp8_C5AdMAmm5EGe1_y_rCl9jctdl4m1yskK-uc')
        .send({
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res, 'response object status').to.have.status(400);
          expect(res.body, 'response body').to.be.a('object');
          expect(res.body, 'response body').to.haveOwnProperty('status');
          expect(res.body.status, 'status property').to.equal(400);
          expect(res.body, 'response body').to.haveOwnProperty('error');
          expect(res.body.error, 'data property').to.be.a('string');
          done();
        });
    });
  });
  
  it('The request shoud not be successful if the orderid doesnt exist or is invalid', (done) => {
    chai.request(server)
      .patch('/api/v2/order/ttyr/price')
      .type('form')
      .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0QHRlc3Rlci5jb20iLCJpYXQiOjE1NTg2MDIxMDgsImV4cCI6MTU5MDEzODEwOH0.SgG1OgwgrjF76K9U6edowCEpS5HFJP2hy_06DvwV3jg')
      .send({
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res, 'response object status').to.have.status(400);
        expect(res.body, 'response body').to.be.a('object');
        expect(res.body, 'response body').to.haveOwnProperty('status');
        expect(res.body.status, 'status property').to.equal(400);
        expect(res.body, 'response body').to.haveOwnProperty('error');
        expect(res.body.error, 'error property').to.be.a('string');
        done();
      });
  });
  
  it('The request shouldnt go through if the token in the cookie is missing', (done) => {
    // Jwt missing in cookie
    chai.request(server)
      .patch('/api/v2/order/1/price')
      .type('form')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(401);
        expect(res.body, 'response body').to.be.a('object');
        expect(res.body, 'response body').to.haveOwnProperty('status');
        expect(res.body.status, 'status property').to.equal(401);
        expect(res.body, 'response body').to.haveOwnProperty('error');
        expect(res.body.error).to.be.a('string');
        done();
      });
  });
});

describe('GET /api/v2/order/myOrder', () => {
  describe('When the token is present', () => {
    it('When all parameters are correctly supplied the request is successful', (done) => {
      chai.request(server)
        .get('/api/v2/order/myOrder')
        .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJraWxsYmlsbEB0ZXN0LmNvbSIsImlhdCI6MTU1OTE0NDIyMiwiZXhwIjoxNTkwNjgwMjIyfQ.Ck2c3jUUCQez0Lp4WFf1iLDkkTUSuHhtIcgTQ7vMwsA')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res, 'response object status').to.have.status(200);
          expect(res.body, 'response body').to.be.a('object');
          expect(res.body, 'response body').to.haveOwnProperty('status');
          expect(res.body.status, 'status property').to.equal(200);
          expect(res.body, 'response body').to.haveOwnProperty('data');
          expect(res.body.data, 'data property').to.be.a('array');
          done();
        });
    });
  });

  describe('When there are issues with the token', (done) => {
    it('The request shouldnt go through if the token in the cookie is missing', (done) => {
      // Jwt missing in cookie
      chai.request(server)
        .get('/api/v2/order/myOrder')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(401);
          expect(res.body, 'response body').to.be.a('object');
          expect(res.body, 'response body').to.haveOwnProperty('status');
          expect(res.body.status, 'status property').to.equal(401);
          expect(res.body, 'response body').to.haveOwnProperty('error');
          expect(res.body.error).to.be.a('string');
          done();
        });
    });
  });
});

describe('GET /api/v2/order/myOrder/:orderId', () => {
  describe('When the token is present', () => {
    it('When all parameters are correctly supplied the request is successful', (done) => {
      chai.request(server)
        .get('/api/v2/order/myOrder/152')
        .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJraWxsYmlsbEB0ZXN0LmNvbSIsImlhdCI6MTU1OTE0NDIyMiwiZXhwIjoxNTkwNjgwMjIyfQ.Ck2c3jUUCQez0Lp4WFf1iLDkkTUSuHhtIcgTQ7vMwsA')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res, 'response object status').to.have.status(200);
          expect(res.body, 'response body').to.be.a('object');
          expect(res.body, 'response body').to.haveOwnProperty('status');
          expect(res.body.status, 'status property').to.equal(200);
          expect(res.body, 'response body').to.haveOwnProperty('data');
          expect(res.body.data, 'data property').to.be.a('object');
          done();
        });
    });
  });

  describe('When there are issues with the token', (done) => {
    it('The request shouldnt go through if the token in the cookie is missing', (done) => {
      // Jwt missing in cookie
      chai.request(server)
        .get('/api/v2/order/myOrder/152')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(401);
          expect(res.body, 'response body').to.be.a('object');
          expect(res.body, 'response body').to.haveOwnProperty('status');
          expect(res.body.status, 'status property').to.equal(401);
          expect(res.body, 'response body').to.haveOwnProperty('error');
          expect(res.body.error).to.be.a('string');
          done();
        });
    });
  });
});
