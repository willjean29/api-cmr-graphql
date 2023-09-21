const { ProductRepository } = require("../db/repositories");

async function getProducts() {
  try {
    const products = await ProductRepository.find({});
    return products;
  } catch (error) {
    console.log(error);
  }
}

async function getProductsById(id) {
  const product = await ProductRepository.findById(id);
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
}

async function getProductByName(name) {
  const products = await ProductRepository.find({ $text: { $search: name } }, { limit: 10 });
  return products;
}

async function createProduct(productDto) {
  try {
    const product = await ProductRepository.create(productDto);
    return product;
  } catch (error) {
    console.log({ error });
  }
}

async function updateProduct(id, productDto) {
  let product = await getProductsById(id);
  product = await ProductRepository.findByIdAndUpdate(id, productDto);

  return product;
}

async function deleteProduct(id) {
  const product = await getProductsById(id);
  await ProductRepository.findByIdAndDelete(id);
  return product;
}


module.exports = {
  getProducts,
  getProductsById,
  getProductByName,
  createProduct,
  updateProduct,
  deleteProduct
}