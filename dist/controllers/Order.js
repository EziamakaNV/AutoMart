"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

var _Validation = _interopRequireDefault(require("../validations/Validation"));

var _Order = _interopRequireDefault(require("../models/Order"));

var _Car = _interopRequireDefault(require("../models/Car"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class OrderController {
  static createOrder(req, res) {
    const orderDetails = {
      carId: req.body.carId,
      amount: req.body.amount
    };

    const _Validation$newOrderV = _Validation.default.newOrderValidation(orderDetails),
          error = _Validation$newOrderV.error;

    if (error) {
      res.status(400).json({
        status: 400,
        error: "Issue with parameters supplies. Problem: ".concat(error)
      });
    } else {
      // Get car details
      const carAd = _Car.default.findOne(orderDetails.carId);

      if (!carAd) {
        res.status(404).json({
          status: 404,
          error: 'Car/Ad does not exist'
        });
      } else {
        // Create order model
        const newOrder = {
          buyer: carAd.owner,
          carId: carAd.id,
          amount: orderDetails.amount
        };

        const createdOrder = _Order.default.createOrder(newOrder);

        res.status(201).json({
          status: 201,
          data: _objectSpread({}, createdOrder, {
            carId: carAd.id,
            price: carAd.price,
            priceOffered: orderDetails.amount
          })
        });
      }
    }
  }

}

var _default = OrderController;
exports.default = _default;