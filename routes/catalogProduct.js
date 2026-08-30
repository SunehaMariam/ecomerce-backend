const express = require("express");

const router = express.Router();

const {
  getProducts,
  addProduct
} = require("../controllers/catalogProduct");


// GET

router.get("/", getProducts);


// POST

router.post("/", addProduct);


module.exports = router;