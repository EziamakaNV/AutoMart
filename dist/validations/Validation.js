"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */
class Validation {
  static signUpValidation(validationObject) {
    const schema = {
      firstName: _joi.default.string().min(3).max(15).required(),
      lastName: _joi.default.string().min(3).max(15).required(),
      email: _joi.default.string().email().required(),
      password: _joi.default.string().min(6).max(20).required(),
      address: _joi.default.string().min(15).max(50).required()
    };
    return _joi.default.validate(validationObject, schema);
  }

  static loginValidation(validationObject) {
    const schema = {
      email: _joi.default.string().email().required(),
      password: _joi.default.string().min(6).max(20).required()
    };
    return _joi.default.validate(validationObject, schema);
  }

  static newCarValidation(validationObject) {
    const schema = {
      state: _joi.default.string().valid('new', 'used').required(),
      status: _joi.default.string().valid('available').required(),
      price: _joi.default.number().integer().min(1).max(999999999999).required(),
      manufacturer: _joi.default.string().min(3).max(50).required(),
      model: _joi.default.string().min(3).max(50).required(),
      bodyType: _joi.default.string().min(3).max(15).required()
    };
    return _joi.default.validate(validationObject, schema);
  }

  static newOrderValidation(validationObject) {
    const schema = {
      carId: _joi.default.number().integer().required(),
      amount: _joi.default.number().integer().min(1).max(999999999999).required()
    };
    return _joi.default.validate(validationObject, schema);
  }

  static orderUpdate(validationObject) {
    const schema = {
      orderId: _joi.default.number().integer().required(),
      amount: _joi.default.number().integer().min(1).max(999999999999).required()
    };
    return _joi.default.validate(validationObject, schema);
  }

  static carStatusUpdate(validationObject) {
    const schema = {
      status: _joi.default.string().valid('sold').required(),
      carId: _joi.default.number().integer().required()
    };
    return _joi.default.validate(validationObject, schema);
  }

}

var _default = Validation;
exports.default = _default;