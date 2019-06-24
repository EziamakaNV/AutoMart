import express from 'express';

import OrderController from '../../controllers/usingDb/Order';

import Authentication from '../../middleware/usingDb/Authentication';

const router = express.Router();

router.post('/', Authentication.verifyToken, OrderController.createOrder);

router.patch('/:orderId/price', Authentication.verifyToken, OrderController.updateOrder);

router.get('/myOrder/:orderId', Authentication.verifyToken, OrderController.getParticularOrder);

router.get('/myOrder', Authentication.verifyToken, OrderController.getMyOrders);

export default router;