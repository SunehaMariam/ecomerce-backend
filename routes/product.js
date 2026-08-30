const express = require("express")
const { createProduct,getProducts } = require("../model/userProduct")
const app = express()
const multer = require("multer");
const router = express.Router()
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });
router.post("/products",async(req,res)=>{
 await createProduct(req.body.title)
 console.log(req.body.title)
 res.send("product added")
})
// POST - Add Product
router.post("/products", upload.single("image"), async (req, res) => {
  try {
    const { title, price , rating } = req.body;

    const image = req.file.filename;

    await createProduct(title, price,rating, image);

    console.log("Title:", title);
    console.log("Price:", price);
    console.log("Image:", image);

    res.json({
      message: "Product added successfully"
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Product add nahi hua"
    });
  }
});


// GET - Get Products
router.get("/products", async (req, res) => {
  try {
    const products = await getProducts();

    res.json(products);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Products get nahi ho rahe"
    });
  }
});
router.get("/reviews", async (req, res) => {
  const reviews = await Review.find();
  res.json(reviews);
});



module.exports=router