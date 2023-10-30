const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const Joi = require("joi");
// const jwt = require("jsonwebtoken");
const config = require("config");

const { User, validateUser } = require("../models/usersModel");
const authMW = require("../middleware/authMW");
const myMailer = require("../utils/myMailer");

const {
  addToTries,
  getLoginStatus,
  blockLogin,
  loginMW,
  removeBlocked,
} = require("../middleware/logInMW");

const { upload, validateImage } = require("../middleware/filesMW"); // Import the middleware

//Routes//
//Create User/Sign up
usersRouter.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    res.statusMessage = error.details[0].message;
    res.status(400).json(error.details[0].message);
    return;
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    res.statusMessage = "User already registered";
    res.status(400).send("User already registered");
    return;
  }

  user = new User(req.body);
  user.password = await bcrypt.hash(user.password, 12);
  user.isAdmin = false;

  await user.save();
  //results
  res.json(_.pick(user, ["_id", "name", "email", "isAdmin"]));
});

//Log In
usersRouter.post("/login", loginMW, async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) {
    res.statusMessage = error.details[0].message;
    res.status(400).json(error.details[0].message);
    return;
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    addToTries(req.ip);
    if (getLoginStatus(req.ip).tries >= 3) {
      blockLogin(req.ip);
    }
    res.statusMessage = "Invalid email or password";
    res.status(401).send("Invalid email or password");
    return;
  }
  const passCheck = await bcrypt.compare(req.body.password, user.password);
  if (!passCheck) {
    addToTries(req.ip);
    if (getLoginStatus(req.ip).tries >= 3) {
      blockLogin(req.ip);
    }
    res.statusMessage = "Invalid email or password";
    res.status(401).send("Invalid email or password");
    return;
  }
  removeBlocked(req.ip);
  const token = user.generateAuthToken();
  res.send({ token });
});

function validateLogin(user) {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().email({ tlds: false }),
    password: Joi.string()
      .min(6)
      .max(1024)
      .required()
      .pattern(
        /^(?=(?:[^A-Z]*[A-Z]))(?=(?:[^a-z]*[a-z]))(?=(?:[^!@#$%^&*]*[!@#$%^&*]))(?=(?:\D*\d){4}).{8,}$/
      )
      .messages({
        "string.empty": `Password field cannot be empty..`,
        "string.min": `Password field should have a minimum length of {#limit}..`,
        "any.required": `Password field is a required..`,
        "string.pattern.base":
          "Password must be,at least, 8 characters long and contain: 1 uppercase letter, 1 lowercase letter, at least 4 digits and 1 special character (!@#$%^&*).",
      }),
  });

  return schema.validate(user);
}

//Forgot Password
usersRouter.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      res.statusMessage = "User Doesn't Exist!";
      res.status(400).send("User Doesn't Exist!");
      return;
    }
    const token = oldUser.generateAuthToken("5m");
    const link = `http://localhost:3000/MyStore/reset-password/${token}`;

    await myMailer(
      email,
      "Reset Password",
      "",
      `<p><a href=${link} target="_blank">Click to Reset MyStore Password</a></p>`
    );

    res.send("Success");
  } catch (err) {
    res.statusMessage =
      "Sorry. Forgot Password Functionality doesn't work at the moment..";
    res
      .status(400)
      .send(
        "Sorry. Forgot Password Functionality doesn't work at the moment.."
      );
  }
});

//Reset Password
usersRouter.post("/reset-password", authMW(), async (req, res) => {
  try {
    const newPass = await bcrypt.hash(req.body.password, 12);
    await User.findOneAndUpdate({ _id: req.user._id }, { password: newPass });
    res.send("Success");
  } catch (err) {
    res.statusMessage = "Reset Password Error!";
    res.status(400).send("Reset Password Error!");
  }
});

//Get all users
usersRouter.get("/", authMW("isAdmin"), async (req, res) => {
  let sortObj = {};
  if (["state", "country", "city"].includes(req.query.sortBy)) {
    sortObj[`address.${req.query.sortBy}`] = req.query.sortOrder || "asc";
  } else {
    sortObj[req.query.sortBy || "name"] = req.query.sortOrder || "asc";
  }

  try {
    const users = await User.find().select("-password -__v").sort(sortObj);
    res.json(users);
  } catch (err) {
    res.statusMessage = `Failed to get all Users.`;
    res.status(400).json(`Failed to get all Users.`);
    return;
  }
});

//Get my user
usersRouter.get("/me", authMW(), async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id }).select(
      "-password -__v"
    );
    res.json(user);
  } catch (err) {
    res.statusMessage = "User was not found.";
    res.status(401).send("User was not found.");
    return;
  }
});
//Get my cart
usersRouter.get("/cart", authMW(), async (req, res) => {
  try {
    const userCart = await User.findOne({ _id: req.user._id })
      .select("cart")
      .populate("cart.product");
    res.json(userCart);
  } catch (err) {
    res.statusMessage = "Failed to get user cart.";
    res.status(400).send("Failed to get user cart.");
    return;
  }
});

//Get user by id
usersRouter.get("/:id", authMW("isAdmin"), async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    res.json(user);
  } catch (err) {
    res.statusMessage = "User was not found.";
    res.status(401).send("User was not found.");
    return;
  }
});

