const express = require("express");

const router = express.Router();

const {
  getReviews,
  createReview
} = require("../controllers/review");


// GET all reviews
router.get("/", getReviews);


// POST new review
router.post("/", createReview);


module.exports = router;