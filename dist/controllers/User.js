"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.regexp.replace");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _entities = _interopRequireDefault(require("../models/entities"));

var _Validation = _interopRequireDefault(require("../validations/Validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */

/* eslint-disable object-curly-newline */

/* eslint-disable linebreak-style */
require('dotenv').config();

class UserController {
  static signup(req, res) {
    const _req$body = req.body,
          firstName = _req$body.firstName,
          lastName = _req$body.lastName,
          password = _req$body.password,
          address = _req$body.address; // Remove empty spaces from the email and set to lowercase

    const email = req.body.email.replace(/\s/g, '').toLowerCase(); // The .replace is from Stack Overflow. It removes empty spaces
    // Use Joi to validate input

    const validationObject = {
      firstName,
      lastName,
      email,
      password,
      address
    };

    const _Validation$signUpVal = _Validation.default.signUpValidation(validationObject),
          error = _Validation$signUpVal.error;

    if (error) {
      res.status(400).json({
        status: 400,
        error: "Issue with supplied parameters. Error: ".concat(error)
      });
    } else {
      // Check if the email exists on record
      let emailAlreadyExists = false;

      _entities.default.Users.forEach(user => {
        if (user.email === email) emailAlreadyExists = true;
      });

      if (emailAlreadyExists) {
        res.status(400).json({
          status: 400,
          error: 'Email already exists',
          success: false
        });
      } else {
        // Store user data
        // Hash password
        const saltRounds = 10;

        _bcrypt.default.hash(password, saltRounds, (err, hashedPassword) => {
          if (err) {
            res.status(500).json({
              status: 500,
              error: 'Server error. Try again',
              success: false
            });
          } else {
            // Get user id
            const userId = _entities.default.Users.length + 1; // Store details

            _entities.default.Users.push({
              id: userId,
              firstName,
              lastName,
              email,
              password: hashedPassword,
              address,
              isAdmin: false
            }); // Generate jwt


            const token = _jsonwebtoken.default.sign({
              id: userId
            }, process.env.JWT_SECRET, {
              expiresIn: '8760h'
            }); // Set cookie header


            res.cookie('jwt', token, {
              maxAge: 31540000000,
              httpOnly: true
            }); // Final response

            res.status(200).json({
              status: 200,
              data: {
                token,
                id: userId,
                firstName,
                lastName,
                email
              },
              success: true
            });
          }
        });
      }
    }
  }

}

var _default = UserController;
exports.default = _default;