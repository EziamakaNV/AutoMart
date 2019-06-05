/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable linebreak-style */
import mocha from 'mocha';

import chai from 'chai';

import chaiHttp from 'chai-http';

import server from '../server';

import db from '../models/usingDb/Db/index';

const { expect } = chai;

chai.use(chaiHttp);

// describe('POST /api/v1/auth/signup', () => {
//   describe('When all values in the POST body are the right format', () => {
//     it('Should return an object with properties "status" and "data" on success', (done) => {
//       chai.request(server)
//         .post('/api/v1/auth/signup')
//         .type('form')
//         .send({
//           firstName: 'James',
//           lastName: 'Potter',
//           email: 'JamesP@hogwarts.com',
//           password: 'expeliamus',
//           address: 'lower bunk, room 23, Gryfindor House, Hogwarts',
//         })
//         .end((err, res) => {
//           // eslint-disable-next-line no-unused-expressions
//           expect(err).to.be.null;
//           expect(res).to.has.status(200);
//           expect(res.body).to.be.a('object');
//           expect(res.body).to.haveOwnProperty('status');
//           expect(res.body.status).to.equal(200);
//           expect(res.body).to.haveOwnProperty('data');
//           expect(res.body.data).to.be.a('object');
//           done();
//         });
//     });

//     it('Should return an error if the email already exists', (done) => {
//       chai.request(server)
//         .post('/api/v1/auth/signup')
//         .type('form')
//         .send({
//           firstName: 'James',
//           lastName: 'Potter',
//           email: 'john@test.com',
//           password: 'expeliamus',
//           address: 'lower bunk, room 23, Gryfindor House, Hogwarts',
//         })
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res).to.has.status(400);
//           expect(res.body).to.be.a('object');
//           expect(res.body).to.haveOwnProperty('status');
//           expect(res.body.status).to.equal(400);
//           expect(res.body).to.haveOwnProperty('error');
//           expect(res.body.error).to.be.a('string');
//           done();
//         });
//     });

//     it('Should return an error if the length of any of the paremeters is less than 3', (done) => { // Mocha done callback for asynchronous tests
//       chai.request(server)
//         .post('/api/v1/auth/signup')
//         .type('form')
//         .send({
//           firstName: 'John',
//           lastName: 'Doe',
//           email: 'Me@test.com',
//           password: 'secret',
//           address: 'nowhere',
//         })
//         .end((err, res) => {
//           // eslint-disable-next-line no-unused-expressions
//           expect(err).to.be.null;
//           expect(res).to.have.status(400);
//           // eslint-disable-next-line no-unused-expressions
//           expect(res.body).to.be.a('object');
//           expect(res.body).to.haveOwnProperty('status');
//           expect(res.body.status).to.equal(400);
//           expect(res.body).to.haveOwnProperty('error');
//           expect(res.body.error).to.be.a('string');
//           done();
//         });
//     });

//     describe('When the POST body parameters are not in the right format', () => {
//       it('should not be able to post if all the parameters are not present', (done) => {
//         chai.request(server)
//           .post('/api/v1/auth/signup')
//           .type('form')
//           .send({
//             firstName: 'John',
//             lastName: 'Doe',
//             email: 'for@loop.com',
//           })
//           .end((err, res) => {
//             // eslint-disable-next-line no-unused-expressions
//             expect(err).to.be.null;
//             expect(res).to.have.status(400);
//             expect(res.body).to.be.a('object');
//             expect(res.body).to.haveOwnProperty('status');
//             expect(res.body.status).to.equal(400);
//             expect(res.body).to.haveOwnProperty('error');
//             expect(res.body.error).to.be.a('string');
//             done();
//           });
//       });
//     });
//   });
// });

// describe('POST /api/v1/auth/signin', () => {
//   describe('When all the data povided is in the ight format', () => {
//     it('if the user has an account, it should respond with a property status of 200 and a data property with a token', (done) => {
//       chai.request(server)
//         .post('/api/v1/auth/signin')
//         .type('form')
//         .send({
//           email: 'test@tester.com',
//           password: '123abc',
//         })
//         .end((err, res) => {
//           // eslint-disable-next-line no-unused-expressions
//           expect(err).to.be.null;
//           expect(res, 'response object status').to.have.status(200);
//           expect(res.body, 'response body').to.be.a('object');
//           expect(res.body, 'response body').to.haveOwnProperty('status');
//           expect(res.body.status, 'status property').to.equal(200);
//           expect(res.body, 'response body').to.haveOwnProperty('data');
//           expect(res.body.data, 'data property').to.be.a('object');
//           expect(res.body.data, 'data object').to.haveOwnProperty('token');
//           done();
//         });
//     });

//     it('should respond with 401 status and error properties if invalid credentials are submitted', (done) => {
//       chai.request(server)
//         .post('/api/v1/auth/signin')
//         .type('form')
//         .send({
//           email: 'example@test.com',
//           password: 'nothing',
//         })
//         .end((err, res) => {
//           // eslint-disable-next-line no-unused-expressions
//           expect(err).to.be.null;
//           expect(res, 'response object status').to.have.status(401);
//           expect(res.body, 'response body').to.be.a('object');
//           expect(res.body, 'response body').to.haveOwnProperty('status');
//           expect(res.body.status, 'status property').to.equal(401);
//           expect(res.body, 'response body').to.haveOwnProperty('error');
//           expect(res.body.error, 'error property').to.be.a('string');
//           done();
//         });
//     });
//   });

