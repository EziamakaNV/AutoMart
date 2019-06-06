/* eslint-disable linebreak-style */
import cloudinaryModule from 'cloudinary';

import fs from 'fs';

import Validation from '../../validations/Validation';

import CarModel from '../../models/usingDb/Car';

import response from '../../responses/Response';

import UserModel from '../../models/usingDb/User';

// Cloudinary
require('dotenv').config();

const cloudinary = cloudinaryModule.v2;

class CarController {
  static async createCar(req, res) {
    try {
      // If the car image is present
      if (req.files) {
      // The image is properly added to the form
        if (req.files.carImage) {
          const {
            state,
            status,
            price,
            manufacturer,
            model,
            bodyType,
          } = req.body;
          const validationObject = {
            state,
            status,
            price,
            manufacturer,
            model,
            bodyType,
          };

          const { error } = Validation.newCarValidation(validationObject);
          if (error) {
            res.status(400).json({ status: 400, error: `Issue with parameters supplied. Problem ${error}`, success: false });
          } else {
            // Upload to cloudinary
            const imageFileName = req.files.carImage.path;
            const file = await cloudinary.uploader.upload(imageFileName, { resource_type: 'auto' });
            const newCarDetails = {
              ...validationObject,
              ownerId: req.user.id,
              ownerEmail: req.user.email,
              imageUrl: file.url,
            };
            // Create new car
            const createdCar = await CarModel.createCar(newCarDetails);
            response(res, 201, createdCar);
            // Delete temporary image file
            fs.unlink(imageFileName, (er) => {
              if (er) throw er;
              console.log('Image File Deleted');
            });
          }
        } else {
          response(res, 400, 'Image expected to be named carImage');
        }
      } else {
        const {
          state,
          status,
          price,
          manufacturer,
          model,
          bodyType,
        } = req.body;
        const validationObject = {
          state,
          status,
          price,
          manufacturer,
          model,
          bodyType,
        };

        const { error } = Validation.newCarValidation(validationObject);
        if (error) {
          res.status(400).json({ status: 400, error: `Issue with parameters supplied. Problem ${error}`, success: false });
        } else {
          const newCarDetails = { ...validationObject, ownerId: req.user.id, ownerEmail: req.user.email };
          // Create new car
          const createdCar = await CarModel.createCar(newCarDetails);
          res.status(201).json({ status: 201, data: createdCar, sucess: true });
        }
      }
    } catch (error) {
      response(res, 500, error);
    }
  }

  static async updateStatus(req, res) {
    try {
      const { status } = req.body;
      const carId = Number(req.params.carId);

      const validationObject = { status, carId };
      const { error } = Validation.carStatusUpdate(validationObject);

      if (error) {
        response(res, 400, error);
      } else {
      // Check if the car id exists
        const carAd = await CarModel.findOne(carId);
        if (carAd) {
        // Check if the owner of the ad is the one updating the ad
          if (carAd.owner === req.user.id) {
            const updatedCar = await CarModel.updateStatus(carId, 'sold');
            response(res, 200, updatedCar);
          } else {
            response(res, 401, 'You do not own this Ad');
          }
        } else {
          response(res, 400, 'The Car Ad Doesnt Exist');
        }
      }
    } catch (error) {
      response(res, 500, error);
    }
  }

  static async updatePrice(req, res) {
    try {
      const { price } = req.body;
      const carId = Number(req.params.carId);

      const validationObject = { price, carId };
      const { error } = Validation.carPriceUpdate(validationObject);

      if (error) {
        response(res, 400, error);
      } else {
      // Check if the car id exists
        const carAd = await CarModel.findOne(carId);
        if (carAd) {
        // Check if the owner of the ad is the one updating the ad
          if (carAd.owner === req.user.id) {
            const updatedCar = await CarModel.updatePrice(carId, price);
            response(res, 200, updatedCar);
          } else {
            response(res, 401, 'You do not own this Ad');
          }
        } else {
          response(res, 400, 'The Car Ad Doesnt Exist');
        }
      }
    } catch (error) {
      response(res, 500, error);
    }
  }

  static async viewSpecificCar(req, res) {
    try {
      const carId = Number(req.params.carId);
      const validationObject = { carId };
      const { error } = Validation.viewSpecificCar(validationObject);

      if (error) {
        response(res, 400, error);
      } else {
      // Check if the car exists
        const carAd = await CarModel.findOne(carId);
        if (carAd) {
          response(res, 200, carAd);
        } else {
          response(res, 400, 'The Car Ad does not exist');
        }
      }
    } catch (error) {
      response(res, 500, error);
    }
  }

  static async viewCars(req, res) {
    try {
      // Determine if there is a query object has any properties
      const queryStatus = req.query.hasOwnProperty('status');
      const queryMinPrice = req.query.hasOwnProperty('min_price');
      const queryMaxPrice = req.query.hasOwnProperty('max_price');

      // When all three query properties are present
      if (queryStatus && queryMinPrice && queryMaxPrice) {
      // Run validation
        const { status } = req.query;
        const minPrice = Number(req.query.min_price);
        const maxPrice = Number(req.query.max_price);
        const { error } = Validation.viewCars({ status, minPrice, maxPrice });

        if (error) {
          response(res, 400, error);
        } else {
          const cars = await CarModel.findAllAvailableRange(minPrice, maxPrice);
          response(res, 200, cars);
        }
      } else if (queryStatus && !queryMinPrice && !queryMaxPrice) {
        const { status } = req.query;
        const { error } = Validation.viewCars({ status });
        if (error) {
          response(res, 400, error);
        } else {
          const cars = await CarModel.findAllAvailable();
          response(res, 200, cars);
        }
      } else {
      // Only admins can view this
        const isAdmin = await UserModel.isAdmin(req.user.id);
        if (isAdmin) {
          const cars = await CarModel.findAll();
          response(res, 200, cars);
        } else {
          response(res, 401, 'You are not an Admin');
        }
      }
    } catch (error) {
      response(res, 500, error);
    }
  }

  static async deleteCar(req, res) {
    try {
      const carId = Number(req.params.carId);
      const { error } = Validation.deleteCar({ carId });

      if (error) {
        response(res, 400, error);
      } else {
      // Check if the Ad exists
        const carAd = await CarModel.findOne(carId);
        if (carAd) {
          await CarModel.deleteCar(carAd);
          response(res, 200, 'Car Ad successfully deleted');
        } else {
          response(res, 400, 'The Car Ad Doesnt Exist');
        }
      }
    } catch (error) {
      response(res, 500, error);
    }
  }
}

export default CarController;
