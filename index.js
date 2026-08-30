const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config()
const app = express();
const productCatalog = require("./routes/catalogProduct");
const review = require("./routes/review");
const Product = require("./routes/product");
const orderRoute = require("./routes/order");
// Middleware
app.use(cors({ 
  origin: "https://ecommerce-frontend-seven-nu.vercel.app" 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Images
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);
// Catalog products
app.use("/catalog/products", productCatalog);
// Reviews
app.use("/reviews", review);
// Home/User products
app.use("/product", Product);
app.use("/order", orderRoute);
app.get("/", (req, res) => {
  res.json({
    message: "Server is running",
  });
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
