"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

var _Validation = _interopRequireDefault(require("../validations/Validation"));

var _Car = _interopRequireDefault(require("../models/Car"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class CarController {
  static createCar(req, res) {
    const _req$body = req.body,
          state = _req$body.state,
          status = _req$body.status,
          price = _req$body.price,
          manufacturer = _req$body.manufacturer,
          model = _req$body.model,
          bodyType = _req$body.bodyType;
    const validationObject = {
      state,
      status,
      price,
      manufacturer,
      model,
      bodyType
    };

    const _Validation$newCarVal = _Validation.default.newCarValidation(validationObject),
          error = _Validation$newCarVal.error;

    if (error) {
      res.status(400).json({
        status: 400,
        error: "Issue with parameters supplied. Problem ".concat(error),
        success: false
      });
    } else {
      const newCar = _objectSpread({}, validationObject, {
        owner: req.user.id
      }); // Create new car


      const createdCar = _Car.default.createCar(newCar);

      res.status(201).json({
        status: 201,
        data: createdCar,
        sucess: true
      });
    }
  }

}

var _default = CarController;
exports.default = _default;