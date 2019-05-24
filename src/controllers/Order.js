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
        // Ensure one cant place more than one order on a car ad
        const previousOrderExists = OrderModel.previousOrderExists(carAd.id, req.user.id);
        console.log(`userId: ${req.user.id}`);
        if (previousOrderExists) {
          res.status(401).json({ status: 401, error: 'You already have an order pending for this ad', success: false });
          console.log(10);
        } else {
          // Create order
          console.log(1);
          const newOrder = {
            buyer: req.user.id,
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

  static updateOrder(req, res) {
    const orderId = Number(req.params.orderId);
    const { amount } = req.body;
    const { error } = Validation.orderUpdate({ orderId, amount });
    if (error) {
      res.status(400).json({ status: 400, error: `${error}`, success: false });
    } else {
      // Check if the order exists
      const initialOrder = OrderModel.findOne(orderId);
      if (initialOrder) {
        // Check if the owner if the order is the same person updating it
        if (initialOrder.buyer === req.user.id) {
          // Check if the status of the order is still pending
          if (initialOrder.status === 'pending') {
            const updatedOrder = OrderModel.update(orderId, amount);
            res.status(200).json({
              status: 200,
              data: {
                id: updatedOrder.id,
                carId: updatedOrder.carId,
                status: updatedOrder.status,
                oldPriceOffered: initialOrder.amount,
                newPriceOffered: updatedOrder.amount,
              },
            });
          } else {
            res.status(401).json({ status: 401, error: 'This order is no longer pending', success: true });
          }
        } else {
          res.status(401).json({ status: 401, error: 'You do not own this order', success: false });
        }
      } else {
        res.status(400).json({ status: 400, error: 'Order does not exist', success: false });
      }
    }
  }
}

export default OrderController;
