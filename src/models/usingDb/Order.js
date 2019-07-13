/* eslint-disable linebreak-style */
import moment from 'moment';

import db from './Db/index';

class OrderModel {
  static createOrder(order) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO orders(buyer, car_id, amount, status, created_on) VALUES($1, $2, $3, $4, $5) RETURNING *';
      const values = [order.buyer, order.car_id, order.amount, 'pending', moment(new Date())];
      db.query(query, values).then(result => resolve(result.rows[0])).catch(err => reject(err));
    });
  }

  static findOne(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM orders WHERE id = $1';
      const values = [id];
      db.query(query, values).then((result) => {
        if (result.rows.length === 0) {
          resolve(false);
        } else {
          resolve(result.rows[0]);
        }
      }).catch(err => reject(err));
    });
  }

  static update(id, amount) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE orders SET amount = $1 WHERE id = $2 RETURNING *';
      const values = [amount, id];
      db.query(query, values).then(result => resolve(result.rows[0])).catch(err => reject(err));
    });
  }

  static previousOrderExists(car_id, buyer) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM orders WHERE car_id = $1 AND buyer = $2';
      const values = [car_id, buyer];
      db.query(query, values).then((result) => {
        if (result.rows.length === 0) {
          resolve(false);
        } else {
          resolve(result.rows[0]);
        }
      }).catch(err => reject(err));
    });
  }

  static findMyOrders(buyer) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT cars.id, cars.price, cars.manufacturer, cars.model, cars.image_url, orders.id AS order_id FROM cars INNER JOIN orders ON cars.id = orders.car_id WHERE orders.buyer = $1';
      const values = [buyer];
      db.query(query, values).then((result) => {
        if (result.rows.length === 0) {
          resolve(false);
        } else {
          resolve(result.rows);
        }
      }).catch(err => reject(err));
    });
  }

  static getOrder(buyer, orderId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT cars.state, orders.status AS order_status, cars.price, orders.amount AS amount_offered, cars.manufacturer, cars.model, cars.body_type, cars.image_url FROM cars INNER JOIN orders ON cars.id = orders.car_id WHERE (orders.buyer = $1 AND orders.id = $2)';
      const values = [buyer, orderId];
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
