const mongoose = require('mongoose');
const Joi = require('joi');

const Genre = mongoose.model(
  'Genre',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 30
    }
  })
);

function inputValidator(genre) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(20)
      .required()
  };
  return Joi.validate(genre, schema);
}

exports.Genre = Genre;
exports.validate = inputValidator;
