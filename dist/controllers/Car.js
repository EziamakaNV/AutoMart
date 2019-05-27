"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

var _Validation = _interopRequireDefault(require("../validations/Validation"));

var _Car = _interopRequireDefault(require("../models/Car"));

var _Response = _interopRequireDefault(require("../responses/Response"));

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
      const newCarDetails = _objectSpread({}, validationObject, {
        ownerId: req.user.id,
        ownerEmail: req.user.email
      }); // Create new car


      const createdCar = _Car.default.createCar(newCarDetails);

      res.status(201).json({
        status: 201,
        data: createdCar,
        sucess: true
      });
    }
  }

  static updateStatus(req, res) {
    const status = req.body.status;
    const carId = Number(req.params.carId);
    const validationObject = {
      status,
      carId
    };

    const _Validation$carStatus = _Validation.default.carStatusUpdate(validationObject),
          error = _Validation$carStatus.error;

    if (error) {
      (0, _Response.default)(res, 400, error);
    } else {
      // Check if the car id exists
      const carAd = _Car.default.findOne(carId);

      if (carAd) {
        // Check if the owner of the ad is the one updating the ad
        if (carAd.owner === req.user.id) {
          const updatedCar = _Car.default.updateStatus(carId, 'sold');

          (0, _Response.default)(res, 200, updatedCar);
        } else {
          (0, _Response.default)(res, 401, 'You do not own this Ad');
        }
      } else {
        (0, _Response.default)(res, 400, 'The Car Ad Doesnt Exist');
      }
    }
  }

  static updatePrice(req, res) {
    const price = req.body.price;
    const carId = Number(req.params.carId);
    const validationObject = {
      price,
      carId
    };

    const _Validation$carPriceU = _Validation.default.carPriceUpdate(validationObject),
          error = _Validation$carPriceU.error;

    if (error) {
      (0, _Response.default)(res, 400, error);
    } else {
      // Check if the car id exists
      const carAd = _Car.default.findOne(carId);

      if (carAd) {
        // Check if the owner of the ad is the one updating the ad
        if (carAd.owner === req.user.id) {
          const updatedCar = _Car.default.updatePrice(carId, price);

          (0, _Response.default)(res, 200, updatedCar);
        } else {
          (0, _Response.default)(res, 401, 'You do not own this Ad');
        }
      } else {
        (0, _Response.default)(res, 400, 'The Car Ad Doesnt Exist');
      }
    }
  }

}

var _default = CarController;
exports.default = _default;