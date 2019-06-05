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
      const values = [car.ownerId, (0, _moment.default)(new Date()), car.state, car.status, car.price, car.manufacturer, car.model, car.bodyType, car.imageUrl || null];

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
    const car = this.findOne(id);
    const index = this.cars.indexOf(car);
    this.cars[index].status = status;
    return this.cars[index];
  }

  static updatePrice(id, price) {
    const car = this.findOne(id);
    const index = this.cars.indexOf(car);
    this.cars[index].price = price;
    return this.cars[index];
  }

  static findAllAvailableRange(minPrice, maxPrice) {
    const cars = [];
    this.cars.forEach(car => {
      if (car.status === 'available' && car.price >= minPrice && car.price <= maxPrice) cars.push(car);
    });
    return cars;
  }

  static findAllAvailable() {
    const cars = [];
    this.cars.forEach(car => {
      if (car.status === 'available') cars.push(car);
    });
    return cars;
  }

  static findAll() {
    return this.cars;
  }

  static deleteCar(car) {
    const index = this.cars.indexOf(car);
    return this.cars.splice(index, 1);
  }

}

var _default = CarModel;
exports.default = _default;