/* eslint-disable linebreak-style */
import Validation from '../validations/Validation';

import CarModel from '../models/Car';

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
}

export default CarController;
