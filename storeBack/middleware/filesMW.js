const multer = require("multer");
const Joi = require("joi");
const fs = require("node:fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads"); // Store uploaded files in the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage: storage });

module.exports = {
  upload,
};