//   describe('handles invalid input ((POST body properties))', () => {
//     it('should not be able to log in if all parameters are not present', (done) => {
//       chai.request(server)
//         .post('/api/v1/auth/signin')
//         .type('form')
//         .send({
//           email: 'TDD@epicmail.com',
//         })
//         .end((err, res) => {
//           // eslint-disable-next-line no-unused-expressions
//           expect(err).to.be.null;
//           expect(res).to.have.status(400);
//           expect(res.body).to.be.a('object');
//           expect(res.body).to.haveOwnProperty('status');
//           expect(res.body.status).to.equal(400);
//           expect(res.body).to.haveOwnProperty('error');
//           expect(res.body.error).to.be.a('string');
//           done();
//         });
//     });
//   });
// });

// describe('POST /api/v1/car/', () => {
//   it('The request shouldnt go through if the token in the cookie is missing', (done) => {
//     // Jwt missing in cookie
//     chai.request(server)
//       .post('/api/v1/car')
//       .end((err, res) => {
//         expect(err).to.be.null;
//         expect(res).to.have.status(401);
//         expect(res.body, 'response body').to.be.a('object');
//         expect(res.body, 'response body').to.haveOwnProperty('status');
//         expect(res.body.status, 'status property').to.equal(401);
//         expect(res.body, 'response body').to.haveOwnProperty('error');
//         expect(res.body.error).to.be.a('string');
//         done();
//       });
//   });
//   describe('A request with a valid token in the cookie (Client logged in)', () => {
//     it('The request should be successful when all parameters are supplied correctly', (done) => {
//       chai.request(server)
//         .post('/api/v1/car')
//         .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTU4NDMwNzUwLCJleHAiOjE1ODk5NjY3NTB9.AKuYgp8_C5AdMAmm5EGe1_y_rCl9jctdl4m1yskK-uc')
//         .send({
//           state: 'new',
//           status: 'available',
//           price: '2000000',
//           manufacturer: 'Toyota',
//           model: 'Camry',
//           bodyType: 'car',
//         })
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res, 'response object status').to.have.status(201);
//           expect(res.body, 'response body').to.be.a('object');
//           expect(res.body, 'response body').to.haveOwnProperty('status');
//           expect(res.body.status, 'status property').to.equal(201);
//           expect(res.body, 'response body').to.haveOwnProperty('data');
//           expect(res.body.data, 'data property').to.be.a('object');
//           done();
//         });
//     });

//     it('The request shoud not be successful if any of the parameters are missing from the request body', (done) => {
//       chai.request(server)
//         .post('/api/v1/car')
//         .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTU4NDMwNzUwLCJleHAiOjE1ODk5NjY3NTB9.AKuYgp8_C5AdMAmm5EGe1_y_rCl9jctdl4m1yskK-uc')
//         .send({
//           state: 'new',
//           status: 'available',
//           manufacturer: 'Toyota',
//           model: 'Camry',
//           type: 'car',
//         })
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res, 'response object status').to.have.status(400);
//           expect(res.body, 'response body').to.be.a('object');
//           expect(res.body, 'response body').to.haveOwnProperty('status');
//           expect(res.body.status, 'status property').to.equal(400);
//           expect(res.body, 'response body').to.haveOwnProperty('error');
//           expect(res.body.error, 'data property').to.be.a('string');
//           done();
//         });
//     });
//   });
// });

// describe('POST /api/v1/order', () => {
//   describe('A request with a valid token in the cookie (Client logged in)', () => {
//     it('The request should be successful when all parameters are supplied correctly', (done) => {
//       chai.request(server)
//         .post('/api/v1/order')
//         .type('json')
//         .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJqcEBob2d3YXJ0cy5jb20iLCJpYXQiOjE1NTg2MDQzNTEsImV4cCI6MTU5MDE0MDM1MX0.JAM_xR0UEPbdAF5LJC7CwO7nMECAlWJ_nhsXZX-pzWU')
//         .send({
//           carId: 1,
//           amount: 500000,
//         })
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res, 'response object status').to.have.status(201);
//           expect(res.body, 'response body').to.be.a('object');
//           expect(res.body, 'response body').to.haveOwnProperty('status');
//           expect(res.body.status, 'status property').to.equal(201);
//           expect(res.body, 'response body').to.haveOwnProperty('data');
//           expect(res.body.data, 'data property').to.be.a('object');
//           done();
//         });
//     });

//     it('The request shoud not be successful if any of the parameters are missing from the request body', (done) => {
//       chai.request(server)
//         .post('/api/v1/order')
//         .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTU4NDMwNzUwLCJleHAiOjE1ODk5NjY3NTB9.AKuYgp8_C5AdMAmm5EGe1_y_rCl9jctdl4m1yskK-uc')
//         .send({
//           carId: 1,
//         })
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res, 'response object status').to.have.status(400);
//           expect(res.body, 'response body').to.be.a('object');
//           expect(res.body, 'response body').to.haveOwnProperty('status');
//           expect(res.body.status, 'status property').to.equal(400);
//           expect(res.body, 'response body').to.haveOwnProperty('error');
//           expect(res.body.error, 'data property').to.be.a('string');
//           done();
//         });
//     });
//   });

