import express from 'express';

import OrderController from '../controllers/Order';

import Authentication from '../middleware/Authentication';

const router = express.Router();

router.post('/', Authentication.verifyToken, OrderController.createOrder);

export default router;