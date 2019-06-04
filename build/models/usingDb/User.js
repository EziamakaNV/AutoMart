"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("./Db/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */
class UserModel {
  static findUser(email) {
    return new Promise((resolve, reject) => {
      const text = 'SELECT * FROM users where email = $1';

      _index.default.query(text, [email]).then(result => {
        if (result.rows.length === 0) {
          resolve(false);
        } else {
          resolve(true);
        }
      }).catch(err => reject(err));
    });
  }

  static createUser(user) {
    return new Promise((resolve, reject) => {
      const text = 'INSERT INTO users(email, first_name, last_name, password, address, is_admin) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
      const values = [user.email, user.firstName, user.lastName, user.password, user.address, user.isAdmin];

      _index.default.query(text, values).then(result => resolve(result.rows[0])).catch(err => reject(err));
    });
  }

  static isAdmin(userId) {
    return this.users.find(user => user.isAdmin === true && user.id === userId);
  }

}

var _default = UserModel;
exports.default = _default;