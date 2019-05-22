"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */
class OrderModel {
  constructor() {
    this.orders = [];
  }

  createOrder(order) {
    const newOrder = {
      id: this.orders.length + 1,
      buyer: order.buyer,
      carId: order.carId,
      amount: order.amount,
      status: 'pending',
      createdOn: _moment.default.now()
    };
    this.orders.push(newOrder);
    return {
      id: newOrder.id,
      createdOn: newOrder.createdOn,
      status: newOrder.status
    };
  }

}

var _default = new OrderModel();

exports.default = _default;