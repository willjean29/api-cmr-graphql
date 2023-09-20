const Customer = require("../models/Customer");

const cutomerResolvers = {
  Query: {
    getCustomers: async () => {
      try {
        const customers = await Customer.find({});
        return customers;
      } catch (error) {
        console.log({ error });
      }
    },
    getCustomersBySeller: async (_, { }, ctx) => {
      try {
        const customers = await Customer.find({ seller: ctx.user.id.toString() });
        return customers;
      } catch (error) {
        console.log(error)
      }
    },
    getCustomersById: async (_, { id }, ctx) => {
      const customer = await Customer.findById(id);
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
      const customer = await Customer.findOne({ email });
      if (customer) {
        throw new Error("Customer already exists");
      }
      const newCustomer = new Customer(customerDto);
      newCustomer.seller = ctx.user.id;
      try {
        await newCustomer.save();
        return newCustomer;
      } catch (error) {
        console.log({ error });
      }
    },
    updateCustomer: async (_, { id, customerDto }, ctx) => {
      let customer = await Customer.findById(id);
      if (!customer) {
        throw new Error("Customer not found")
      }

      if (customer.seller.toString() !== ctx.user.id) {
        throw new Error("Unauthorized")
      }

      customer = Customer.findByIdAndUpdate({ _id: id }, customerDto, { new: true });

      return customer;
    },
    deleteCustomer: async (_, { id }, ctx) => {
      let customer = await Customer.findById(id);
      if (!customer) {
        throw new Error("Customer not found")
      }

      if (customer.seller.toString() !== ctx.user.id) {
        throw new Error("Unauthorized")
      }

      await Customer.findByIdAndDelete(id);

      return customer;
    },
  }
}

module.exports = cutomerResolvers;