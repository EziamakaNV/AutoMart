import express from 'express';

import Authentication from '../middleware/Authentication';

import CarController from '../controllers/Car';

const router = express.Router();

router.post('/', Authentication.verifyToken, CarController.createCar);

export default router;