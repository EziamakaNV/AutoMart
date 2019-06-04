/* eslint-disable linebreak-style */
import moment from 'moment';
import db from './Db/index';

class CarModel {
  static createCar(car) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO cars(owner, created_on, state, status, price, manufacturer, model, body_type, image_url) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
      const values = [car.ownerId, moment(new Date()), car.state, car.status, car.price, car.manufacturer, car.model, car.bodyType, car.imageUrl || null];
      db.query(query, values).then(result => resolve(result.rows[0])).catch(err => reject(err));
    });
  }

  static findOne(id) {
    return this.cars.find(car => car.id === id);
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
    this.cars.forEach((car) => {
      if ((car.status === 'available') && (car.price >= minPrice && car.price <= maxPrice)) cars.push(car);
    });
    return cars;
  }

  static findAllAvailable() {
    const cars = [];
    this.cars.forEach((car) => {
      if ((car.status === 'available')) cars.push(car);
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

export default CarModel;
