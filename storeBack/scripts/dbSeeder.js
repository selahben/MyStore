require("dotenv/config");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { User } = require("../models/usersModel");
const { Product } = require("../models/productsModel");
const { Category } = require("../models/categoriesModel");
const { usersData, productsData, categoriesData } = require("./dbSeederData");
const config = require("config");
const chalk = require("chalk");
const _ = require("lodash");

mongoose
  .connect(config.get("mongoDB.MONGO_URI"))
  .then(() => console.log(chalk.green("connected to db successfully")))
  .then(seed)
  .then(() => mongoose.connection.close())
  .catch((err) => console.log(chalk.red(`could not connect to db: ${err}`)));

async function seed() {
  await Product.deleteMany();
  await Category.deleteMany();
  await User.deleteMany();

  for (let i = 0; i < categoriesData.length; i++) {
    const newCategory = new Category(categoriesData[i]);
    await newCategory.save();
    console.log(chalk.white.bgGreen(`new Category: ${newCategory.title}`));
  }

  for (let j = 0; j < productsData.length; j++) {
    const catId = await Category.findOne({
      title: productsData[j].category,
    }).select("_id");
    const newProduct = new Product({
      ...productsData[j],
      "category": catId,
    });
    await newProduct.save();
    console.log(chalk.white.bgBlue(`new Product: ${newProduct.name}`));
  }

  for (let i = 0; i < usersData.length; i++) {
    await seedUser(usersData[i], (i + 1) * 2);
  }

  console.log(
    chalk.black.bgWhiteBright(
      "Seeding Complete. Run 'npm run start/dev' to start the application.."
    )
  );
}

async function seedUser(userData, productsNum) {
  const product1 = await Product.find()
    .limit(1)
    .skip(productsNum - 2);
  const product2 = await Product.find()
    .limit(1)
    .skip(productsNum - 1);
  const user = await new User({
    ...userData,
    "password": await bcrypt.hash(userData.password, 12),
    "cart": [
      {
        "product": product1[0]._id,
        "amount": 2,
      },
      {
        "product": product2[0]._id,
        "amount": 2,
      },
    ],
  }).save();

  console.log(chalk.white.bgBlue(`New User: ${userData.email}`));

  return user;
}
