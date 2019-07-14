"use strict";

var _mocha = _interopRequireDefault(require("mocha"));

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../server"));

var _index = _interopRequireDefault(require("../models/usingDb/Db/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-extraneous-dependencies */

/* eslint-disable linebreak-style */
const expect = _chai.default.expect;

_chai.default.use(_chaiHttp.default);

describe('POST /api/v1/car/', () => {
  it('The request shouldnt go through if the token in the cookie is missing', done => {
    // Jwt missing in cookie
    _chai.default.request(_server.default).post('/api/v1/car').end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(400);
      expect(res.body, 'response body').to.be.a('object');
      expect(res.body, 'response body').to.haveOwnProperty('status');
      expect(res.body.status, 'status property').to.equal(400);
      expect(res.body, 'response body').to.haveOwnProperty('error');
      expect(res.body.error).to.be.a('string');
      done();
    });
  });
  describe('A request with a valid token in the cookie (Client logged in)', () => {
    let car_id;
    after(done => {
      _index.default.query('DELETE FROM cars where id = $1', [car_id]).then(() => {
        done();
      });
    });
    it('The request should be successful when all parameters are supplied correctly', done => {
      _chai.default.request(_server.default).post('/api/v1/car').set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTU4NDMwNzUwLCJleHAiOjE1ODk5NjY3NTB9.AKuYgp8_C5AdMAmm5EGe1_y_rCl9jctdl4m1yskK-uc').send({
        state: 'new',
        status: 'available',
        price: '2000000',
        manufacturer: 'Toyota',
        model: 'Camry',
        body_type: 'car'
      }).end((err, res) => {
        expect(err).to.be.null;
        expect(res, 'response object status').to.have.status(201);
        expect(res.body, 'response body').to.be.a('object');
        expect(res.body, 'response body').to.haveOwnProperty('status');
        expect(res.body.status, 'status property').to.equal(201);
        expect(res.body, 'response body').to.haveOwnProperty('data');
        expect(res.body.data, 'data property').to.be.a('object');
        car_id = res.body.data.id;
        done();
      });
    });
    it('The request shoud not be successful if any of the parameters are missing from the request body', done => {
      _chai.default.request(_server.default).post('/api/v1/car').set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTU4NDMwNzUwLCJleHAiOjE1ODk5NjY3NTB9.AKuYgp8_C5AdMAmm5EGe1_y_rCl9jctdl4m1yskK-uc').send({
        state: 'new',
        status: 'available',
        manufacturer: 'Toyota',
        model: 'Camry',
        type: 'car'
      }).end((err, res) => {
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
});
describe('PATCH /api/v1/car/<:car-id>/status', () => {
  describe('When the token is present', () => {
    it('When all parameters are correctly supplied the request is successful', done => {
      _chai.default.request(_server.default).patch('/api/v1/car/3/status').type('json').set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0QHRlc3Rlci5jb20iLCJpYXQiOjE1NTg2MDIxMDgsImV4cCI6MTU5MDEzODEwOH0.SgG1OgwgrjF76K9U6edowCEpS5HFJP2hy_06DvwV3jg').send({
        status: 'sold'
      }).end((err, res) => {
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
    let car_id;
    it('Only the owner of the ad can update the status of the car ad', done => {
      // Create a car ad with user two token
      _chai.default.request(_server.default).post('/api/v1/car').type('json').set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0QHRlc3Rlci5jb20iLCJpYXQiOjE1NTg2MDIxMDgsImV4cCI6MTU5MDEzODEwOH0.SgG1OgwgrjF76K9U6edowCEpS5HFJP2hy_06DvwV3jg').send({
        state: 'new',
        status: 'available',
        price: '2000000',
        manufacturer: 'Bitch',
        model: 'One',
        body_type: 'biatch'
      }).end((err, res) => {
        car_id = res.body.data.id;
        expect(err).to.be.null;
        expect(res, 'response object status').to.have.status(201);
        expect(res.body, 'response body').to.be.a('object');
        expect(res.body, 'response body').to.haveOwnProperty('status');
        expect(res.body.status, 'status property').to.equal(201);
        expect(res.body, 'response body').to.haveOwnProperty('data');
        expect(res.body.data, 'data property').to.be.a('object'); // Update the status with user three token

        _chai.default.request(_server.default).patch("/api/v1/car/".concat(car_id, "/status")).type('json').set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJqcEBob2d3YXJ0cy5jb20iLCJpYXQiOjE1NTg2MDQzNTEsImV4cCI6MTU5MDE0MDM1MX0.JAM_xR0UEPbdAF5LJC7CwO7nMECAlWJ_nhsXZX-pzWU').send({
          status: 'sold'
        }).end((error, resp) => {
          expect(error).to.be.null;
          expect(resp, 'response object status').to.have.status(400);
          expect(resp.body, 'response body').to.be.a('object');
          expect(resp.body, 'response body').to.haveOwnProperty('status');
          expect(resp.body.status, 'status property').to.equal(400);
          expect(resp.body, 'response body').to.haveOwnProperty('error');
          expect(resp.body.error, 'data property').to.be.a('string');
          done();
        });
      });
    });
    after(done => {
      _index.default.query('DELETE FROM cars WHERE id = $1', [car_id]).then(() => {
        done();
      });
    });
    it('The request shoud not be successful if the car_id doesnt exist or is invalid', done => {
      _chai.default.request(_server.default).patch('/api/v1/car/ttyr/status').type('form').set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0QHRlc3Rlci5jb20iLCJpYXQiOjE1NTg2MDIxMDgsImV4cCI6MTU5MDEzODEwOH0.SgG1OgwgrjF76K9U6edowCEpS5HFJP2hy_06DvwV3jg').send({}).end((err, res) => {
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
  });
  it('The request shouldnt go through if the token in the cookie is missing', done => {
    // Jwt missing in cookie
    _chai.default.request(_server.default).patch('/api/v1/car/1/status').type('form').end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(400);
      expect(res.body, 'response body').to.be.a('object');
      expect(res.body, 'response body').to.haveOwnProperty('status');
      expect(res.body.status, 'status property').to.equal(400);
      expect(res.body, 'response body').to.haveOwnProperty('error');
      expect(res.body.error).to.be.a('string');
      done();
    });
  });
});
describe('PATCH /api/v1/car/<:car-id>/price', () => {
  describe('When the token is present', () => {
    it('When all parameters are correctly supplied the request is successful', done => {
      _chai.default.request(_server.default).patch('/api/v1/car/3/price').type('json').set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0QHRlc3Rlci5jb20iLCJpYXQiOjE1NTg2MDIxMDgsImV4cCI6MTU5MDEzODEwOH0.SgG1OgwgrjF76K9U6edowCEpS5HFJP2hy_06DvwV3jg').send({
        price: 90000
      }).end((err, res) => {
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
    let car_id;
    it('Only the owner of the ad can update the price of the car ad', done => {
      // Create a car ad with user two token
      _chai.default.request(_server.default).post('/api/v1/car').type('json').set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0QHRlc3Rlci5jb20iLCJpYXQiOjE1NTg2MDIxMDgsImV4cCI6MTU5MDEzODEwOH0.SgG1OgwgrjF76K9U6edowCEpS5HFJP2hy_06DvwV3jg').send({
        state: 'new',
        status: 'available',
        price: '2000000',
        manufacturer: 'Toyota',
        model: 'Camry',
        body_type: 'car'
      }).end((err, res) => {
        car_id = res.body.data.id;
        expect(err).to.be.null;
        expect(res, 'response object status').to.have.status(201);
        expect(res.body, 'response body').to.be.a('object');
        expect(res.body, 'response body').to.haveOwnProperty('status');
        expect(res.body.status, 'status property').to.equal(201);
        expect(res.body, 'response body').to.haveOwnProperty('data');
        expect(res.body.data, 'data property').to.be.a('object'); // Update the price with user three token

        _chai.default.request(_server.default).patch("/api/v1/car/".concat(car_id, "/price")).type('json').set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJqcEBob2d3YXJ0cy5jb20iLCJpYXQiOjE1NTg2MDQzNTEsImV4cCI6MTU5MDE0MDM1MX0.JAM_xR0UEPbdAF5LJC7CwO7nMECAlWJ_nhsXZX-pzWU').send({
          price: 983829
        }).end((error, resp) => {
          expect(error).to.be.null;
          expect(resp, 'response object status').to.have.status(400);
          expect(resp.body, 'response body').to.be.a('object');
          expect(resp.body, 'response body').to.haveOwnProperty('status');
          expect(resp.body.status, 'status property').to.equal(400);
          expect(resp.body, 'response body').to.haveOwnProperty('error');
          expect(resp.body.error, 'data property').to.be.a('string');
          done();
        });
      });
    });
    after(done => {
      _index.default.query('DELETE from cars WHERE id = $1', [car_id]).then(() => {
        done();
      });
    });
    it('The request shoud not be successful if any of the parameters are missing from the request body', done => {
      _chai.default.request(_server.default).patch('/api/v1/car/3/price').type('json').set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0QHRlc3Rlci5jb20iLCJpYXQiOjE1NTg2MDIxMDgsImV4cCI6MTU5MDEzODEwOH0.SgG1OgwgrjF76K9U6edowCEpS5HFJP2hy_06DvwV3jg').send({}).end((err, res) => {
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
    it('The request shoud not be successful if the car_id doesnt exist or is invalid', done => {
      _chai.default.request(_server.default).patch('/api/v1/car/ttyr/price').type('form').set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0QHRlc3Rlci5jb20iLCJpYXQiOjE1NTg2MDIxMDgsImV4cCI6MTU5MDEzODEwOH0.SgG1OgwgrjF76K9U6edowCEpS5HFJP2hy_06DvwV3jg').send({}).end((err, res) => {
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
  });
  it('The request shouldnt go through if the token in the cookie is missing', done => {
    // Jwt missing in cookie
    _chai.default.request(_server.default).patch('/api/v1/car/1/price').type('form').end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(400);
      expect(res.body, 'response body').to.be.a('object');
      expect(res.body, 'response body').to.haveOwnProperty('status');
      expect(res.body.status, 'status property').to.equal(400);
      expect(res.body, 'response body').to.haveOwnProperty('error');
      expect(res.body.error).to.be.a('string');
      done();
    });
  });
});
describe('GET /api/v1/car/<:car-id>', () => {
  describe('When the token is present', () => {
    it('When all parameters are correctly supplied the request is successful', done => {
      _chai.default.request(_server.default).get('/api/v1/car/3').set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0QHRlc3Rlci5jb20iLCJpYXQiOjE1NTg2MDIxMDgsImV4cCI6MTU5MDEzODEwOH0.SgG1OgwgrjF76K9U6edowCEpS5HFJP2hy_06DvwV3jg').end((err, res) => {
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
    it('The request shoud not be successful if the car_id provided doesnt exist or is invalid', done => {
      _chai.default.request(_server.default).get('/api/v1/car/ttyr').set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0QHRlc3Rlci5jb20iLCJpYXQiOjE1NTg2MDIxMDgsImV4cCI6MTU5MDEzODEwOH0.SgG1OgwgrjF76K9U6edowCEpS5HFJP2hy_06DvwV3jg').send({}).end((err, res) => {
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
  });
  describe('When the token is missing', done => {
    it('The request shouldnt go through if the token in the cookie is missing', done => {
      // Jwt missing in cookie
      _chai.default.request(_server.default).get('/api/v1/car/1').end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.body, 'response body').to.be.a('object');
        expect(res.body, 'response body').to.haveOwnProperty('status');
        expect(res.body.status, 'status property').to.equal(400);
        expect(res.body, 'response body').to.haveOwnProperty('error');
        expect(res.body.error).to.be.a('string');
        done();
      });
    });
  });
});
describe('GET /api/v1/car?status=available and GET /api/v1/car?status=available&min_price=xx&max_price=xx ', () => {
  describe('When the token is present', () => {
    it('(status only) When all parameters are correctly supplied the request is successful', done => {
      _chai.default.request(_server.default).get('/api/v1/car?status=available').set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0QHRlc3Rlci5jb20iLCJpYXQiOjE1NTg2MDIxMDgsImV4cCI6MTU5MDEzODEwOH0.SgG1OgwgrjF76K9U6edowCEpS5HFJP2hy_06DvwV3jg').end((err, res) => {
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
    it('(status, min & max price) When all parameters are correctly supplied the request is successful', done => {
      _chai.default.request(_server.default).get('/api/v1/car?status=available&min_price=800000&max_price=5000000').set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0QHRlc3Rlci5jb20iLCJpYXQiOjE1NTg2MDIxMDgsImV4cCI6MTU5MDEzODEwOH0.SgG1OgwgrjF76K9U6edowCEpS5HFJP2hy_06DvwV3jg').end((err, res) => {
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
    it('The request shoud not be successful if the value of the status parameter isnt "available" or "sold"', done => {
      _chai.default.request(_server.default).get('/api/v1/car?status=whatevs').set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0QHRlc3Rlci5jb20iLCJpYXQiOjE1NTg2MDIxMDgsImV4cCI6MTU5MDEzODEwOH0.SgG1OgwgrjF76K9U6edowCEpS5HFJP2hy_06DvwV3jg').send({}).end((err, res) => {
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
    it('The request shoud not be successful if the values if the min&max price query attributes are not numbers', done => {
      _chai.default.request(_server.default).get('/api/v1/car?status=available&min_price=a&max_price=5000000').set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0QHRlc3Rlci5jb20iLCJpYXQiOjE1NTg2MDIxMDgsImV4cCI6MTU5MDEzODEwOH0.SgG1OgwgrjF76K9U6edowCEpS5HFJP2hy_06DvwV3jg').send({}).end((err, res) => {
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
  });
  describe('When the token is missing', done => {
    it('The request shouldnt go through if the token in the cookie is missing', done => {
      // Jwt missing in cookie
      _chai.default.request(_server.default).get('/api/v1/car?status=available').end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.body, 'response body').to.be.a('object');
        expect(res.body, 'response body').to.haveOwnProperty('status');
        expect(res.body.status, 'status property').to.equal(400);
        expect(res.body, 'response body').to.haveOwnProperty('error');
        expect(res.body.error).to.be.a('string');
        done();
      });
    });
  });
});
describe('DELETE /api/v1/car/<:car-id>', () => {
  describe('When the token(Admin) is present', () => {
    it('When all parameters are correctly supplied the request is successful', done => {
      _chai.default.request(_server.default).delete('/api/v1/car/3').set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJraWxsYmlsbEB0ZXN0LmNvbSIsImlhdCI6MTU1OTEzMDQ3MSwiZXhwIjoxNTkwNjY2NDcxfQ.DKnHchuP_MjSVxXRHKJWHRHnK-BI882X_OC5b6JSiT4').end((err, res) => {
        expect(err).to.be.null;
        expect(res, 'response object status').to.have.status(200);
        expect(res.body, 'response body').to.be.a('object');
        expect(res.body, 'response body').to.haveOwnProperty('status');
        expect(res.body.status, 'status property').to.equal(200);
        expect(res.body, 'response body').to.haveOwnProperty('data');
        expect(res.body.data, 'data property').to.be.a('string');
        done();
      });
    });
    after(done => {
      const query = 'INSERT INTO cars(id, owner, created_on, state, status, price, manufacturer, model, body_type, image_url) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
      const values = [3, 2, '2019-06-03 17:12:15 +0000', 'new', 'sold', 900000, 'Toyota', 'Avalon', 'car', null];

      _index.default.query(query, values).then(() => {
        done();
      });
    });
    it('The request shoud not be successful if the car_id provided doesnt exist or is invalid', done => {
      _chai.default.request(_server.default).delete('/api/v1/car/ttyr').set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJraWxsYmlsbEB0ZXN0LmNvbSIsImlhdCI6MTU1OTEzMDQ3MSwiZXhwIjoxNTkwNjY2NDcxfQ.DKnHchuP_MjSVxXRHKJWHRHnK-BI882X_OC5b6JSiT4').end((err, res) => {
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
  });
  describe('When there are issues with the token', done => {
    it('The request shouldnt go through if the id encoded in the token does not have Admin privileges', done => {
      // Jwt missing in cookie
      _chai.default.request(_server.default).delete('/api/v1/car/1').set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0QHRlc3Rlci5jb20iLCJpYXQiOjE1NTg2MDIxMDgsImV4cCI6MTU5MDEzODEwOH0.SgG1OgwgrjF76K9U6edowCEpS5HFJP2hy_06DvwV3jg').end((err, res) => {
        res.body.error;
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.body, 'response body').to.be.a('object');
        expect(res.body, 'response body').to.haveOwnProperty('status');
        expect(res.body.status, 'status property').to.equal(400);
        expect(res.body, 'response body').to.haveOwnProperty('error');
        expect(res.body.error).to.be.a('string');
        done();
      });
    });
    it('The request shouldnt go through if the token in the cookie is missing', done => {
      // Jwt missing in cookie
      _chai.default.request(_server.default).delete('/api/v1/car/1').end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.body, 'response body').to.be.a('object');
        expect(res.body, 'response body').to.haveOwnProperty('status');
        expect(res.body.status, 'status property').to.equal(400);
        expect(res.body, 'response body').to.haveOwnProperty('error');
        expect(res.body.error).to.be.a('string');
        done();
      });
    });
  });
});
describe('GET /api/v1/car', () => {
  describe('When the token(Admin) is present', () => {
    it('When all parameters are correctly supplied the request is successful', done => {
      _chai.default.request(_server.default).get('/api/v1/car').set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJraWxsYmlsbEB0ZXN0LmNvbSIsImlhdCI6MTU1OTE0NDIyMiwiZXhwIjoxNTkwNjgwMjIyfQ.Ck2c3jUUCQez0Lp4WFf1iLDkkTUSuHhtIcgTQ7vMwsA').end((err, res) => {
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
  describe('When there are issues with the token', done => {
    it('The request shouldnt go through if the id encoded in the token does not have Admin privileges', done => {
      // Jwt missing in cookie
      _chai.default.request(_server.default).get('/api/v1/car').set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0QHRlc3Rlci5jb20iLCJpYXQiOjE1NTg2MDIxMDgsImV4cCI6MTU5MDEzODEwOH0.SgG1OgwgrjF76K9U6edowCEpS5HFJP2hy_06DvwV3jg').end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.body, 'response body').to.be.a('object');
        expect(res.body, 'response body').to.haveOwnProperty('status');
        expect(res.body.status, 'status property').to.equal(400);
        expect(res.body, 'response body').to.haveOwnProperty('error');
        expect(res.body.error).to.be.a('string');
        done();
      });
    });
    it('The request shouldnt go through if the token in the cookie is missing', done => {
      // Jwt missing in cookie
      _chai.default.request(_server.default).get('/api/v1/car').end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.body, 'response body').to.be.a('object');
        expect(res.body, 'response body').to.haveOwnProperty('status');
        expect(res.body.status, 'status property').to.equal(400);
        expect(res.body, 'response body').to.haveOwnProperty('error');
        expect(res.body.error).to.be.a('string');
        done();
      });
    });
  });
});
describe('GET /api/v1/car/myCar', () => {
  describe('When the token is present', () => {
    it('When all parameters are correctly supplied the request is successful', done => {
      _chai.default.request(_server.default).get('/api/v1/car/myCar').set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJraWxsYmlsbEB0ZXN0LmNvbSIsImlhdCI6MTU1OTE0NDIyMiwiZXhwIjoxNTkwNjgwMjIyfQ.Ck2c3jUUCQez0Lp4WFf1iLDkkTUSuHhtIcgTQ7vMwsA').end((err, res) => {
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
  describe('When there are issues with the token', done => {
    it('The request shouldnt go through if the token in the cookie is missing', done => {
      // Jwt missing in cookie
      _chai.default.request(_server.default).get('/api/v1/car/myCar').end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.body, 'response body').to.be.a('object');
        expect(res.body, 'response body').to.haveOwnProperty('status');
        expect(res.body.status, 'status property').to.equal(400);
        expect(res.body, 'response body').to.haveOwnProperty('error');
        expect(res.body.error).to.be.a('string');
        done();
      });
    });
  });
});