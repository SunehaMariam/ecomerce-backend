const fs = require("fs").promises;
const path = require("path");

const reviewsPath = path.join(
  process.cwd(),
  "data",
  "review.json"
);


// GET REVIEWS
const getReviews = async (req, res) => {
  try {
    const data = await fs.readFile(reviewsPath, "utf-8");

    const reviews = JSON.parse(data);

    res.status(200).json(reviews);
  } catch (error) {
    console.log("GET REVIEWS ERROR:", error);

    res.status(500).json({
      message: "Failed to get reviews",
      error: error.message
    });
  }
};


// CREATE REVIEW
const createReview = async (req, res) => {
  try {

    const { name, review, rating } = req.body;

    // Validation
    if (!name || !review || !rating) {
      return res.status(400).json({
        message: "Name, review and rating are required"
      });
    }

    // Read existing reviews
    const data = await fs.readFile(
      reviewsPath,
      "utf-8"
    );

    const reviews = JSON.parse(data);

    // Create new review
    const newReview = {
      _id: Date.now().toString(),
      name: name.trim(),
      review: review.trim(),
      rating: Number(rating),
      createdAt: new Date().toISOString()
    };

    // Add new review
    reviews.push(newReview);

    // Save back to JSON file
    await fs.writeFile(
      reviewsPath,
      JSON.stringify(reviews, null, 2)
    );

    // Send new review to frontend
    res.status(201).json(newReview);

  } catch (error) {

    console.log("CREATE REVIEW ERROR:", error);

    res.status(500).json({
      message: "Failed to create review",
      error: error.message
    });
  }
};


module.exports = {
  getReviews,
  createReview
};