const Joi = require('joi');

export const addUserRequestValidationSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().required().min(4),
  phone: Joi.string().required().min(10).max(12),
  name: Joi.string().required().min(4),
});

export const updateUserRequestValidationSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }),
  password: Joi.string().min(4),
  phone: Joi.string().min(10).max(12),
  name: Joi.string().min(4),
});