//   it('The request shouldnt go through if the token in the cookie is missing', (done) => {
//     // Jwt missing in cookie
//     chai.request(server)
//       .post('/api/v1/order')
//       .end((err, res) => {
//         expect(err).to.be.null;
//         expect(res).to.have.status(401);
//         expect(res.body, 'response body').to.be.a('object');
//         expect(res.body, 'response body').to.haveOwnProperty('status');
//         expect(res.body.status, 'status property').to.equal(401);
//         expect(res.body, 'response body').to.haveOwnProperty('error');
//         expect(res.body.error).to.be.a('string');
//         done();
//       });
//   });
// });

// describe('PATCH /api/v1/order/<:order-id>/price', () => {
//   describe('A request with a valid token in the cookie (Client logged in)', () => {
//     it('The request should be successful when all parameters are supplied correctly', (done) => {
//       chai.request(server)
//         .patch('/api/v1/order/1/price')
//         .type('form')
//         .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0QHRlc3Rlci5jb20iLCJpYXQiOjE1NTg2MDIxMDgsImV4cCI6MTU5MDEzODEwOH0.SgG1OgwgrjF76K9U6edowCEpS5HFJP2hy_06DvwV3jg')
//         .send({
//           amount: 500000,
//         })
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res, 'response object status').to.have.status(200);
//           expect(res.body, 'response body').to.be.a('object');
//           expect(res.body, 'response body').to.haveOwnProperty('status');
//           expect(res.body.status, 'status property').to.equal(200);
//           expect(res.body, 'response body').to.haveOwnProperty('data');
//           expect(res.body.data, 'data property').to.be.a('object');
//           done();
//         });
//     });

//     it('Only the person who created the order should be able to update it', (done) => {
//       // First make the API request to create an order with user two
//       let orderId;
//       chai.request(server)
//         .post('/api/v1/order')
//         .type('json')
//         .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0QHRlc3Rlci5jb20iLCJpYXQiOjE1NTg2MDIxMDgsImV4cCI6MTU5MDEzODEwOH0.SgG1OgwgrjF76K9U6edowCEpS5HFJP2hy_06DvwV3jg')
//         .send({
//           carId: 2,
//           amount: 500000,
//         })
//         .end((err, res) => {
//           orderId = res.body.data.id;
//           expect(err).to.be.null;
//           expect(res, 'response object status').to.have.status(201);
//           expect(res.body, 'response body').to.be.a('object');
//           expect(res.body, 'response body').to.haveOwnProperty('status');
//           expect(res.body.status, 'status property').to.equal(201);
//           expect(res.body, 'response body').to.haveOwnProperty('data');
//           expect(res.body.data, 'data property').to.be.a('object');
//           // Make another request with user three(token) to update the same order
//           chai.request(server)
//             .patch(`/api/v1/order/${orderId}/price`)
//             .type('form')
//             .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJqcEBob2d3YXJ0cy5jb20iLCJpYXQiOjE1NTg2MDQzNTEsImV4cCI6MTU5MDE0MDM1MX0.JAM_xR0UEPbdAF5LJC7CwO7nMECAlWJ_nhsXZX-pzWU')
//             .send({
//               amount: 500000,
//             })
//             .end((err, res) => {
//               expect(err).to.be.null;
//               expect(res, 'response object status').to.have.status(401);
//               expect(res.body, 'response body').to.be.a('object');
//               expect(res.body, 'response body').to.haveOwnProperty('status');
//               expect(res.body.status, 'status property').to.equal(401);
//               expect(res.body, 'response body').to.haveOwnProperty('error');
//               expect(res.body.error, 'error property').to.be.a('string');
//               done();
//             });
//         });
//     });

//     it('The request shoud not be successful if any of the parameters are missing from the request body', (done) => {
//       chai.request(server)
//         .patch('/api/v1/order/1/price')
//         .type('form')
//         .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTU4NDMwNzUwLCJleHAiOjE1ODk5NjY3NTB9.AKuYgp8_C5AdMAmm5EGe1_y_rCl9jctdl4m1yskK-uc')
//         .send({
//         })
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res, 'response object status').to.have.status(400);
//           expect(res.body, 'response body').to.be.a('object');
//           expect(res.body, 'response body').to.haveOwnProperty('status');
//           expect(res.body.status, 'status property').to.equal(400);
//           expect(res.body, 'response body').to.haveOwnProperty('error');
//           expect(res.body.error, 'data property').to.be.a('string');
//           done();
//         });
//     });
//   });

//   it('The request shoud not be successful if the orderid doesnt exist or is invalid', (done) => {
//     chai.request(server)
//       .patch('/api/v1/order/ttyr/price')
//       .type('form')
//       .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0QHRlc3Rlci5jb20iLCJpYXQiOjE1NTg2MDIxMDgsImV4cCI6MTU5MDEzODEwOH0.SgG1OgwgrjF76K9U6edowCEpS5HFJP2hy_06DvwV3jg')
//       .send({
//       })
//       .end((err, res) => {
//         expect(err).to.be.null;
//         expect(res, 'response object status').to.have.status(400);
//         expect(res.body, 'response body').to.be.a('object');
//         expect(res.body, 'response body').to.haveOwnProperty('status');
//         expect(res.body.status, 'status property').to.equal(400);
//         expect(res.body, 'response body').to.haveOwnProperty('error');
//         expect(res.body.error, 'error property').to.be.a('string');
//         done();
//       });
//   });

