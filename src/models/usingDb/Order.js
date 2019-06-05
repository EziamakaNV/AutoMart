/* eslint-disable linebreak-style */
import moment from 'moment';

import db from './Db/index';

class OrderModel {
  static createOrder(order) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO orders(buyer, car_id, amount, status, created_on) VALUES($1, $2, $3, $4, $5) RETURNING *';
      const values = [order.buyer, order.carId, order.amount, 'pending', moment(new Date())];
      db.query(query, values).then(result => resolve(result.rows[0])).catch(err => reject(err));
    });
  }

  static findOne(id) {
    return this.orders.find(order => order.id === id);
  }

  static update(id, amount) {
    const order = this.findOne(id);
    const index = this.orders.indexOf(order);
    this.orders[index].amount = amount;
    return this.orders[index];
  }

  static previousOrderExists(carId, buyer) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM orders WHERE car_id = $1 AND buyer = $2';
      const values = [carId, buyer];
      db.query(query, values).then((result) => {
        if (result.rows.length === 0) {
          resolve(false);
        } else {
          resolve(result.rows[0]);
        }
      }).catch(err => reject(err));
    });
  }
}

export default OrderModel;
