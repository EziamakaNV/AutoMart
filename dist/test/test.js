"use strict";

var _mocha = _interopRequireDefault(require("mocha"));

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-extraneous-dependencies */

/* eslint-disable linebreak-style */
const expect = _chai.default.expect;

_chai.default.use(_chaiHttp.default);

describe('POST /api/v1/auth/signup', () => {
  describe('When all values in the POST body are the right format', () => {
    it('Should return an object with properties "status" and "data" on success', done => {
      _chai.default.request(_server.default).post('/api/v1/auth/signup').type('form').send({
        firstName: 'James',
        lastName: 'Potter',
        email: 'JamesP@hogwarts.com',
        password: 'expeliamus',
        address: 'lower bunk, room 23, Gryfindor House, Hogwarts'
      }).end((err, res) => {
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
    it('Should return an error if the email already exists', done => {
      _chai.default.request(_server.default).post('/api/v1/auth/signup').type('form').send({
        firstName: 'James',
        lastName: 'Potter',
        email: 'john@test.com',
        password: 'expeliamus',
        address: 'lower bunk, room 23, Gryfindor House, Hogwarts'
      }).end((err, res) => {
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
    it('Should return an error if the length of any of the paremeters is less than 3', done => {
      // Mocha done callback for asynchronous tests
      _chai.default.request(_server.default).post('/api/v1/auth/signup').type('form').send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'Me@test.com',
        password: 'secret',
        address: 'nowhere'
      }).end((err, res) => {
        // eslint-disable-next-line no-unused-expressions
        expect(err).to.be.null;
        expect(res).to.have.status(400); // eslint-disable-next-line no-unused-expressions

        expect(res.body).to.be.a('object');
        expect(res.body).to.haveOwnProperty('status');
        expect(res.body.status).to.equal(400);
        expect(res.body).to.haveOwnProperty('error');
        expect(res.body.error).to.be.a('string');
        done();
      });
    });
    describe('When the POST body parameters are not in the right format', () => {
      it('should not be able to post if all the parameters are not present', done => {
        _chai.default.request(_server.default).post('/api/v1/auth/signup').type('form').send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'for@loop.com'
        }).end((err, res) => {
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
describe('POST /api/v1/auth/signin', () => {
  describe('When all the data povided is in the ight format', () => {
    it('if the user has an account, it should respond with a property status of 200 and a data property with a token', done => {
      _chai.default.request(_server.default).post('/api/v1/auth/signin').type('form').send({
        email: 'test@tester.com',
        password: '123abc'
      }).end((err, res) => {
        // eslint-disable-next-line no-unused-expressions
        expect(err).to.be.null;
        expect(res, 'response object status').to.have.status(200);
        expect(res.body, 'response body').to.be.a('object');
        expect(res.body, 'response body').to.haveOwnProperty('status');
        expect(res.body.status, 'status property').to.equal(200);
        expect(res.body, 'response body').to.haveOwnProperty('data');
        expect(res.body.data, 'data property').to.be.a('object');
        expect(res.body.data, 'data object').to.haveOwnProperty('token');
        done();
      });
    });
    it('should respond with 401 status and error properties if invalid credentials are submitted', done => {
      _chai.default.request(_server.default).post('/api/v1/auth/signin').type('form').send({
        email: 'example@test.com',
        password: 'nothing'
      }).end((err, res) => {
        // eslint-disable-next-line no-unused-expressions
        expect(err).to.be.null;
        expect(res, 'response object status').to.have.status(401);
        expect(res.body, 'response body').to.be.a('object');
        expect(res.body, 'response body').to.haveOwnProperty('status');
        expect(res.body.status, 'status property').to.equal(401);
        expect(res.body, 'response body').to.haveOwnProperty('error');
        expect(res.body.error, 'error property').to.be.a('string');
        done();
      });
    });
  });
  describe('handles invalid input ((POST body properties))', () => {
    it('should not be able to log in if all parameters are not present', done => {
      _chai.default.request(_server.default).post('/api/v1/auth/signin').type('form').send({
        email: 'TDD@epicmail.com'
      }).end((err, res) => {
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