//   it('The request shouldnt go through if the token in the cookie is missing', (done) => {
//     // Jwt missing in cookie
//     chai.request(server)
//       .patch('/api/v1/order/1/price')
//       .type('form')
//       .end((err, res) => {
//         expect(err).to.be.null;
//         expect(res).to.have.status(401);
//         expect(res.body, 'response body').to.be.a('object');
//         expect(res.body, 'response body').to.haveOwnProperty('status');
//         expect(res.body.status, 'status property').to.equal(401);
//         expect(res.body, 'response body').to.haveOwnProperty('error');
//         expect(res.body.error).to.be.a('string');
//         done();
//       });
//   });
// });

// describe('PATCH /api/v1/car/<:car-id>/status', () => {
//   describe('When the token is present', () => {
//     it('When all parameters are correctly supplied the request is successful', (done) => {
//       chai.request(server)
//         .patch('/api/v1/car/3/status')
//         .type('json')
//         .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0QHRlc3Rlci5jb20iLCJpYXQiOjE1NTg2MDIxMDgsImV4cCI6MTU5MDEzODEwOH0.SgG1OgwgrjF76K9U6edowCEpS5HFJP2hy_06DvwV3jg')
//         .send({
//           status: 'sold',
//         })
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res, 'response object status').to.have.status(200);
//           expect(res.body, 'response body').to.be.a('object');
//           expect(res.body, 'response body').to.haveOwnProperty('status');
//           expect(res.body.status, 'status property').to.equal(200);
//           expect(res.body, 'response body').to.haveOwnProperty('data');
//           expect(res.body.data, 'data property').to.be.a('object');
//           done();
//         });
//     });

//     it('Only the owner of the ad can update status of the car ad', (done) => {
//       // Create a car ad with user two token
//       let carId;
//       chai.request(server)
//         .post('/api/v1/car')
//         .type('json')
//         .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0QHRlc3Rlci5jb20iLCJpYXQiOjE1NTg2MDIxMDgsImV4cCI6MTU5MDEzODEwOH0.SgG1OgwgrjF76K9U6edowCEpS5HFJP2hy_06DvwV3jg')
//         .send({
//           state: 'new',
//           status: 'available',
//           price: '2000000',
//           manufacturer: 'Toyota',
//           model: 'Camry',
//           bodyType: 'car',
//         })
//         .end((err, res) => {
//           carId = res.body.data.id;
//           expect(err).to.be.null;
//           expect(res, 'response object status').to.have.status(201);
//           expect(res.body, 'response body').to.be.a('object');
//           expect(res.body, 'response body').to.haveOwnProperty('status');
//           expect(res.body.status, 'status property').to.equal(201);
//           expect(res.body, 'response body').to.haveOwnProperty('data');
//           expect(res.body.data, 'data property').to.be.a('object');
//           // Update the status with user three token
//           chai.request(server)
//             .patch(`/api/v1/car/${carId}/status`)
//             .type('json')
//             .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJqcEBob2d3YXJ0cy5jb20iLCJpYXQiOjE1NTg2MDQzNTEsImV4cCI6MTU5MDE0MDM1MX0.JAM_xR0UEPbdAF5LJC7CwO7nMECAlWJ_nhsXZX-pzWU')
//             .send({
//               status: 'sold',
//             })
//             .end((err, res) => {
//               expect(err).to.be.null;
//               expect(res, 'response object status').to.have.status(401);
//               expect(res.body, 'response body').to.be.a('object');
//               expect(res.body, 'response body').to.haveOwnProperty('status');
//               expect(res.body.status, 'status property').to.equal(401);
//               expect(res.body, 'response body').to.haveOwnProperty('error');
//               expect(res.body.error, 'data property').to.be.a('string');
//               done();
//             });
//         });
//     });

//     it('The request shoud not be successful if any of the parameters are missing from the request body', (done) => {
//       chai.request(server)
//         .patch('/api/v1/car/3/status')
//         .type('json')
//         .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0QHRlc3Rlci5jb20iLCJpYXQiOjE1NTg2MDIxMDgsImV4cCI6MTU5MDEzODEwOH0.SgG1OgwgrjF76K9U6edowCEpS5HFJP2hy_06DvwV3jg')
//         .send({
//         })
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res, 'response object status').to.have.status(400);
//           expect(res.body, 'response body').to.be.a('object');
//           expect(res.body, 'response body').to.haveOwnProperty('status');
//           expect(res.body.status, 'status property').to.equal(400);
//           expect(res.body, 'response body').to.haveOwnProperty('error');
//           expect(res.body.error, 'data property').to.be.a('string');
//           done();
//         });
//     });

//     it('The request shoud not be successful if the carid doesnt exist or is invalid', (done) => {
//       chai.request(server)
//         .patch('/api/v1/car/ttyr/status')
//         .type('form')
//         .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0QHRlc3Rlci5jb20iLCJpYXQiOjE1NTg2MDIxMDgsImV4cCI6MTU5MDEzODEwOH0.SgG1OgwgrjF76K9U6edowCEpS5HFJP2hy_06DvwV3jg')
//         .send({
//         })
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res, 'response object status').to.have.status(400);
//           expect(res.body, 'response body').to.be.a('object');
//           expect(res.body, 'response body').to.haveOwnProperty('status');
//           expect(res.body.status, 'status property').to.equal(400);
//           expect(res.body, 'response body').to.haveOwnProperty('error');
//           expect(res.body.error, 'error property').to.be.a('string');
//           done();
//         });
//     });
//   });

