"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _index = _interopRequireDefault(require("./Db/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */
class CarModel {
  static createCar(car) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO cars(owner, created_on, state, status, price, manufacturer, model, body_type, image_url) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
      const values = [car.ownerId, (0, _moment.default)(new Date()), car.state, car.status, car.price, car.manufacturer, car.model, car.body_type, car.imageUrl || null];

      _index.default.query(query, values).then(result => resolve(result.rows[0])).catch(err => reject(err));
    });
  }

  static findOne(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM cars WHERE id = $1';
      const values = [id];

      _index.default.query(query, values).then(result => {
        if (result.rows.length === 0) {
          resolve(false);
        } else {
          resolve(result.rows[0]);
        }
      }).catch(err => reject(err));
    });
  }

  static updateStatus(id, status) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE cars SET status = $1 WHERE id = $2 RETURNING *';
      const values = [status, id];

      _index.default.query(query, values).then(result => resolve(result.rows[0])).catch(err => reject(err));
    });
  }

  static updatePrice(id, price) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE cars SET price = $1 WHERE id = $2 RETURNING *';
      const values = [price, id];

      _index.default.query(query, values).then(result => resolve(result.rows[0])).catch(err => reject(err));
    });
  }

  static findAllAvailableRange(minPrice, maxPrice) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM cars WHERE (status = $1) AND (price >= $2 AND price <= $3)';
      const values = ['available', minPrice, maxPrice];

      _index.default.query(query, values).then(result => resolve(result.rows)).catch(err => reject(err));
    });
  }

  static findAllAvailable() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM cars WHERE status = $1';
      const values = ['available'];

      _index.default.query(query, values).then(result => resolve(result.rows)).catch(err => reject(err));
    });
  }

  static findAll() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM cars';

      _index.default.query(query).then(result => resolve(result.rows)).catch(err => reject(err));
    });
  }

  static deleteCar(car) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM cars WHERE id = $1 RETURNING *';
      const values = [car.id];

      _index.default.query(query, values).then(result => resolve(result.rows[0])).catch(err => reject(err));
    });
  }

  static findMyCars(userId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM cars WHERE owner = $1';
      const values = [userId];

      _index.default.query(query, values).then(result => {
        if (result.rows.length === 0) {
          resolve(false);
        } else {
          resolve(result.rows);
        }
      }).catch(err => reject(err));
    });
  }

}

var _default = CarModel;
exports.default = _default;