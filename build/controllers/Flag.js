"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

var _Validation = _interopRequireDefault(require("../validations/Validation"));

var _Flag = _interopRequireDefault(require("../models/Flag"));

var _Car = _interopRequireDefault(require("../models/Car"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class FlagController {
  static createFlag(req, res) {
    const flagDetails = {
      carId: req.body.carId,
      reason: req.body.reason,
      description: req.body.description
    };

    const _Validation$newFlagVa = _Validation.default.newFlagValidation(flagDetails),
          error = _Validation$newFlagVa.error;

    if (error) {
      res.status(400).json({
        status: 400,
        error: "Issue with parameters supplies. Problem: ".concat(error)
      });
    } else {
      // Get car details
      const carAd = _Car.default.findOne(flagDetails.carId);

      if (!carAd) {
        res.status(404).json({
          status: 404,
          error: 'Car/Ad does not exist'
        });
      } else {
        // Ensure one cant flag a car ad more than once
        const previousFlagExists = _Flag.default.previousFlagExists(carAd.id, req.user.id);

        if (previousFlagExists) {
          res.status(401).json({
            status: 401,
            error: 'You have already flagged this ad',
            success: false
          });
        } else {
          // Create flag
          const newFlag = {
            owner: req.user.id,
            carId: carAd.id,
            reason: flagDetails.reason,
            description: flagDetails.description
          };

          const createdFlag = _Flag.default.createFlag(newFlag);

          res.status(201).json({
            status: 201,
            data: _objectSpread({}, createdFlag)
          });
        }
      }
    }
  }

}

var _default = FlagController;
exports.default = _default;