//   it('The request shouldnt go through if the token in the cookie is missing', (done) => {
//     // Jwt missing in cookie
//     chai.request(server)
//       .patch('/api/v1/car/1/status')
//       .type('form')
//       .end((err, res) => {
//         expect(err).to.be.null;
//         expect(res).to.have.status(401);
//         expect(res.body, 'response body').to.be.a('object');
//         expect(res.body, 'response body').to.haveOwnProperty('status');
//         expect(res.body.status, 'status property').to.equal(401);
//         expect(res.body, 'response body').to.haveOwnProperty('error');
//         expect(res.body.error).to.be.a('string');
//         done();
//       });
//   });
// });

// describe('PATCH /api/v1/car/<:car-id>/price', () => {
//   describe('When the token is present', () => {
//     it('When all parameters are correctly supplied the request is successful', (done) => {
//       chai.request(server)
//         .patch('/api/v1/car/3/price')
//         .type('json')
//         .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0QHRlc3Rlci5jb20iLCJpYXQiOjE1NTg2MDIxMDgsImV4cCI6MTU5MDEzODEwOH0.SgG1OgwgrjF76K9U6edowCEpS5HFJP2hy_06DvwV3jg')
//         .send({
//           price: 90000,
//         })
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res, 'response object status').to.have.status(200);
//           expect(res.body, 'response body').to.be.a('object');
//           expect(res.body, 'response body').to.haveOwnProperty('status');
//           expect(res.body.status, 'status property').to.equal(200);
//           expect(res.body, 'response body').to.haveOwnProperty('data');
//           expect(res.body.data, 'data property').to.be.a('object');
//           done();
//         });
//     });

//     it('Only the owner of the ad can update the price of the car ad', (done) => {
//       // Create a car ad with user two token
//       let carId;
//       chai.request(server)
//         .post('/api/v1/car')
//         .type('json')
//         .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0QHRlc3Rlci5jb20iLCJpYXQiOjE1NTg2MDIxMDgsImV4cCI6MTU5MDEzODEwOH0.SgG1OgwgrjF76K9U6edowCEpS5HFJP2hy_06DvwV3jg')
//         .send({
//           state: 'new',
//           status: 'available',
//           price: '2000000',
//           manufacturer: 'Toyota',
//           model: 'Camry',
//           bodyType: 'car',
//         })
//         .end((err, res) => {
//           carId = res.body.data.id;
//           expect(err).to.be.null;
//           expect(res, 'response object status').to.have.status(201);
//           expect(res.body, 'response body').to.be.a('object');
//           expect(res.body, 'response body').to.haveOwnProperty('status');
//           expect(res.body.status, 'status property').to.equal(201);
//           expect(res.body, 'response body').to.haveOwnProperty('data');
//           expect(res.body.data, 'data property').to.be.a('object');
//           // Update the price with user three token
//           chai.request(server)
//             .patch(`/api/v1/car/${carId}/price`)
//             .type('json')
//             .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJqcEBob2d3YXJ0cy5jb20iLCJpYXQiOjE1NTg2MDQzNTEsImV4cCI6MTU5MDE0MDM1MX0.JAM_xR0UEPbdAF5LJC7CwO7nMECAlWJ_nhsXZX-pzWU')
//             .send({
//               price: 983829,
//             })
//             .end((err, res) => {
//               expect(err).to.be.null;
//               expect(res, 'response object status').to.have.status(401);
//               expect(res.body, 'response body').to.be.a('object');
//               expect(res.body, 'response body').to.haveOwnProperty('status');
//               expect(res.body.status, 'status property').to.equal(401);
//               expect(res.body, 'response body').to.haveOwnProperty('error');
//               expect(res.body.error, 'data property').to.be.a('string');
//               done();
//             });
//         });
//     });

//     it('The request shoud not be successful if any of the parameters are missing from the request body', (done) => {
//       chai.request(server)
//         .patch('/api/v1/car/3/price')
//         .type('json')
//         .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0QHRlc3Rlci5jb20iLCJpYXQiOjE1NTg2MDIxMDgsImV4cCI6MTU5MDEzODEwOH0.SgG1OgwgrjF76K9U6edowCEpS5HFJP2hy_06DvwV3jg')
//         .send({
//         })
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res, 'response object status').to.have.status(400);
//           expect(res.body, 'response body').to.be.a('object');
//           expect(res.body, 'response body').to.haveOwnProperty('status');
//           expect(res.body.status, 'status property').to.equal(400);
//           expect(res.body, 'response body').to.haveOwnProperty('error');
//           expect(res.body.error, 'data property').to.be.a('string');
//           done();
//         });
//     });

//     it('The request shoud not be successful if the carid doesnt exist or is invalid', (done) => {
//       chai.request(server)
//         .patch('/api/v1/car/ttyr/price')
//         .type('form')
//         .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0QHRlc3Rlci5jb20iLCJpYXQiOjE1NTg2MDIxMDgsImV4cCI6MTU5MDEzODEwOH0.SgG1OgwgrjF76K9U6edowCEpS5HFJP2hy_06DvwV3jg')
//         .send({
//         })
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res, 'response object status').to.have.status(400);
//           expect(res.body, 'response body').to.be.a('object');
//           expect(res.body, 'response body').to.haveOwnProperty('status');
//           expect(res.body.status, 'status property').to.equal(400);
//           expect(res.body, 'response body').to.haveOwnProperty('error');
//           expect(res.body.error, 'error property').to.be.a('string');
//           done();
//         });
//     });
//   });

