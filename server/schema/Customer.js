const { gql } = require('apollo-server');

const customerTypeDefs = gql`
  input CustomerInput {
    name: String!
    lastName: String!
    business: String!
    email: String!
    phone: String
  }

  type Customer {
    id: ID 
    name: String
    lastName: String
    business: String
    email: String
    phone: String
    seller: ID
  }

  extend type Query {
    getCustomers: [Customer]
    getCustomersBySeller: [Customer]
    getCustomersById(id: ID!): Customer
  }

  extend type Mutation {
    createCustomer(customerDto: CustomerInput): Customer
    updateCustomer(id: ID!, customerDto: CustomerInput): Customer
    deleteCustomer(id: ID!): Customer
  }
`;

module.exports = customerTypeDefs;

