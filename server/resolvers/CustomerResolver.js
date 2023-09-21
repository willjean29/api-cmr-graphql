const { CustomerRepository } = require("../db/repositories");

const cutomerResolvers = {
  Query: {
    getCustomers: async () => {
      try {
        const customers = await CustomerRepository.find({});
        return customers;
      } catch (error) {
        console.log({ error });
      }
    },
    getCustomersBySeller: async (_, { }, ctx) => {
      try {
        const customers = await CustomerRepository.find({ seller: ctx.user.id.toString() });
        return customers;
      } catch (error) {
        console.log(error)
      }
    },
    getCustomersById: async (_, { id }, ctx) => {
      const customer = await CustomerRepository.findById(id);
      if (!customer) {
        throw new Error("Customer not found");
      }
      if (customer.seller.toString() !== ctx.user.id) {
        throw new Error("Unauthorized");
      }
      return customer;
    }
  },
  Mutation: {
    createCustomer: async (_, { customerDto }, ctx) => {
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
    },
    updateCustomer: async (_, { id, customerDto }, ctx) => {
      let customer = await CustomerRepository.findById(id);
      if (!customer) {
        throw new Error("Customer not found")
      }

      if (customer.seller.toString() !== ctx.user.id) {
        throw new Error("Unauthorized")
      }

      customer = CustomerRepository.findByIdAndUpdate(id, customerDto);

      return customer;
    },
    deleteCustomer: async (_, { id }, ctx) => {
      let customer = await CustomerRepository.findById(id);
      if (!customer) {
        throw new Error("Customer not found")
      }

      if (customer.seller.toString() !== ctx.user.id) {
        throw new Error("Unauthorized")
      }

      await CustomerRepository.findByIdAndDelete(id);

      return customer;
    },
  }
}

module.exports = cutomerResolvers;