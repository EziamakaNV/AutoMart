"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.regexp.replace");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _Validation = _interopRequireDefault(require("../../validations/Validation"));

var _Response = _interopRequireDefault(require("../../responses/Response"));

var _User = _interopRequireDefault(require("../../models/usingDb/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */

/* eslint-disable object-curly-newline */

/* eslint-disable linebreak-style */
require('dotenv').config();

class UserController {
  static async signup(req, res) {
    try {
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
        (0, _Response.default)(res, 400, error);
      } else {
        // Check if the email exists on record
        const userExists = await _User.default.findUser(email);

        if (userExists) {
          res.status(400).json({
            status: 400,
            error: 'Email already exists',
            success: false
          });
        } else {
          // Store user data
          // Hash password
          const saltRounds = 10;
          const hashedPassword = await _bcrypt.default.hash(password, saltRounds);
          const userObject = {
            firstName,
            lastName,
            email,
            password: hashedPassword,
            address,
            isAdmin: false
          };
          const newUser = await _User.default.createUser(userObject); // Generate jwt

          const token = _jsonwebtoken.default.sign({
            id: newUser.id,
            email
          }, process.env.JWT_SECRET, {
            expiresIn: '8760h'
          }); // Set cookie header


          res.cookie('jwt', token, {
            maxAge: 31540000000,
            httpOnly: true
          });
          res.cookie('user', JSON.stringify({
            firstName,
            lastName
          }), {
            maxAge: 31540000000
          }); // Final response

          res.status(200).json({
            status: 200,
            data: {
              token,
              id: newUser.id,
              firstName,
              lastName,
              email,
              hashedPassword
            },
            success: true
          });
        }
      }
    } catch (error) {
      (0, _Response.default)(res, 500, error);
    }
  }

  static async signin(req, res) {
    try {
      const password = req.body.password; // Remove empty spaces from the email and set to lowercase

      const email = req.body.email.replace(/\s/g, '').toLowerCase();
      const validationObject = {
        email,
        password
      };

      const _Validation$loginVali = _Validation.default.loginValidation(validationObject),
            error = _Validation$loginVali.error;

      if (error) {
        res.status(400).json({
          status: 400,
          error: "Issue with credentials supplied. Problem: ".concat(error)
        });
      } else {
        const user = await _User.default.findUser(email);

        if (user) {
          // Compare passwords
          const match = await _bcrypt.default.compare(password, user.password);

          if (match) {
            // (same-boolean) If the passwords match
            const token = _jsonwebtoken.default.sign({
              id: user.id,
              email
            }, process.env.JWT_SECRET, {
              expiresIn: '8760h'
            });

            res.cookie('jwt', token, {
              maxAge: 31540000000,
              httpOnly: true
            }); // httpOnly not set because
            // I want to be able to read the cookie
            // on the client side with Js

            res.cookie('user', JSON.stringify({
              firstName: user.firstName,
              lastName: user.lastName
            }), {
              maxAge: 31540000000
            });
            res.status(200).json({
              status: 200,
              data: {
                token,
                id: user.id,
                first_name: user.firstName,
                last_name: user.lastName,
                email
              }
            });
          } else {
            res.status(401).json({
              status: 401,
              error: 'The Email/Paswword is incorrect'
            });
          }
        } else {
          res.status(401).json({
            status: 401,
            error: 'The Email/Paswword is incorrect'
          });
        }
      }
    } catch (error) {
      (0, _Response.default)(res, 500, error);
    }
  }

}

var _default = UserController;
exports.default = _default;