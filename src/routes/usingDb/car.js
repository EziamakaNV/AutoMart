/* eslint-disable linebreak-style */
import express from 'express';

import Authentication from '../../middleware/Authentication';

import CarController from '../../controllers/usingDb/Car';

// Multipart middleware to parse file uploads
const multipart = require('connect-multiparty');

const multipartMiddleware = multipart({ uploadDir: './tempImages' }); // Folder to store temp image files n.b delete later

const router = express.Router();

router.post('/', Authentication.verifyToken, multipartMiddleware, CarController.createCar);

router.patch('/:carId/status', Authentication.verifyToken, CarController.updateStatus);

router.patch('/:carId/price', Authentication.verifyToken, CarController.updatePrice);

router.get('/:carId', Authentication.verifyToken, CarController.viewSpecificCar);

router.get('/', Authentication.verifyToken, CarController.viewCars);

router.delete('/:carId', Authentication.adminVerifyToken, CarController.deleteCar);

export default router;
