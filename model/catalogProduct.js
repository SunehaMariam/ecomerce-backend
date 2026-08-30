const fs = require("fs").promises;
const path = require("path");

const catalogProductsPath = path.join(
  process.cwd(),
  "data",
  "catalogProducts.json"
);

const getCatalogProducts = async () => {
  const data = await fs.readFile(
    catalogProductsPath,
    "utf-8"
  );

  return JSON.parse(data);
};

const createCatalogProduct = async (product) => {
  const products = await getCatalogProducts();

  const newProduct = {
    id: Date.now(),
    ...product
  };

  products.push(newProduct);

  await fs.writeFile(
    catalogProductsPath,
    JSON.stringify(products, null, 2)
  );

  return newProduct;
};

module.exports = {
  getCatalogProducts,
  createCatalogProduct
};