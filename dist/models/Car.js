"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */
class CarModel {
  constructor() {
    this.cars = [];
  }

  createCar(car) {
    const newCar = {
      id: this.cars.length + 1,
      owner: car.ownerId,
      email: car.ownerEmail,
      createdOn: _moment.default.now(),
      state: car.state,
      status: car.status,
      price: car.price,
      manufacturer: car.manufacturer,
      model: car.model
    };
    this.cars.push(newCar);
    return newCar;
  }

}

var _default = new CarModel();

exports.default = _default;