/* eslint-disable linebreak-style */
import Validation from '../../validations/Validation';

import OrderModel from '../../models/usingDb/Order';

import CarModel from '../../models/usingDb/Car';
import response from '../../responses/Response';

class OrderController {
  static async createOrder(req, res) {
    try {
      const orderDetails = {
        car_id: req.body.car_id,
        amount: req.body.amount,
      };
  
      const { error } = Validation.newOrderValidation(orderDetails);
  
      if (error) {
        res.status(400).json({ status: 400, error: `Issue with parameters supplies. Problem: ${error}` });
      } else {
        // Get car details
        const carAd = await CarModel.findOne(orderDetails.car_id);
        if (!carAd) {
          res.status(404).json({ status: 404, error: 'Car/Ad does not exist' });
        } else {
          // Ensure one cant place more than one order on a car ad
          const previousOrderExists = await OrderModel.previousOrderExists(carAd.id, req.user.id);
          if (previousOrderExists) {
            res.status(400).json({ status: 400, error: 'You already have an order pending for this ad', success: false });
          } else {
            // Create order
            const newOrder = {
              buyer: req.user.id,
              car_id: carAd.id,
              amount: orderDetails.amount,
            };
            const createdOrder = await OrderModel.createOrder(newOrder);
            res.status(201).json({
              status: 201,
              data: {
                ...createdOrder,
                price: carAd.price,
                price_offered: orderDetails.price,
                token: req.token,
              },
            });
          }
        }
      }
    } catch (error) {
      response(res, 500, error);
    }
  }

  static async updateOrder(req, res) {
    try {
      const orderId = Number(req.params.orderId);
      const { price } = req.body;
      const { error } = Validation.orderUpdate({ orderId, price });
      if (error) {
        res.status(400).json({ status: 400, error: `${error}`, success: false });
      } else {
      // Check if the order exists
        const initialOrder = await OrderModel.findOne(orderId);
        if (initialOrder) {
          // Had to assign seprately because of object assignment by reference
          const initialOrderAmount = initialOrder.amount;
          // Check if the owner if the order is the same person updating it
          if (initialOrder.buyer === req.user.id) {
          // Check if the status of the order is still pending
            if (initialOrder.status === 'pending') {
              const updatedOrder = await OrderModel.update(orderId, price);
              res.status(200).json({
                status: 200,
                data: {
                  id: updatedOrder.id,
                  car_id: updatedOrder.car_id,
                  status: updatedOrder.status,
                  old_price_offered: initialOrderAmount,
                  new_price_offered: updatedOrder.amount,
                  token: req.token,
                },
              });
            } else {
              res.status(400).json({ status: 400, error: 'This order is no longer pending', success: true });
            }
          } else {
            res.status(400).json({ status: 400, error: 'You do not own this order', success: false });
          }
        } else {
          res.status(400).json({ status: 400, error: 'Order does not exist', success: false });
        }
      }
    } catch (error) {
      response(res, 500, error);
    }
  }

  static async getMyOrders(req, res) {
    try {
      const myOrders = await OrderModel.findMyOrders(req.user.id);
      if (myOrders) {
        response(res, 200, myOrders);
      } else {
        response(res, 404, 'No Orders found for the user');
      }
    } catch (error) {
      response(res, 500, error);
    }
  }

  static async getParticularOrder(req, res) {
    const { orderId } = req.params;
    const { error } = Validation.getParticualrOrder({ orderId });
    if (error) {
      response(res, 400, error);
    } else {
      try {
        const order = await OrderModel.getOrder(req.user.id, orderId);
        if (order) {
          response(res, 200, { token: req.token, ...order });
        } else {
          response(res, 404, 'Order not found');
        }
      } catch (err) {
        response(res, 500, err);
      }
    }
  }
}

export default OrderController;
