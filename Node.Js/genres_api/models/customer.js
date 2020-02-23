const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model(
  'Customer',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 30
    },
    phoneNumber: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 30
    },
    isGold: {
      type: Boolean,
      default: false
    }
  })
);

function inputValidator(customer) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(30)
      .required(),
    phoneNumber: Joi.string()
      .min(5)
      .max(30)
      .required(),
    isGold: Joi.boolean()
  };
  return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = inputValidator;