//   it('The request shouldnt go through if the token in the cookie is missing', (done) => {
//     // Jwt missing in cookie
//     chai.request(server)
//       .patch('/api/v1/car/1/price')
//       .type('form')
//       .end((err, res) => {
//         expect(err).to.be.null;
//         expect(res).to.have.status(401);
//         expect(res.body, 'response body').to.be.a('object');
//         expect(res.body, 'response body').to.haveOwnProperty('status');
//         expect(res.body.status, 'status property').to.equal(401);
//         expect(res.body, 'response body').to.haveOwnProperty('error');
//         expect(res.body.error).to.be.a('string');
//         done();
//       });
//   });
// });

// describe('GET /api/v1/car/<:car-id>', () => {
//   describe('When the token is present', () => {
//     it('When all parameters are correctly supplied the request is successful', (done) => {
//       chai.request(server)
//         .get('/api/v1/car/3')
//         .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0QHRlc3Rlci5jb20iLCJpYXQiOjE1NTg2MDIxMDgsImV4cCI6MTU5MDEzODEwOH0.SgG1OgwgrjF76K9U6edowCEpS5HFJP2hy_06DvwV3jg')
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res, 'response object status').to.have.status(200);
//           expect(res.body, 'response body').to.be.a('object');
//           expect(res.body, 'response body').to.haveOwnProperty('status');
//           expect(res.body.status, 'status property').to.equal(200);
//           expect(res.body, 'response body').to.haveOwnProperty('data');
//           expect(res.body.data, 'data property').to.be.a('object');
//           done();
//         });
//     });

//     it('The request shoud not be successful if the carid provided doesnt exist or is invalid', (done) => {
//       chai.request(server)
//         .get('/api/v1/car/ttyr')
//         .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0QHRlc3Rlci5jb20iLCJpYXQiOjE1NTg2MDIxMDgsImV4cCI6MTU5MDEzODEwOH0.SgG1OgwgrjF76K9U6edowCEpS5HFJP2hy_06DvwV3jg')
//         .send({
//         })
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res, 'response object status').to.have.status(400);
//           expect(res.body, 'response body').to.be.a('object');
//           expect(res.body, 'response body').to.haveOwnProperty('status');
//           expect(res.body.status, 'status property').to.equal(400);
//           expect(res.body, 'response body').to.haveOwnProperty('error');
//           expect(res.body.error, 'error property').to.be.a('string');
//           done();
//         });
//     });
//   });

//   describe('When the token is missing', (done) => {
//     it('The request shouldnt go through if the token in the cookie is missing', (done) => {
//       // Jwt missing in cookie
//       chai.request(server)
//         .get('/api/v1/car/1')
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res).to.have.status(401);
//           expect(res.body, 'response body').to.be.a('object');
//           expect(res.body, 'response body').to.haveOwnProperty('status');
//           expect(res.body.status, 'status property').to.equal(401);
//           expect(res.body, 'response body').to.haveOwnProperty('error');
//           expect(res.body.error).to.be.a('string');
//           done();
//         });
//     });
//   });
// });

// describe('GET /api/v1/car?status=available and GET /api/v1/car?status=available&min_price=xx&max_price=xx ', () => {
//   describe('When the token is present', () => {
//     it('(status only) When all parameters are correctly supplied the request is successful', (done) => {
//       chai.request(server)
//         .get('/api/v1/car?status=available')
//         .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0QHRlc3Rlci5jb20iLCJpYXQiOjE1NTg2MDIxMDgsImV4cCI6MTU5MDEzODEwOH0.SgG1OgwgrjF76K9U6edowCEpS5HFJP2hy_06DvwV3jg')
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res, 'response object status').to.have.status(200);
//           expect(res.body, 'response body').to.be.a('object');
//           expect(res.body, 'response body').to.haveOwnProperty('status');
//           expect(res.body.status, 'status property').to.equal(200);
//           expect(res.body, 'response body').to.haveOwnProperty('data');
//           expect(res.body.data, 'data property').to.be.a('array');
//           done();
//         });
//     });

//     it('(status, min & max price) When all parameters are correctly supplied the request is successful', (done) => {
//       chai.request(server)
//         .get('/api/v1/car?status=available&min_price=800000&max_price=5000000')
//         .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0QHRlc3Rlci5jb20iLCJpYXQiOjE1NTg2MDIxMDgsImV4cCI6MTU5MDEzODEwOH0.SgG1OgwgrjF76K9U6edowCEpS5HFJP2hy_06DvwV3jg')
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res, 'response object status').to.have.status(200);
//           expect(res.body, 'response body').to.be.a('object');
//           expect(res.body, 'response body').to.haveOwnProperty('status');
//           expect(res.body.status, 'status property').to.equal(200);
//           expect(res.body, 'response body').to.haveOwnProperty('data');
//           expect(res.body.data, 'data property').to.be.a('array');
//           done();
//         });
//     });

//     it('The request shoud not be successful if the value of the status parameter isnt "available" or "sold"', (done) => {
//       chai.request(server)
//         .get('/api/v1/car?status=whatevs')
//         .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0QHRlc3Rlci5jb20iLCJpYXQiOjE1NTg2MDIxMDgsImV4cCI6MTU5MDEzODEwOH0.SgG1OgwgrjF76K9U6edowCEpS5HFJP2hy_06DvwV3jg')
//         .send({
//         })
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res, 'response object status').to.have.status(400);
//           expect(res.body, 'response body').to.be.a('object');
//           expect(res.body, 'response body').to.haveOwnProperty('status');
//           expect(res.body.status, 'status property').to.equal(400);
//           expect(res.body, 'response body').to.haveOwnProperty('error');
//           expect(res.body.error, 'error property').to.be.a('string');
//           done();
//         });
//     });

