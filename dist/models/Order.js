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
    this.orders = [{
      id: 1,
      buyer: 2,
      carId: 1,
      amount: 600000,
      status: 'pending',
      createdOn: _moment.default.now()
    }, {
      id: 2,
      buyer: 1,
      carId: 1,
      amount: 600000,
      status: 'pending',
      createdOn: _moment.default.now()
    }];
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

  findOne(id) {
    return this.orders.find(order => order.id === id);
  }

  update(id, amount) {
    const order = this.findOne(id);
    const index = this.orders.indexOf(order);
    this.orders[index].amount = amount;
    return this.orders[index];
  }

  previousOrderExists(carId, buyer) {
    return this.orders.find(order => order.carId === carId && order.buyer === buyer);
  }

}

var _default = new OrderModel();

exports.default = _default;