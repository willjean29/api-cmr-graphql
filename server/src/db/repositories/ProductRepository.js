const { Product } = require("../../models");

async function create(productDto) {
  const product = await Product.create(productDto);
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

async function find(queries = {}, options = {}) {
  let products = Product.find(queries);
  if (options?.limit) {
    products = products.limit(options.limit);
  }

  return products.exec();
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