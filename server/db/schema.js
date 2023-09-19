const { gql } = require('apollo-server');

const typeDefs = gql`

  input UserInput {
    name: String!
    lastName: String!
    email: String!
    password: String!
  }

  input SignInInput {
    email: String!
    password: String!
  }

  type User {
    id: ID
    name: String
    lastName: String
    email: String
  }

  type Token {
    token: String
  }

  input ProductInput {
    name: String!
    stock: Int!
    price: Float!
  }

  type Product {
    id: ID 
    name: String 
    stock: Int
    price: Float
  }

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

  type Query {
    # users
    getUser(token: String!): User

    # products
    getProducts: [Product]
    getProductsById(id: ID!): Product

    # customers
    getCustomers: [Customer]
    getCustomersBySeller: [Customer]
    getCustomersById(id: ID!): Customer
  }

  type Mutation {
    # users
    createUser(userDto: UserInput): User
    signIn(signInDto: SignInInput): Token

    # products
    createProduct(productDto: ProductInput): Product
    updateProduct(id: ID!, productDto: ProductInput): Product
    deleteProduct(id: ID!): Product

    # customers
    createCustomer(customerDto: CustomerInput): Customer
    updateCustomer(id: ID!, customerDto: CustomerInput): Customer
    deleteCustomer(id: ID!): Customer
  }
`;

module.exports = typeDefs;

