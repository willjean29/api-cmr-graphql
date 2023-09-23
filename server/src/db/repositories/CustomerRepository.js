const { Customer } = require("../../models");

async function find(queries = {}) {
  const customers = await Customer.find(queries);
  return customers;
}

async function findById(id) {
  const customer = await Customer.findById(id);
  return customer;
}

async function findOne(param, value) {
  const customer = await Customer.findOne({ [param]: value });
  return customer;
}

async function create(customerDto) {
  const customer = await Customer.create(customerDto);
  return customer;
}

async function findByIdAndUpdate(id, customerDto) {
  const customer = Customer.findByIdAndUpdate({ _id: id }, customerDto, { new: true });
  return customer;
}

async function findByIdAndDelete(id) {
  const customer = await Customer.findByIdAndDelete(id);
  return customer;
}

module.exports = {
  find,
  findById,
  findOne,
  create,
  findByIdAndUpdate,
  findByIdAndDelete
}