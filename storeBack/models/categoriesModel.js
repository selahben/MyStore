const mongoose = require("mongoose");
const Joi = require("joi");

const categoriesSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
    unique: true,
  },
  main: {
    type: Boolean,
    default: false,
  },
});

const Category = mongoose.model("Category", categoriesSchema, "categories");

function validateCategory(category) {
  const schema = Joi.object({
    className: Joi.string()
      .pattern(/^[a-zA-Z]+$/)
      .min(2)
      .max(255)
      .required(),
    title: Joi.string()
      .pattern(/^[A-Za-z][A-Za-z ]*$/)
      .min(2)
      .max(255)
      .required(),
  });

  return schema.validate(category);
}

module.exports = { Category, validateCategory };
