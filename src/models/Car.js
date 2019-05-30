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
      bodyType: 'car',
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
      bodyType: 'car',
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
      bodyType: 'car',
    }, {
      id: 4,
      owner: 2,
      email: 'test@tester.com',
      createdOn: 1558523347299,
      state: 'new',
      status: 'sold',
      price: 800000,
      manufacturer: 'Ford',
      model: 'FortRunner',
      bodyType: 'Jeep',
    }, {
      id: 5,
      owner: 2,
      email: 'test@tester.com',
      createdOn: 1558523347299,
      state: 'new',
      status: 'sold',
      price: 80000,
      manufacturer: 'Lexus',
      model: 'Sport',
      bodyType: 'Jeep',
    }, {
      id: 6,
      owner: 2,
      email: 'test@tester.com',
      createdOn: 1558523347299,
      state: 'new',
      status: 'sold',
      price: 898233,
      manufacturer: 'BMW',
      model: 'X6',
      bodyType: 'Jeep',
    }, {
      id: 7,
      owner: 2,
      email: 'test@tester.com',
      createdOn: 1558523347299,
      state: 'new',
      status: 'available',
      price: 898233,
      manufacturer: 'BMW',
      model: 'X3',
      bodyType: 'Jeep',
    }, {
      id: 8,
      owner: 4,
      email: 'killbill@test.com',
      createdOn: 1558523349299,
      state: 'new',
      status: 'available',
      price: 898233,
      manufacturer: 'BMW',
      model: 'X3',
      bodyType: 'Jeep',
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

  findAllAvailableRange(minPrice, maxPrice) {
    const cars = [];
    this.cars.forEach((car) => {
      if ((car.status === 'available') && (car.price >= minPrice && car.price <= maxPrice)) cars.push(car);
    });
    return cars;
  }

  findAllAvailable() {
    const cars = [];
    this.cars.forEach((car) => {
      if ((car.status === 'available')) cars.push(car);
    });
    return cars;
  }

  findAll() {
    return this.cars;
  }

  deleteCar(car) {
    const index = this.cars.indexOf(car);
    return this.cars.splice(index, 1);
  }
}

export default new CarModel();
