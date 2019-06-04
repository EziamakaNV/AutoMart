"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */
_dotenv.default.config();

const pool = new _pg.Pool({
  connectionString: process.env.DATABASE_URL
});
var _default = {
  query(text, params) {
    return new Promise((resolve, reject) => {
      pool.query(text, params).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    });
  }

};
exports.default = _default;