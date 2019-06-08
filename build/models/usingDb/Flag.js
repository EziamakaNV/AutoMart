"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _index = _interopRequireDefault(require("./Db/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */
class FlagModel {
  static createFlag(flag) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO flags (car_id, created_on, reason, description, owner) VALUES ($1, $2, $3, $4, $5) RETURNING *';
      const values = [flag.carId, (0, _moment.default)(new Date()), flag.reason, flag.description, flag.owner];

      _index.default.query(query, values).then(result => resolve(result.rows[0])).catch(error => reject(error));
    });
  }

  static previousFlagExists(carId, owner) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM flags WHERE car_id = $1 AND owner = $2';
      const values = [carId, owner];

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

var _default = FlagModel;
exports.default = _default;