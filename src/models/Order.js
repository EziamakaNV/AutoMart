/* eslint-disable linebreak-style */
import moment from 'moment';

class OrderModel {
  constructor() {
    this.orders = [{
      id: 1,
      buyer: 2,
      carId: 1,
      amount: 600000,
      status: 'pending',
      createdOn: moment.now(),
    }, {
      id: 2,
      buyer: 1,
      carId: 1,
      amount: 600000,
      status: 'pending',
      createdOn: moment.now(),
    }];
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

export default new OrderModel();
