/* eslint-disable linebreak-style */
import moment from 'moment';

class CarModel {
  constructor() {
    this.cars = [];
  }

  createCar(car) {
    const newCar = {
      id: this.cars.length + 1,
      owner: car.ownerId,
      email: car.ownerEmail,
      createdOn: moment.now(),
      state: car.state,
      status: car.status,
      price: car.price,
      manufacturer: car.manufacturer,
      model: car.model,
    };
    this.cars.push(newCar);
    return newCar;
  }
}

export default new CarModel();
