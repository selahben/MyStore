const mongoose = require("mongoose");
const Joi = require("joi");
const _ = require("lodash");

const productsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
    },
    description: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 1024,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    unit: {
      type: String,
      required: true,
      enum: ["KG", "Units"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    image: {
      url: {
        type: String,
        default:
          "https://cdn.pixabay.com/photo/2016/03/23/19/38/shopping-carts-1275480_1280.jpg",
        minlength: 11,
        maxlength: 1024,
      },
      alt: {
        type: String,
        minlength: 2,
        maxlength: 255,
        default: "shopping carts",
      },
    },
    sn: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 999_999_999,
      unique: true,
    },
    nutritionVals: {
      type: String,
      minlength: 0,
      maxlength: 1024,
      default: "",
    },
    ingredients: {
      type: String,
      minlength: 0,
      maxlength: 1024,
      default: "",
    },
    tags: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productsSchema, "products");

function validateProduct(product) {
  const schema = Joi.object({
    name: Joi.string()
      .min(2)
      .max(255)
      .required()
      .pattern(/^[A-Za-z][A-Za-z ]*$/),
    description: Joi.string().min(2).max(1024).required(),
    image: Joi.object({
      url: Joi.string().min(11).max(1024),
      alt: Joi.string().min(2).max(255),
    }),
    price: Joi.number().min(0).required(),
    unit: Joi.string().required().valid("KG", "Units"),
    sn: Joi.string().min(3).max(999999999).required(),
    nutritionVals: Joi.string().min(0).max(1024).allow(null, "").optional(),
    ingredients: Joi.string().min(0).max(1024).allow(null, "").optional(),
    tags: Joi.string()
      .pattern(/^[A-Za-z][A-Za-z ,]*$/)
      .optional(),
    category: Joi.any().required(),
  });

  return schema.validate(product);
}

module.exports = { Product, validateProduct };
