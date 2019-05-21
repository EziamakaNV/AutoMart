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
}

export default Validation;
