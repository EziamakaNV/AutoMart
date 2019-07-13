"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _User = _interopRequireDefault(require("../../models/usingDb/User"));

var _Response = _interopRequireDefault(require("../../responses/Response"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */
require('dotenv').config();

class Authentication {
  static async verifyToken(req, res, next) {
    const token = req.cookies.jwt || req.body.token; // Check for the token

    if (!token) {
      res.status(401).json({
        status: 401,
        error: 'Missing token',
        success: false
      });
    } else {
      try {
        const user = await _jsonwebtoken.default.verify(token, process.env.JWT_SECRET); // Create user object in the request

        req.user = user;
        req.token = token;
        next(); // Check if the user is still in the DB
        // const userExists = await UserModel.findUser(user.email);
        // if (userExists) {
        //   // Create user object in the request
        //   req.user = user;
        //   next();
        // } else {
        //   response(res, 401, 'Malicious token request. You dont exist on the DB!');
        // }
      } catch (error) {
        res.status(500).json({
          status: 500,
          error: "Issue with jwt token. Problem: ".concat(error)
        });
      }
    }
  }

  static async adminVerifyToken(req, res, next) {
    const token = req.cookies.jwt || req.body.token; // Check for the token

    if (!token) {
      res.status(401).json({
        status: 401,
        error: 'Missing token',
        success: false
      });
    } else {
      try {
        const user = await _jsonwebtoken.default.verify(token, process.env.JWT_SECRET); // Check if the user is an admin

        const isUserAdmin = await _User.default.is_admin(user.id);

        if (isUserAdmin) {
          req.user = user;
          req.token = token;
          next();
        } else {
          (0, _Response.default)(res, 401, 'You are not an Admin');
        }
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