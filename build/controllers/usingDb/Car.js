"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _fs = _interopRequireDefault(require("fs"));

var _Validation = _interopRequireDefault(require("../../validations/Validation"));

var _Car = _interopRequireDefault(require("../../models/usingDb/Car"));

var _Response = _interopRequireDefault(require("../../responses/Response"));

var _User = _interopRequireDefault(require("../../models/usingDb/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Cloudinary
require('dotenv').config();

const cloudinary = _cloudinary.default.v2;

class CarController {
  static async createCar(req, res) {
    try {
      // If the car image is present
      if (req.files) {
        // The image is properly added to the form
        if (req.files.carImage) {
          const _req$body = req.body,
                state = _req$body.state,
                status = _req$body.status,
                price = _req$body.price,
                manufacturer = _req$body.manufacturer,
                model = _req$body.model,
                bodyType = _req$body.bodyType;
          const validationObject = {
            state,
            status,
            price,
            manufacturer,
            model,
            bodyType
          };

          const _Validation$newCarVal = _Validation.default.newCarValidation(validationObject),
                error = _Validation$newCarVal.error;

          if (error) {
            res.status(400).json({
              status: 400,
              error: "Issue with parameters supplied. Problem ".concat(error),
              success: false
            });
          } else {
            // Upload to cloudinary
            const imageFileName = req.files.carImage.path;
            const file = await cloudinary.uploader.upload(imageFileName, {
              resource_type: 'auto'
            });

            const newCarDetails = _objectSpread({}, validationObject, {
              ownerId: req.user.id,
              ownerEmail: req.user.email,
              imageUrl: file.url
            }); // Create new car


            const createdCar = await _Car.default.createCar(newCarDetails);
            (0, _Response.default)(res, 201, createdCar); // Delete temporary image file

            _fs.default.unlink(imageFileName, er => {
              if (er) throw er;
              console.log('Image File Deleted');
            });
          }
        } else {
          (0, _Response.default)(res, 400, 'Image expected to be named carImage');
        }
      } else {
        const _req$body2 = req.body,
              state = _req$body2.state,
              status = _req$body2.status,
              price = _req$body2.price,
              manufacturer = _req$body2.manufacturer,
              model = _req$body2.model,
              bodyType = _req$body2.bodyType;
        const validationObject = {
          state,
          status,
          price,
          manufacturer,
          model,
          bodyType
        };

        const _Validation$newCarVal2 = _Validation.default.newCarValidation(validationObject),
              error = _Validation$newCarVal2.error;

        if (error) {
          res.status(400).json({
            status: 400,
            error: "Issue with parameters supplied. Problem ".concat(error),
            success: false
          });
        } else {
          const newCarDetails = _objectSpread({}, validationObject, {
            ownerId: req.user.id,
            ownerEmail: req.user.email
          }); // Create new car


          const createdCar = await _Car.default.createCar(newCarDetails);
          res.status(201).json({
            status: 201,
            data: createdCar,
            sucess: true
          });
        }
      }
    } catch (error) {
      (0, _Response.default)(res, 500, error);
    }
  }

  static async updateStatus(req, res) {
    try {
      const status = req.body.status;
      const carId = Number(req.params.carId);
      const validationObject = {
        status,
        carId
      };

      const _Validation$carStatus = _Validation.default.carStatusUpdate(validationObject),
            error = _Validation$carStatus.error;

      if (error) {
        (0, _Response.default)(res, 400, error);
      } else {
        // Check if the car id exists
        const carAd = await _Car.default.findOne(carId);

        if (carAd) {
          // Check if the owner of the ad is the one updating the ad
          if (carAd.owner === req.user.id) {
            const updatedCar = await _Car.default.updateStatus(carId, 'sold');
            (0, _Response.default)(res, 200, updatedCar);
          } else {
            (0, _Response.default)(res, 401, 'You do not own this Ad');
          }
        } else {
          (0, _Response.default)(res, 400, 'The Car Ad Doesnt Exist');
        }
      }
    } catch (error) {
      (0, _Response.default)(res, 500, error);
    }
  }

  static async updatePrice(req, res) {
    try {
      const price = req.body.price;
      const carId = Number(req.params.carId);
      const validationObject = {
        price,
        carId
      };

      const _Validation$carPriceU = _Validation.default.carPriceUpdate(validationObject),
            error = _Validation$carPriceU.error;

      if (error) {
        (0, _Response.default)(res, 400, error);
      } else {
        // Check if the car id exists
        const carAd = await _Car.default.findOne(carId);

        if (carAd) {
          // Check if the owner of the ad is the one updating the ad
          if (carAd.owner === req.user.id) {
            const updatedCar = await _Car.default.updatePrice(carId, price);
            (0, _Response.default)(res, 200, updatedCar);
          } else {
            (0, _Response.default)(res, 401, 'You do not own this Ad');
          }
        } else {
          (0, _Response.default)(res, 400, 'The Car Ad Doesnt Exist');
        }
      }
    } catch (error) {
      (0, _Response.default)(res, 500, error);
    }
  }

  static async viewSpecificCar(req, res) {
    try {
      const carId = Number(req.params.carId);
      const validationObject = {
        carId
      };

      const _Validation$viewSpeci = _Validation.default.viewSpecificCar(validationObject),
            error = _Validation$viewSpeci.error;

      if (error) {
        (0, _Response.default)(res, 400, error);
      } else {
        // Check if the car exists
        const carAd = await _Car.default.findOne(carId);

        if (carAd) {
          (0, _Response.default)(res, 200, carAd);
        } else {
          (0, _Response.default)(res, 400, 'The Car Ad does not exist');
        }
      }
    } catch (error) {
      (0, _Response.default)(res, 500, error);
    }
  }

  static async viewCars(req, res) {
    try {
      // Determine if there is a query object has any properties
      const queryStatus = req.query.hasOwnProperty('status');
      const queryMinPrice = req.query.hasOwnProperty('min_price');
      const queryMaxPrice = req.query.hasOwnProperty('max_price'); // When all three query properties are present

      if (queryStatus && queryMinPrice && queryMaxPrice) {
        // Run validation
        const status = req.query.status;
        const minPrice = Number(req.query.min_price);
        const maxPrice = Number(req.query.max_price);

        const _Validation$viewCars = _Validation.default.viewCars({
          status,
          minPrice,
          maxPrice
        }),
              error = _Validation$viewCars.error;

        if (error) {
          (0, _Response.default)(res, 400, error);
        } else {
          const cars = await _Car.default.findAllAvailableRange(minPrice, maxPrice);
          (0, _Response.default)(res, 200, cars);
        }
      } else if (queryStatus && !queryMinPrice && !queryMaxPrice) {
        const status = req.query.status;

        const _Validation$viewCars2 = _Validation.default.viewCars({
          status
        }),
              error = _Validation$viewCars2.error;

        if (error) {
          (0, _Response.default)(res, 400, error);
        } else {
          const cars = await _Car.default.findAllAvailable();
          (0, _Response.default)(res, 200, cars);
        }
      } else {
        // Only admins can view this
        const isAdmin = await _User.default.isAdmin(req.user.id);

        if (isAdmin) {
          const cars = await _Car.default.findAll();
          (0, _Response.default)(res, 200, cars);
        } else {
          (0, _Response.default)(res, 401, 'You are not an Admin');
        }
      }
    } catch (error) {
      (0, _Response.default)(res, 500, error);
    }
  }

  static async deleteCar(req, res) {
    try {
      const carId = Number(req.params.carId);

      const _Validation$deleteCar = _Validation.default.deleteCar({
        carId
      }),
            error = _Validation$deleteCar.error;

      if (error) {
        (0, _Response.default)(res, 400, error);
      } else {
        // Check if the Ad exists
        const carAd = await _Car.default.findOne(carId);

        if (carAd) {
          await _Car.default.deleteCar(carAd);
          (0, _Response.default)(res, 200, 'Car Ad successfully deleted');
        } else {
          (0, _Response.default)(res, 400, 'The Car Ad Doesnt Exist');
        }
      }
    } catch (error) {
      (0, _Response.default)(res, 500, error);
    }
  }

}

var _default = CarController;
exports.default = _default;