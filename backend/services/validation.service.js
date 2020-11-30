const Joi = require('joi');

class Validation {
  static registrationValidation(body) {
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      email: Joi.string().min(3).required().email(),
      password: Joi.string().min(6).required(),
    });
    return schema.validate(body);
  }

  static loginValidation(body) {
    const schema = Joi.object({
      email: Joi.string().min(3).required().email(),
      password: Joi.string().min(6).required(),
    });
    return schema.validate(body);
  }

  static noteDescription(body) {
    const schema = Joi.object({
      description: Joi.string().min(5).required(),
    });
    return schema.validate(body);
  }
}

module.exports = Validation;
