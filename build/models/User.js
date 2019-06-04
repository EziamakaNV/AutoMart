"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable linebreak-style */
class UserModel {
  constructor() {
    this.users = [{
      id: 1,
      email: 'john@test.com',
      firstName: 'john',
      lastName: 'doe',
      password: 'test',
      address: '123 Testing Avenue, State, Country',
      isAdmin: false
    }, {
      id: 2,
      email: 'test@tester.com',
      firstName: 'Madike',
      lastName: 'Johnson',
      password: '$2b$10$5wgB0m73ao9vsTcypaLd3uvWOyZh0bRqWksnbT2irWH61KDrfPQHC',
      address: 'Does it matter lol',
      isAdmin: false
    }, {
      id: 3,
      email: 'jp@hogwarts.com',
      firstName: 'James',
      lastName: 'Potter',
      password: '$2b$10$yK5w7gbn8jzgy7QSR4lJU.c6p2ixMooFOJMvK0hyIBAkHRzaElCgS',
      address: 'Gryffindor, HOgwarts',
      isAdmin: false
    }, {
      id: 4,
      email: 'killbill@test.com',
      firstName: 'Kill',
      lastName: 'Bill',
      password: '$2b$10$mir1ZgwOSTPGaGUlHJUpX.C03pLhmDm.e8rrKFagPh98VhdlD2rky',
      address: 'testing address',
      isAdmin: true
    }];
  }

  findUser(email) {
    return this.users.find(user => user.email === email);
  }

  createUser(user) {
    const newUser = this.users.push(_objectSpread({
      id: this.users.length + 1
    }, user));
    return this.users[newUser - 1];
  }

  isAdmin(userId) {
    return this.users.find(user => user.isAdmin === true && user.id === userId);
  }

}

var _default = new UserModel();

exports.default = _default;