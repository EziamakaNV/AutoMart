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
        // Ensure one cant place more than one order on a car ad
        const previousOrderExists = _Order.default.previousOrderExists(carAd.id, req.user.id);

        if (previousOrderExists) {
          res.status(401).json({
            status: 401,
            error: 'You already have an order pending for this ad',
            success: false
          });
        } else {
          // Create order
          const newOrder = {
            buyer: req.user.id,
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

  static updateOrder(req, res) {
    const orderId = Number(req.params.orderId);
    const amount = req.body.amount;

    const _Validation$orderUpda = _Validation.default.orderUpdate({
      orderId,
      amount
    }),
          error = _Validation$orderUpda.error;

    if (error) {
      res.status(400).json({
        status: 400,
        error: "".concat(error),
        success: false
      });
    } else {
      // Check if the order exists
      const initialOrder = _Order.default.findOne(orderId);

      if (initialOrder) {
        // Check if the owner if the order is the same person updating it
        if (initialOrder.buyer === req.user.id) {
          // Check if the status of the order is still pending
          if (initialOrder.status === 'pending') {
            const updatedOrder = _Order.default.update(orderId, amount);

            res.status(200).json({
              status: 200,
              data: {
                id: updatedOrder.id,
                carId: updatedOrder.carId,
                status: updatedOrder.status,
                oldPriceOffered: initialOrder.amount,
                newPriceOffered: updatedOrder.amount
              }
            });
          } else {
            res.status(401).json({
              status: 401,
              error: 'This order is no longer pending',
              success: true
            });
          }
        } else {
          res.status(401).json({
            status: 401,
            error: 'You do not own this order',
            success: false
          });
        }
      } else {
        res.status(400).json({
          status: 400,
          error: 'Order does not exist',
          success: false
        });
      }
    }
  }

}

var _default = OrderController;
exports.default = _default;