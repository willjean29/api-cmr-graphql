const { Product } = require("../../models");

async function create(userDto) {
  const product = new Product(userDto);
  await product.save();
  return product;
}

async function findOne(param, value) {
  const product = await Product.findOne({ [param]: value });
  return product;
}

async function findById(id) {
  const product = await Product.findById(id);
  return product;
}

async function find(queries = {}) {
  const products = await Product.find(queries);
  return products;
}

async function findByIdAndUpdate(id, productDto) {
  const product = await Product.findByIdAndUpdate({ _id: id }, productDto, { new: true });
  return product;
}

async function findByIdAndDelete(id) {
  const product = await Product.findByIdAndDelete(id);
  return product;
}

module.exports = {
  create,
  findOne,
  findById,
  find,
  findByIdAndUpdate,
  findByIdAndDelete
}