//     it('The request shoud not be successful if the values if the min&max price query attributes are not numbers', (done) => {
//       chai.request(server)
//         .get('/api/v1/car?status=available&min_price=a&max_price=5000000')
//         .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0QHRlc3Rlci5jb20iLCJpYXQiOjE1NTg2MDIxMDgsImV4cCI6MTU5MDEzODEwOH0.SgG1OgwgrjF76K9U6edowCEpS5HFJP2hy_06DvwV3jg')
//         .send({
//         })
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res, 'response object status').to.have.status(400);
//           expect(res.body, 'response body').to.be.a('object');
//           expect(res.body, 'response body').to.haveOwnProperty('status');
//           expect(res.body.status, 'status property').to.equal(400);
//           expect(res.body, 'response body').to.haveOwnProperty('error');
//           expect(res.body.error, 'error property').to.be.a('string');
//           done();
//         });
//     });
//   });

//   describe('When the token is missing', (done) => {
//     it('The request shouldnt go through if the token in the cookie is missing', (done) => {
//       // Jwt missing in cookie
//       chai.request(server)
//         .get('/api/v1/car?status=available')
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res).to.have.status(401);
//           expect(res.body, 'response body').to.be.a('object');
//           expect(res.body, 'response body').to.haveOwnProperty('status');
//           expect(res.body.status, 'status property').to.equal(401);
//           expect(res.body, 'response body').to.haveOwnProperty('error');
//           expect(res.body.error).to.be.a('string');
//           done();
//         });
//     });
//   });
// });

// describe('DELETE /api/v1/car/<:car-id>', () => {
//   describe('When the token(Admin) is present', () => {
//     it('When all parameters are correctly supplied the request is successful', (done) => {
//       chai.request(server)
//         .delete('/api/v1/car/3')
//         .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJraWxsYmlsbEB0ZXN0LmNvbSIsImlhdCI6MTU1OTEzMDQ3MSwiZXhwIjoxNTkwNjY2NDcxfQ.DKnHchuP_MjSVxXRHKJWHRHnK-BI882X_OC5b6JSiT4')
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res, 'response object status').to.have.status(200);
//           expect(res.body, 'response body').to.be.a('object');
//           expect(res.body, 'response body').to.haveOwnProperty('status');
//           expect(res.body.status, 'status property').to.equal(200);
//           expect(res.body, 'response body').to.haveOwnProperty('data');
//           expect(res.body.data, 'data property').to.be.a('string');
//           done();
//         });
//     });

//     it('The request shoud not be successful if the carid provided doesnt exist or is invalid', (done) => {
//       chai.request(server)
//         .delete('/api/v1/car/ttyr')
//         .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJraWxsYmlsbEB0ZXN0LmNvbSIsImlhdCI6MTU1OTEzMDQ3MSwiZXhwIjoxNTkwNjY2NDcxfQ.DKnHchuP_MjSVxXRHKJWHRHnK-BI882X_OC5b6JSiT4')
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res, 'response object status').to.have.status(400);
//           expect(res.body, 'response body').to.be.a('object');
//           expect(res.body, 'response body').to.haveOwnProperty('status');
//           expect(res.body.status, 'status property').to.equal(400);
//           expect(res.body, 'response body').to.haveOwnProperty('error');
//           expect(res.body.error, 'error property').to.be.a('string');
//           done();
//         });
//     });
//   });

//   describe('When there are issues with the token', (done) => {
//     it('The request shouldnt go through if the id encoded in the token does not have Admin privileges', (done) => {
//       // Jwt missing in cookie
//       chai.request(server)
//         .delete('/api/v1/car/1')
//         .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0QHRlc3Rlci5jb20iLCJpYXQiOjE1NTg2MDIxMDgsImV4cCI6MTU5MDEzODEwOH0.SgG1OgwgrjF76K9U6edowCEpS5HFJP2hy_06DvwV3jg')
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res).to.have.status(401);
//           expect(res.body, 'response body').to.be.a('object');
//           expect(res.body, 'response body').to.haveOwnProperty('status');
//           expect(res.body.status, 'status property').to.equal(401);
//           expect(res.body, 'response body').to.haveOwnProperty('error');
//           expect(res.body.error).to.be.a('string');
//           done();
//         });
//     });

//     it('The request shouldnt go through if the token in the cookie is missing', (done) => {
//       // Jwt missing in cookie
//       chai.request(server)
//         .delete('/api/v1/car/1')
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res).to.have.status(401);
//           expect(res.body, 'response body').to.be.a('object');
//           expect(res.body, 'response body').to.haveOwnProperty('status');
//           expect(res.body.status, 'status property').to.equal(401);
//           expect(res.body, 'response body').to.haveOwnProperty('error');
//           expect(res.body.error).to.be.a('string');
//           done();
//         });
//     });
//   });
// });

