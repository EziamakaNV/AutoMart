/* eslint-disable linebreak-style */
import Validation from '../validations/Validation';

import CarModel from '../models/Car';

import response from '../responses/Response';

class CarController {
  static createCar(req, res) {
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
      const createdCar = CarModel.createCar(newCarDetails);
      res.status(201).json({ status: 201, data: createdCar, sucess: true });
    }
  }

  static updateStatus(req, res) {
    const { status } = req.body;
    const carId = Number(req.params.carId);

    const validationObject = { status, carId };
    const { error } = Validation.carStatusUpdate(validationObject);

    if (error) {
      response(res, 400, error);
    } else {
      // Check if the car id exists
      const carAd = CarModel.findOne(carId);
      if (carAd) {
        // Check if the owner of the ad is the one updating the ad
        if (carAd.owner === req.user.id) {
          const updatedCar = CarModel.updateStatus(carId, 'sold');
          response(res, 200, updatedCar);
        } else {
          response(res, 401, 'You do not own this Ad');
        }
      } else {
        response(res, 400, 'The Car Ad Doesnt Exist');
      }
    }
  }
}

export default CarController;
