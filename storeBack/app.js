require("dotenv/config");
const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const config = require("config");
const loggerMW = require("./middleware/loggerMW");
const { limiter } = require("./middleware/limiterMW");
const cors = require("cors");
const chalk = require("chalk");

const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const categoriesRouter = require("./routes/categoriesRouter");

mongoose
  .connect(config.get("mongoDB.MONGO_URI"))
  .then(() => console.log(chalk.green.bold("Connected to MongoDB")))
  .catch((err) =>
    console.log(chalk.red.bold("Could not connect to MongoDB", err))
  );

const app = express();

app.use(
  morgan(
    chalk.yellow(
      `DATE: :date[web] ; METHOD: :method ; URL: :url ; STATUS: :status ; RESPONSE TIME: :response-time ms`
    )
  )
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(limiter);
app.use(loggerMW);

app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);
app.use(express.static("public"));
app.all("*", (req, res) => {
  res.statusMessage = "404: Page not found.";
  res.status(404).send("404: Page not found.");
  return;
});

app.listen(config.get("server.PORT"), () =>
  console.log(
    chalk.green.bold(`Listening to port ${config.get("server.PORT")}`)
  )
);
