"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */
require('dotenv').config();

class Authentication {
  static async verifyToken(req, res, next) {
    const token = req.cookies.jwt; // Check for the token

    if (!token) {
      res.status(401).json({
        status: 401,
        error: 'Missing token',
        success: false
      });
    } else {
      try {
        const decoded = await _jsonwebtoken.default.verify(token, process.env.JWT_SECRET); // Create user object in the request

        req.user = decoded;
        next();
      } catch (error) {
        res.status(500).json({
          status: 500,
          error: "Issue with jwt token. Problem: ".concat(error)
        });
      }
    }
  }

}

var _default = Authentication;
exports.default = _default;