//Upload Avatar
usersRouter.put(
  "/upload/:id",
  authMW("isAdmin", "userOwner"),
  upload.single("avatar"),
  async (req, res) => {
    if (!req.file) {
      console.log("No file..");
    } else {
      try {
        await User.findOneAndUpdate(
          { _id: req.params.id },
          {
            "image.url": `http://localhost:${config.get(
              "server.PORT"
            )}/uploads/${req.file.originalname}`,
          }
        );
        res.send("Avatar Image Updated successfully");
        return;
      } catch (err) {
        res.statusMessage = "User was not found.";
        res.status(401).send("User was not found.");
        return;
      }
    }

    res.send("Image Upload Success.");
  }
);

//Edit user
usersRouter.put("/:id", authMW("isAdmin", "userOwner"), async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    res.statusMessage = error.details[0].message;
    res.status(400).json(error.details[0].message);
    return;
  }
  // let editedId = await User.findOne({ email: req.body.email });
  // console.log(editedId);
  let user = await User.findOne({
    email: req.body.email,
    _id: { $ne: req.params.id },
  });
  if (user) {
    res.statusMessage = "A User with this email already exists.";
    res.status(400).send("A User with this email already exists.");
    return;
  }

  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 12);
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true }
    );
    res.json(
      _.pick(updatedUser, [
        "_id",
        "name",
        "email",
        "phone",
        "address",
        "image",
        "isAdmin",
      ])
    );
  } catch (err) {
    res.statusMessage = "Failed to update user.";
    res.status(400).send("Failed to update user.");
    return;
  }
});

//Change isAdmin
usersRouter.patch("/isAdmin/:id", authMW("isAdmin"), async (req, res) => {
  const reqBodyKeys = Object.keys(req.body);
  if (reqBodyKeys.length !== 1 || !reqBodyKeys.includes("isAdmin")) {
    res.statusMessage =
      "The input must contain 'isAdmin' property and nothing else.";
    res
      .status(400)
      .send("The input must contain 'isAdmin' property and nothing else.");
    return;
  }
  if (typeof req.body.isAdmin !== "boolean") {
    res.statusMessage = "'isAdmin' must contain a Boolean value (true/false).";
    res
      .status(400)
      .send("'isAdmin' must contain a Boolean value (true/false).");
    return;
  }
  if (req.params.id == req.user._id) {
    res.statusMessage = "You can't change your own status..";
    res.status(400).send("You can't change your own status..");
    return;
  }

  try {
    const admins = await User.find({ isAdmin: true });
    if (admins.length == 1 && req.body.isAdmin == false) {
      res.statusMessage = "There must be, at least, one admin.";
      res.status(400).send("There must be, at least, one admin.");
      return;
    }
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true }
    );
    res.json(
      _.pick(updatedUser, [
        "_id",
        "name",
        "email",
        "phone",
        "address",
        "image",
        "isAdmin",
      ])
    );
  } catch (err) {
    res.statusMessage = "Failed to update user.";
    res.status(400).send("Failed to update user.");
    return;
  }
});

//Delete User
usersRouter.delete("/:id", authMW("userOwner", "isAdmin"), async (req, res) => {
  try {
    const admins = await User.find({ isAdmin: true });
    if (admins.length == 1 && admins[0]._id === req.params.id) {
      res.statusMessage = "Can't delete the only admin.";
      res.status(400).send("Can't delete the only admin.");
      return;
    }
    const deletedUser = await User.findOneAndRemove({ _id: req.params.id });
    if (!deletedUser) {
      res.statusMessage = "User was not found..";
      res.status(400).send("User was not found..");
      return;
    }
    res.json(deletedUser);
  } catch (err) {
    res.statusMessage = "Failed to delete user.";
    res.status(400).send("Failed to delete user.");
    return;
  }
});

//Update my Cart
usersRouter.patch("/cart/", authMW(), async (req, res) => {
  const reqBodyKeys = Object.keys(req.body);
  //verify input
  if (
    reqBodyKeys.length !== 2 ||
    !reqBodyKeys.includes("product_id") ||
    !reqBodyKeys.includes("amount")
  ) {
    res.statusMessage =
      "The input object must contain 'product_id' and 'amount' properties and nothing else.";
    res
      .status(400)
      .send(
        "The input object must contain 'product_id' and 'amount' properties and nothing else."
      );
    return;
  }

  try {
    const user = await User.findOne({
      _id: req.user._id,
      "cart.product": req.body.product_id,
    });
    if (user) {
      if (Number(req.body.amount) <= 0) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: req.user._id, "cart.product": req.body.product_id },
          { "$pull": { "cart": { "product": req.body.product_id } } },
          { new: true }
        )
          .select("cart")
          .populate("cart.product");
        res.json(updatedUser);
        return;
      } else {
        const updatedUser = await User.findOneAndUpdate(
          { _id: req.user._id, "cart.product": req.body.product_id },
          { "$set": { "cart.$.amount": req.body.amount } },
          { new: true }
        )
          .select("cart")
          .populate("cart.product");
        res.json(updatedUser);
        return;
      }
    } else {
      let updatedUser;
      if (Number(req.body.amount) > 0) {
        updatedUser = await User.findOneAndUpdate(
          { _id: req.user._id },
          {
            "$push": {
              cart: { product: req.body.product_id, amount: req.body.amount },
            },
          },
          { new: true }
        )
          .select("cart")
          .populate("cart.product");
      } else {
        updatedUser = await User.findOne({ _id: req.user._id })
          .select("cart")
          .populate("cart.product");
      }
      res.json(updatedUser);
      return;
    }
  } catch (err) {
    res.statusMessage = "Failed to update user cart.";
    res.status(400).send("Failed to update user cart.");
    return;
  }
});

module.exports = usersRouter;
