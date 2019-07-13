/* eslint-disable linebreak-style */
import Validation from '../../validations/Validation';

import FlagModel from '../../models/usingDb/Flag';

import CarModel from '../../models/usingDb/Car';

import response from '../../responses/Response';

class FlagController {
  static async createFlag(req, res) {
    try {
      const flagDetails = {
        car_id: req.body.car_id,
        reason: req.body.reason,
        description: req.body.description,
      };

      const { error } = Validation.newFlagValidation(flagDetails);

      if (error) {
        res.status(400).json({ status: 400, error: `Issue with parameters supplies. Problem: ${error}` });
      } else {
        // Get car details
        const carAd = await CarModel.findOne(flagDetails.car_id);
        if (!carAd) {
          res.status(404).json({ status: 404, error: 'Car/Ad does not exist' });
        } else {
          // Ensure one cant flag a car ad more than once
          const previousFlagExists = await FlagModel.previousFlagExists(carAd.id, req.user.id);
          if (previousFlagExists) {
            res.status(401).json({ status: 401, error: 'You have already flagged this ad', success: false });
          } else {
            // Create flag
            const newFlag = {
              owner: req.user.id,
              car_id: carAd.id,
              reason: flagDetails.reason,
              description: flagDetails.description,
            };
            const createdFlag = await FlagModel.createFlag(newFlag);
            res.status(201).json({
              status: 201,
              data: { ...createdFlag, token: req.token },
            });
          }
        }
      }
    } catch (error) {
      response(res, 500, error);
    }
  }
}

export default FlagController;
