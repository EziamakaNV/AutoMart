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
          resolve(result.rows[0]);
        }
      }).catch(err => reject(err));
    });
  }

  static createUser(user) {
    return new Promise((resolve, reject) => {
      const text = 'INSERT INTO users(email, first_name, last_name, password, address, is_admin) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
      const values = [user.email, user.first_name, user.last_name, user.password, user.address, user.is_admin];

      _index.default.query(text, values).then(result => resolve(result.rows[0])).catch(err => reject(err));
    });
  }

  static is_admin(userId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT FROM users WHERE id = $1 AND is_admin = $2';
      const values = [userId, true];

      _index.default.query(query, values).then(result => {
        if (result.rows.length === 0) {
          resolve(false);
        } else {
          resolve(result.rows[0]);
        }
      }).catch(err => reject(err));
    });
  }

}

var _default = UserModel;
exports.default = _default;