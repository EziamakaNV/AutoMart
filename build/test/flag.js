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

describe('POST /api/v2/flag', () => {
  describe('A request with a valid token in the cookie (Client logged in)', () => {
    let flagId;
    it('The request should be successful when all parameters are supplied correctly', done => {
      _chai.default.request(_server.default).post('/api/v2/flag').type('json').set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJqcEBob2d3YXJ0cy5jb20iLCJpYXQiOjE1NTg2MDQzNTEsImV4cCI6MTU5MDE0MDM1MX0.JAM_xR0UEPbdAF5LJC7CwO7nMECAlWJ_nhsXZX-pzWU').send({
        carId: 1,
        reason: 'fraud',
        description: 'The ad is fake'
      }).end((err, res) => {
        flagId = res.body.data.id;
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
    after(done => {
      _index.default.query('DELETE FROM flags WHERE id = $1', [flagId]).then(() => {
        done();
      });
    });
    it('The request shoud not be successful if any of the parameters are missing from the request body', done => {
      _chai.default.request(_server.default).post('/api/v2/flag').set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTU4NDMwNzUwLCJleHAiOjE1ODk5NjY3NTB9.AKuYgp8_C5AdMAmm5EGe1_y_rCl9jctdl4m1yskK-uc').send({
        carId: 1,
        reason: 'fraud'
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
  it('The request shouldnt go through if the token in the cookie is missing', done => {
    // Jwt missing in cookie
    _chai.default.request(_server.default).post('/api/v2/flag').end((err, res) => {
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