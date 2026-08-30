const {
  getCatalogProducts,
  createCatalogProduct
} = require("../model/catalogProduct");


// GET catalog products

const getProducts = async (req, res) => {
  try {

    const products = await getCatalogProducts();

    res.status(200).json(products);

  } catch (error) {

    console.log(
      "CATALOG PRODUCTS ERROR:",
      error
    );

    res.status(500).json({
      message: "Failed to get catalog products",
      error: error.message
    });

  }
};


// POST catalog product

const addProduct = async (req, res) => {
  try {

    const {
      title,
      price,
      rating,
      originalPrice,
      discount,
      image
    } = req.body;

    if (!title || !price) {
      return res.status(400).json({
        message: "Title and price are required"
      });
    }

    const product = await createCatalogProduct({
      title,
      price: Number(price),
      rating: Number(rating) || 0,
      originalPrice: originalPrice
        ? Number(originalPrice)
        : null,
      discount: discount || null,
      image: image || ""
    });

    res.status(201).json({
      message: "Catalog product added successfully",
      product
    });

  } catch (error) {

    console.log(
      "ADD CATALOG PRODUCT ERROR:",
      error
    );

    res.status(500).json({
      message: "Failed to add catalog product",
      error: error.message
    });

  }
};


module.exports = {
  getProducts,
  addProduct
};