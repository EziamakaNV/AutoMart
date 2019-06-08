/* eslint-disable linebreak-style */
import Validation from '../validations/Validation';

import FlagModel from '../models/Flag';

import CarModel from '../models/Car';

class FlagController {
  static createFlag(req, res) {
    const flagDetails = {
      carId: req.body.carId,
      reason: req.body.reason,
      description: req.body.description,
    };

    const { error } = Validation.newFlagValidation(flagDetails);

    if (error) {
      res.status(400).json({ status: 400, error: `Issue with parameters supplies. Problem: ${error}` });
    } else {
      // Get car details
      const carAd = CarModel.findOne(flagDetails.carId);
      if (!carAd) {
        res.status(404).json({ status: 404, error: 'Car/Ad does not exist' });
      } else {
        // Ensure one cant flag a car ad more than once
        const previousFlagExists = FlagModel.previousFlagExists(carAd.id, req.user.id);
        if (previousFlagExists) {
          res.status(401).json({ status: 401, error: 'You have already flagged this ad', success: false });
        } else {
          // Create flag
          const newFlag = {
            owner: req.user.id,
            carId: carAd.id,
            reason: flagDetails.reason,
            description: flagDetails.description,
          };
          const createdFlag = FlagModel.createFlag(newFlag);
          res.status(201).json({
            status: 201,
            data: { ...createdFlag },
          });
        }
      }
    }
  }
}

export default FlagController;