// describe('GET /api/v1/car', () => {
//   describe('When the token(Admin) is present', () => {
//     it('When all parameters are correctly supplied the request is successful', (done) => {
//       chai.request(server)
//         .get('/api/v1/car')
//         .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJraWxsYmlsbEB0ZXN0LmNvbSIsImlhdCI6MTU1OTE0NDIyMiwiZXhwIjoxNTkwNjgwMjIyfQ.Ck2c3jUUCQez0Lp4WFf1iLDkkTUSuHhtIcgTQ7vMwsA')
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res, 'response object status').to.have.status(200);
//           expect(res.body, 'response body').to.be.a('object');
//           expect(res.body, 'response body').to.haveOwnProperty('status');
//           expect(res.body.status, 'status property').to.equal(200);
//           expect(res.body, 'response body').to.haveOwnProperty('data');
//           expect(res.body.data, 'data property').to.be.a('array');
//           done();
//         });
//     });
//   });

//   describe('When there are issues with the token', (done) => {
//     it('The request shouldnt go through if the id encoded in the token does not have Admin privileges', (done) => {
//       // Jwt missing in cookie
//       chai.request(server)
//         .get('/api/v1/car')
//         .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0QHRlc3Rlci5jb20iLCJpYXQiOjE1NTg2MDIxMDgsImV4cCI6MTU5MDEzODEwOH0.SgG1OgwgrjF76K9U6edowCEpS5HFJP2hy_06DvwV3jg')
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res).to.have.status(401);
//           expect(res.body, 'response body').to.be.a('object');
//           expect(res.body, 'response body').to.haveOwnProperty('status');
//           expect(res.body.status, 'status property').to.equal(401);
//           expect(res.body, 'response body').to.haveOwnProperty('error');
//           expect(res.body.error).to.be.a('string');
//           done();
//         });
//     });

//     it('The request shouldnt go through if the token in the cookie is missing', (done) => {
//       // Jwt missing in cookie
//       chai.request(server)
//         .get('/api/v1/car')
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res).to.have.status(401);
//           expect(res.body, 'response body').to.be.a('object');
//           expect(res.body, 'response body').to.haveOwnProperty('status');
//           expect(res.body.status, 'status property').to.equal(401);
//           expect(res.body, 'response body').to.haveOwnProperty('error');
//           expect(res.body.error).to.be.a('string');
//           done();
//         });
//     });
//   });
// });

/* 

V2 Tests


*/

describe('POST /api/v2/auth/signup', () => {
  describe('When all values in the POST body are the right format', () => {
    it('Should return an object with properties "status" and "data" on success', (done) => {
      chai.request(server)
        .post('/api/v2/auth/signup')
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
        .post('/api/v2/auth/signup')
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
        .post('/api/v2/auth/signup')
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
          .post('/api/v2/auth/signup')
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

  after((done) => {
    db.query('DELETE FROM users WHERE email = $1', ['jamesp@hogwarts.com']);
    done();
  });
});

describe('POST /api/v2/auth/signin', () => {
  describe('When all the data povided is in the right format', () => {
    it('if the user has an account, it should respond with a property status of 200 and a data property with a token', (done) => {
      chai.request(server)
        .post('/api/v2/auth/signin')
        .type('form')
        .send({
          email: 'test@tester.com',
          password: '123abc',
        })
        .end((err, res) => {
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

    it('should respond with 401 status and error properties if invalid credentials are submitted', (done) => {
      chai.request(server)
        .post('/api/v2/auth/signin')
        .type('form')
        .send({
          email: 'example@test.com',
          password: 'nothing',
        })
        .end((err, res) => {
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
    it('should not be able to log in if all parameters are not present', (done) => {
      chai.request(server)
        .post('/api/v2/auth/signin')
        .type('form')
        .send({
          email: 'TDD@epicmail.com',
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

describe('POST /api/v2/car/', () => {
  it('The request shouldnt go through if the token in the cookie is missing', (done) => {
    // Jwt missing in cookie
    chai.request(server)
      .post('/api/v2/car')
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

  describe('A request with a valid token in the cookie (Client logged in)', () => {
    let carId;

    after((done) => {
      db.query('DELETE FROM cars where id = $1', [carId]);
      done();
    });

    it('The request should be successful when all parameters are supplied correctly', (done) => {
      chai.request(server)
        .post('/api/v2/car')
        .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTU4NDMwNzUwLCJleHAiOjE1ODk5NjY3NTB9.AKuYgp8_C5AdMAmm5EGe1_y_rCl9jctdl4m1yskK-uc')
        .send({
          state: 'new',
          status: 'available',
          price: '2000000',
          manufacturer: 'Toyota',
          model: 'Camry',
          bodyType: 'car',
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res, 'response object status').to.have.status(201);
          expect(res.body, 'response body').to.be.a('object');
          expect(res.body, 'response body').to.haveOwnProperty('status');
          expect(res.body.status, 'status property').to.equal(201);
          expect(res.body, 'response body').to.haveOwnProperty('data');
          expect(res.body.data, 'data property').to.be.a('object');
          carId = res.body.data.id;
          done();
        });
    });

    it('The request shoud not be successful if any of the parameters are missing from the request body', (done) => {
      chai.request(server)
        .post('/api/v2/car')
        .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTU4NDMwNzUwLCJleHAiOjE1ODk5NjY3NTB9.AKuYgp8_C5AdMAmm5EGe1_y_rCl9jctdl4m1yskK-uc')
        .send({
          state: 'new',
          status: 'available',
          manufacturer: 'Toyota',
          model: 'Camry',
          type: 'car',
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
});

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
          carId: 1,
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
