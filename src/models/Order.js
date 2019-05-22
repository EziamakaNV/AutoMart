/* eslint-disable linebreak-style */
import moment from 'moment';

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
      createdOn: moment.now(),
    };
    this.orders.push(newOrder);
    return { id: newOrder.id, createdOn: newOrder.createdOn, status: newOrder.status };
  }
}

export default new OrderModel();
