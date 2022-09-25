const Joi = require('joi');

export const createCarBookingRequestValidationSchema = Joi.object({
  userId: Joi.string().required(),
  carId: Joi.string().required(),
  paymentTransactionId: Joi.string(),
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().greater(Joi.ref('startDate')).required(),
});

export const createOfficeBookingRequestValidationSchema = Joi.object({
  userId: Joi.string().required(),
  officeId: Joi.string().required(),
  paymentTransactionId: Joi.string(),
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().greater(Joi.ref('startDate')).required(),
});

export const getBookingRequestValidationSchema = Joi.object({
  userId: Joi.string().required(),
});
