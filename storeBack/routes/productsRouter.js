const productsRouter = require("express").Router();
const authMW = require("../middleware/authMW");

const { Product, validateProduct } = require("../models/productsModel");
const { Category } = require("../models/categoriesModel");
const { User } = require("../models/usersModel");

//Get All Products
productsRouter.get("/", async (req, res) => {
  let searchObj = {};
  let sortObj = {};
  sortObj[req.query.sortBy || "name"] = req.query.sortOrder || "asc";

  if (req.query.cat) {
    try {
      const catId = await Category.findOne({ className: req.query.cat }).select(
        "_id"
      );
      searchObj["category"] = catId._id;
    } catch (err) {
      res.statusMessage = "Error! Category was not found.";
      res.status(400).send("Error! Category was not found.");
      return;
    }
  }
  if (req.query.search) {
    const searchArr = req.query.search.split(" ");
    const regex = new RegExp(searchArr.join("|"), "i");
    searchObj["tags"] = { $regex: regex };
  }
  try {
    let products;
    if (req.query.sortBy == "category") {
      products = await Product.find(searchObj).populate("category");
      products.sort((a, b) => {
        if (req.query.sortOrder == "asc") {
          if (a.category.title > b.category.title) {
            return 1;
          }
          if (a.category.title < b.category.title) {
            return -1;
          }
          return 0;
        } else {
          if (a.category.title < b.category.title) {
            return 1;
          }
          if (a.category.title > b.category.title) {
            return -1;
          }
          return 0;
        }
      });
    } else {
      products = await Product.find(searchObj)
        .sort(sortObj)
        .populate("category");
    }

    res.json(products);
  } catch (err) {
    res.statusMessage = "Error! Can't retrieve products.";
    res.status(400).send("Error! Can't retrieve products.");
    return;
  }
});

//Get Product by ID
productsRouter.get("/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id }).populate(
      "category"
    );
    res.json(product);
  } catch (err) {
    res.statusMessage = "Error! Product was not found.";
    res.status(400).send("Error! Product was not found.");
    return;
  }
});

//Create New Product
productsRouter.post("/", authMW("isAdmin"), async (req, res) => {
  if (req.body.category) {
    try {
      const catID = await Category.findOne({
        className: req.body.category,
      }).select("_id");
      if (catID) {
        req.body.category = catID;
      }
    } catch (err) {
      res.statusMessage =
        "Error! Category input is missing, invalid or not found.";
      res
        .status(400)
        .send("Error! Category input is missing, invalid or not found");
    }
  }
  const snExist = await Product.findOne({ sn: req.body.sn });
  if (snExist) {
    res.statusMessage = "A Product with this 'sn' already Exists!";
    res.status(400).send("A Product with this 'sn' already Exists!");
    return;
  }

  const { error } = validateProduct(req.body);
  if (error) {
    res.status(400).json(error.details[0].message);
    return;
  }

  const product = new Product(req.body);

  await product.save();

  res.json(product);
});

//Edit Product
productsRouter.put("/:id", authMW("isAdmin"), async (req, res) => {
  if (req.body.category) {
    try {
      const catID = await Category.findOne({
        className: req.body.category,
      }).select("_id");
      if (catID) {
        req.body.category = catID;
      }
    } catch (err) {
      res.statusMessage =
        "Error! Category input is missing, invalid or not found.";
      res
        .status(400)
        .send("Error! Category input is missing, invalid or not found");
    }
  }
  const snExist = await Product.findOne({
    sn: req.body.sn,
    _id: { $ne: req.params.id },
  });
  if (snExist) {
    res.statusMessage = "A Product with this 'sn' already Exists!";
    res.status(400).send("A Product with this 'sn' already Exists!");
    return;
  }
  const { error } = validateProduct(req.body);
  if (error) {
    res.statusMessage = error.details[0].message;
    res.status(400).json(error.details[0].message);
    return;
  }

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true }
    );
    res.json(updatedProduct);
    return;
  } catch (err) {
    res.statusMessage = "Failed to update card.";
    res.status(400).send("Failed to update card.");
    return;
  }
});

//Delete product
productsRouter.delete("/:id", authMW("isAdmin"), async (req, res) => {
  try {
    await User.updateMany(
      { "cart.product": req.params.id },
      { "$pull": { "cart": { "product": req.params.id } } }
    );
    const deletedProduct = await Product.findOneAndRemove({
      _id: req.params.id,
    });
    res.json(deletedProduct);
  } catch (err) {
    res.statusMessage = "Failed to delete card.";
    res.status(400).send("Failed to delete card.");
    return;
  }
});

module.exports = productsRouter;
