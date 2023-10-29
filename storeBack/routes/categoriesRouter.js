const categoriesRouter = require("express").Router();
const authMW = require("../middleware/authMW");

const { Product } = require("../models/productsModel");
const { Category, validateCategory } = require("../models/categoriesModel");

//Get all Categories
categoriesRouter.get("/", async (req, res) => {
  let sortObj = {};
  sortObj[req.query.sortBy || "title"] = req.query.sortOrder || "asc";
  try {
    const cats = await Category.find().sort(sortObj);
    res.json(cats);
  } catch (err) {
    res.statusMessage = `Failed to get all Categories.`;
    res.status(400).json(`Failed to get all Categories.`);
    return;
  }
});

//Get Category by id
categoriesRouter.get("/:id", authMW("isAdmin"), async (req, res) => {
  try {
    const cat = await Category.find({ _id: req.params.id });
    res.json(cat);
  } catch (err) {
    res.statusMessage = `Failed to get a Category with this id.`;
    res.status(400).json(`Failed to get a Category with this id.`);
    return;
  }
});

//Create New Category
categoriesRouter.post("/", authMW("isAdmin"), async (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) {
    res.statusMessage = `Category validation failed: ${error.details[0].message}`;
    res.status(400).json(error.details[0].message);
    return;
  }

  try {
    const newCat = new Category(req.body);
    await newCat.save();
    res.json(newCat);
  } catch (err) {
    res.statusMessage = `Failed to create new category: ${err.message}`;
    res.status(400).json(err.message);
    return;
  }
});

//Edit Category
categoriesRouter.put("/:id", authMW("isAdmin"), async (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) {
    res.statusMessage = `Category validation failed: ${error.details[0].message}`;
    res.status(400).json(error.details[0].message);
    return;
  }

  try {
    const editedCat = await Category.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true }
    );

    res.json(editedCat);
  } catch (err) {
    res.statusMessage = `Failed to update category: ${err.message}`;
    res.status(400).json(`Failed to update category: ${err.message}`);
    return;
  }
});

//Delete Category
categoriesRouter.delete("/:id", authMW("isAdmin"), async (req, res) => {
  const mainCatId = await Category.findOne({ main: true }).select("_id");
  if (mainCatId._id == req.params.id) {
    res.statusMessage = `Main Category can not be deleted.`;
    res.status(400).json(`Main Category can not be deleted.`);
    return;
  }
  try {
    const deletedCat = await Category.findOneAndDelete({ _id: req.params.id });
    await Product.updateMany(
      { category: deletedCat._id },
      { category: mainCatId._id }
    );
    res.json(deletedCat);
  } catch (err) {
    res.statusMessage = `Failed to delete category: ${err.message}`;
    res.status(400).json(`Failed to delete category: ${err.message}`);
    return;
  }
});

module.exports = categoriesRouter;
