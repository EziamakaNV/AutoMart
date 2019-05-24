/* eslint-disable linebreak-style */
import Joi from '@hapi/joi';

class Validation {
  static signUpValidation(validationObject) {
    const schema = {
      firstName: Joi.string().min(3).max(15).required(),
      lastName: Joi.string().min(3).max(15).required(),
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
      bodyType: Joi.string().min(3).max(15).required(),
    };
    return Joi.validate(validationObject, schema);
  }

  static newOrderValidation(validationObject) {
    const schema = {
      carId: Joi.number().integer().required(),
      amount: Joi.number().integer().min(1).max(999999999999).required(),
    };
    return Joi.validate(validationObject, schema);
  }

  static orderUpdate(validationObject) {
    const schema = {
      orderId: Joi.number().integer().required(),
      amount: Joi.number().integer().min(1).max(999999999999).required(),
    };
    return Joi.validate(validationObject, schema);
  }
}

export default Validation;
