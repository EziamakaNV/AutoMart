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

}

var _default = Validation;
exports.default = _default;