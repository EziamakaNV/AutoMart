import express from 'express';

import Authentication from '../middleware/Authentication';

import CarController from '../controllers/Car';

const router = express.Router();

router.post('/', Authentication.verifyToken, CarController.createCar);

router.patch('/:carId/status', Authentication.verifyToken, CarController.updateStatus);

router.patch('/:carId/price', Authentication.verifyToken, CarController.updatePrice);

router.get('/:carId', Authentication.verifyToken, CarController.viewSpecificCar);

router.get('/', Authentication.verifyToken, CarController.viewCars);

export default router;