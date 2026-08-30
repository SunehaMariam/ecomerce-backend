const {createProduct,getProducts} = require("../model/userProduct")
exports.createProduct =async(title,price,rating,image)=>{
    await createProduct(title,price,rating,image)
}
exports.getProducts = async () => {
  const products = await getProducts();

  return products;
};
