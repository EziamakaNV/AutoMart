/* eslint-disable linebreak-style */
import Validation from '../validations/Validation';

import OrderModel from '../models/Order';

import CarModel from '../models/Car';

class OrderController {
  static createOrder(req, res) {
    const orderDetails = {
      carId: req.body.carId,
      amount: req.body.amount,
    };

    const { error } = Validation.newOrderValidation(orderDetails);

    if (error) {
      res.status(400).json({ status: 400, error: `Issue with parameters supplies. Problem: ${error}` });
    } else {
      // Get car details
      const carAd = CarModel.findOne(orderDetails.carId);
      if (!carAd) {
        res.status(404).json({ status: 404, error: 'Car/Ad does not exist' });
      } else {
        // Create order model
        const newOrder = {
          buyer: carAd.owner,
          carId: carAd.id,
          amount: orderDetails.amount,
        };
        const createdOrder = OrderModel.createOrder(newOrder);
        res.status(201).json({
          status: 201,
          data: {
            ...createdOrder,
            carId: carAd.id,
            price: carAd.price,
            priceOffered: orderDetails.amount,
          },
        });
      }
    }
  }
}

export default OrderController;
