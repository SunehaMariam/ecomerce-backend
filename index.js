const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config
const app = express();

const productCatalog = require("./routes/catalogProduct");
const review = require("./routes/review");
const Product = require("./routes/product");
const orderRoute = require("./routes/order");
// Middleware
app.use(cors({ origin: "https://ecommerce-frontend-1o4omeed6-sunehasrequire("dotenv").config(); 

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

const productCatalog = require("./routes/catalogProduct");
const review = require("./routes/review");
const Product = require("./routes/product");
const orderRoute = require("./routes/order");

// Middleware
const corsOptions = {
  origin: function (origin, callback) {
    if (
      !origin ||
      origin.endsWith(".vercel.app") ||
      origin === "http://localhost:5173"
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions)); // 👈 fixed - wildcard CORS

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
});-projects-1ce93f5f.vercel.app/" }));
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
