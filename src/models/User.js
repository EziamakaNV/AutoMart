/* eslint-disable linebreak-style */
class UserModel {
  constructor() {
    this.users = [{
      id: 1,
      email: 'john@test.com',
      firstName: 'john',
      lastName: 'doe',
      password: 'test',
      address: '123 Testing Avenue, State, Country',
      isAdmin: false,
    },
    {
      id: 2,
      email: 'test@tester.com',
      firstName: 'Madike',
      lastName: 'Johnson',
      password: '$2b$10$5wgB0m73ao9vsTcypaLd3uvWOyZh0bRqWksnbT2irWH61KDrfPQHC',
      address: 'Does it matter lol',
      isAdmin: false,
    },
    {
      id: 3,
      email: 'jp@hogwarts.com',
      firstName: 'James',
      lastName: 'Potter',
      password: '$2b$10$yK5w7gbn8jzgy7QSR4lJU.c6p2ixMooFOJMvK0hyIBAkHRzaElCgS',
      address: 'Gryffindor, HOgwarts',
      isAdmin: false,
    },
    {
      id: 4,
      email: 'killbill@test.com',
      firstName: 'Kill',
      lastName: 'Bill',
      password: '$2b$10$mir1ZgwOSTPGaGUlHJUpX.C03pLhmDm.e8rrKFagPh98VhdlD2rky',
      address: 'testing address',
      isAdmin: true,
    }];
  }

  findUser(email) {
    return this.users.find(user => user.email === email);
  }

  createUser(user) {
    const newUser = this.users.push({ id: this.users.length + 1, ...user });
    return this.users[newUser - 1];
  }

  isAdmin(userId) {
    return this.users.find(user => user.isAdmin === true && user.id === userId);
  }
}

export default new UserModel();
