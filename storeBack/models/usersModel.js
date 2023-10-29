const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
    },
    phone: {
      type: String,
      minlength: 10,
      maxlength: 12,
    },
    email: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 255,
      unique: true,
    },
    password: {
      type: String,
      minlength: 8,
      maxlength: 1024,
    },
    image: {
      url: {
        type: String,
        default:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        minlength: 11,
        maxlength: 1024,
      },
      alt: {
        type: String,
        minlength: 6,
        maxlength: 255,
        default: "User Image",
      },
    },
    imageFile: {
      type: String,
    },
    address: {
      state: {
        type: String,
        minlength: 0,
        maxlength: 255,
        default: "",
      },
      country: {
        type: String,
        minlength: 0,
        maxlength: 255,
        default: "",
      },
      city: {
        type: String,
        minlength: 0,
        maxlength: 255,
        default: "",
      },
      street: {
        type: String,
        minlength: 0,
        maxlength: 255,
        default: "",
      },
      houseNumber: {
        type: String,
        minlength: 0,
        maxlength: 10,
        default: "",
      },
      zip: {
        type: String,
        minlength: 0,
        maxlength: 12,
        default: "",
      },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        amount: {
          type: Number,
          min: 0,
        },
      },
    ],
  },
  { timestamps: true }
);

usersSchema.methods.generateAuthToken = function (exp = null) {
  return jwt.sign(
    {
      _id: this._id,
      isAdmin: this.isAdmin,
    },
    config.get("auth.JWT_SECRET"),
    exp && {
      expiresIn: exp,
    }
  );
};

const User = mongoose.model("User", usersSchema, "users");

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    phone: Joi.string()
      .min(10)
      .max(12)
      .pattern(/^\+?\d{3}\d{8,9}$/)
      .optional(),
    email: Joi.string().min(6).max(255).required().email({ tlds: false }),
    password: Joi.string()
      .min(8)
      .max(1024)
      .optional()
      .pattern(
        /^(?=(?:[^A-Z]*[A-Z]))(?=(?:[^a-z]*[a-z]))(?=(?:[^!@#$%^&*]*[!@#$%^&*]))(?=(?:\D*\d){4}).{8,}$/
      )
      .allow(null, ""),
    image: Joi.object({
      url: Joi.string().min(11).max(1024),
      alt: Joi.string().min(6).max(255),
    }).messages({
      "string.empty": `Password field cannot be empty..`,
      "string.min": `Password field should have a minimum length of {#limit}..`,
      "any.required": `Password field is a required..`,
      "string.pattern.base":
        "Password must be,at least, 8 characters long and contain: 1 uppercase letter, 1 lowercase letter, at least 4 digits and 1 special character (!@#$%^&*).",
    }),
    address: Joi.object({
      state: Joi.string().optional().allow(null, ""),
      country: Joi.string().optional().min(3).max(255).allow(null, ""),
      city: Joi.string().optional().min(6).max(255).allow(null, ""),
      street: Joi.string().optional().min(3).max(255).allow(null, ""),
      houseNumber: Joi.string().optional().min(1).max(10).allow(null, ""),
      zip: Joi.string().min(0).optional().max(12).allow(null, ""),
    }).optional(),
  });

  return schema.validate(user);
}

module.exports = { User, validateUser };
