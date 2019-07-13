/* eslint-disable linebreak-style */
import Joi from '@hapi/joi';

class Validation {
  static signUpValidation(validationObject) {
    const schema = {
      first_name: Joi.string().min(3).max(15).required(),
      last_name: Joi.string().min(3).max(15).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(20).required(),
      address: Joi.string().min(15).max(50).required(),
    };
    return Joi.validate(validationObject, schema);
  }

  static loginValidation(validationObject) {
    const schema = {
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(20).required(),
    };
    return Joi.validate(validationObject, schema);
  }

  static newCarValidation(validationObject) {
    const schema = {
      state: Joi.string().valid('new', 'used').required(),
      status: Joi.string().valid('available').required(),
      price: Joi.number().integer().min(1).max(999999999999).required(),
      manufacturer: Joi.string().min(3).max(50).required(),
      model: Joi.string().min(3).max(50).required(),
      body_type: Joi.string().min(3).max(15).required(),
    };
    return Joi.validate(validationObject, schema);
  }

  static newOrderValidation(validationObject) {
    const schema = {
      car_id: Joi.number().integer().required(),
      price: Joi.number().integer().min(1).max(999999999999).required(),
    };
    return Joi.validate(validationObject, schema);
  }

  static orderUpdate(validationObject) {
    const schema = {
      orderId: Joi.number().integer().required(),
      price: Joi.number().integer().min(1).max(999999999999).required(),
    };
    return Joi.validate(validationObject, schema);
  }

  static carStatusUpdate(validationObject) {
    const schema = {
      status: Joi.string().valid('sold'),
      car_id: Joi.number().integer().required(),
    };
    return Joi.validate(validationObject, schema);
  }

  static carPriceUpdate(validationObject) {
    const schema = {
      price: Joi.number().integer().min(1).max(999999999999).required(),
      car_id: Joi.number().integer().required(),
    };
    return Joi.validate(validationObject, schema);
  }

  static viewSpecificCar(validationObject) {
    const schema = {
      car_id: Joi.number().integer().required(),
    };
    return Joi.validate(validationObject, schema);
  }

  static viewCars(validationObject) {
    const schema = {
      status: Joi.string().valid('available'),
      minPrice: Joi.number().integer().min(1).max(999999999999),
      maxPrice: Joi.number().integer().min(1).max(999999999999),
    };
    return Joi.validate(validationObject, schema);
  }

  static deleteCar(validationObject) {
    const schema = {
      car_id: Joi.number().integer().required(),
    };
    return Joi.validate(validationObject, schema);
  }

  static newFlagValidation(validationObject) {
    const schema = {
      car_id: Joi.number().integer().required(),
      reason: Joi.string().valid('offensive content', 'fraud', 'duplicate ad', 'other').required(),
      description: Joi.string().required(),
    };
    return Joi.validate(validationObject, schema);
  }

  static getParticualrOrder(validationObject) {
    const schema = {
      orderId: Joi.number().integer().required(),
    };
    return Joi.validate(validationObject, schema);
  }
}

export default Validation;
