const { CustomerRepository } = require("../db/repositories");

async function getCustomers() {
  try {
    const customers = await CustomerRepository.find({});
    return customers;
  } catch (error) {
    console.log({ error });
  }
}

async function getCustomersBySeller(ctx) {
  try {
    const customers = await CustomerRepository.find({ seller: ctx.user.id.toString() });
    return customers;
  } catch (error) {
    console.log(error)
  }
}

async function getCustomersById(id, ctx) {
  const customer = await CustomerRepository.findById(id);
  if (!customer) {
    throw new Error("Customer not found");
  }
  if (customer.seller.toString() !== ctx.user.id) {
    throw new Error("Unauthorized");
  }
  return customer;
}

async function createCustomer(customerDto, ctx) {
  const { email } = customerDto;
  const customer = await CustomerRepository.findOne('email', email);
  if (customer) {
    throw new Error("Customer already exists");
  }
  try {
    const newCustomer = await CustomerRepository.create({ ...customerDto, seller: ctx.user.id });
    return newCustomer;
  } catch (error) {
    console.log({ error });
  }
}

async function updateCustomer(id, customerDto, ctx) {
  let customer = await getCustomersById(id, ctx);
  customer = CustomerRepository.findByIdAndUpdate(id, customerDto);
  return customer;
}

async function deleteCustomer(id, ctx) {
  let customer = await getCustomersById(id, ctx);
  await CustomerRepository.findByIdAndDelete(id);
  return customer;
}


module.exports = {
  getCustomers,
  getCustomersBySeller,
  getCustomersById,
  createCustomer,
  updateCustomer,
  deleteCustomer
}