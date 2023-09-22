const { CustomerService } = require("../services");

const cutomerResolvers = {
  Query: {
    getCustomers: () => {
      return CustomerService.getCustomers();
    },
    getCustomersBySeller: (_, { }, ctx) => {
      return CustomerService.getCustomersBySeller(ctx);
    },
    getCustomersById: (_, { id }, ctx) => {
      return CustomerService.getCustomersById(id, ctx);
    }
  },
  Mutation: {
    createCustomer: (_, { customerDto }, ctx) => {
      return CustomerService.createCustomer(customerDto, ctx)
    },
    updateCustomer: (_, { id, customerDto }, ctx) => {
      return CustomerService.updateCustomer(id, customerDto, ctx)
    },
    deleteCustomer: (_, { id }, ctx) => {
      return CustomerService.deleteCustomer(id, ctx)
    },
  }
}

module.exports = cutomerResolvers;