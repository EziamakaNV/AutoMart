/* eslint-disable linebreak-style */
import moment from 'moment';

class CarModel {
  constructor() {
    this.cars = [{
      id: 1,
      owner: 1,
      email: 'john@test.com',
      createdOn: 1558523346288,
      state: 'new',
      status: 'available',
      price: 3000000,
      manufacturer: 'Toyota',
      model: 'Camry',
    }, {
      id: 2,
      owner: 1,
      email: 'john@test.com',
      createdOn: 1558523346299,
      state: 'new',
      status: 'available',
      price: 5000000,
      manufacturer: 'Toyota',
      model: 'Camry',
    }, {
      id: 3,
      owner: 2,
      email: 'test@tester.com',
      createdOn: 1558523347299,
      state: 'new',
      status: 'available',
      price: 8000000,
      manufacturer: 'Toyota',
      model: 'Avalon',
    }];
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

  findOne(id) {
    return this.cars.find(car => car.id === id);
  }

  updateStatus(id, status) {
    const car = this.findOne(id);
    const index = this.cars.indexOf(car);
    this.cars[index].status = status;
    return this.cars[index];
  }

  updatePrice(id, price) {
    const car = this.findOne(id);
    const index = this.cars.indexOf(car);
    this.cars[index].price = price;
    return this.cars[index];
  }
}

export default new CarModel();
