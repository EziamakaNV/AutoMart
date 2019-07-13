/* eslint-disable linebreak-style */
import express from 'express';

import Authentication from '../../middleware/usingDb/Authentication';

import CarController from '../../controllers/usingDb/Car';

// Multipart middleware to parse file uploads
const multipart = require('connect-multiparty');

const multipartMiddleware = multipart({ uploadDir: './tempImages' }); // Folder to store temp image files n.b delete later

const router = express.Router();

router.post('/', Authentication.verifyToken, multipartMiddleware, CarController.createCar);

router.patch('/:car_id/status', Authentication.verifyToken, CarController.updateStatus);

router.patch('/:car_id/price', Authentication.verifyToken, CarController.updatePrice);

router.get('/myCar', Authentication.verifyToken, CarController.viewMyCars);

router.get('/:car_id', Authentication.verifyToken, CarController.viewSpecificCar);

router.get('/', Authentication.verifyToken, CarController.viewCars);

router.delete('/:car_id', Authentication.verifyToken, CarController.deleteCar);

export default router;
