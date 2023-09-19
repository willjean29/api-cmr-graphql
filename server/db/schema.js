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

  type Query {
    # users
    getUser(token: String!): User
    getProducts: [Product]

    # products
    getProductsById(id: ID!): Product
  }

  type Mutation {
    # users
    createUser(userDto: UserInput): User
    signIn(signInDto: SignInInput): Token

    # products
    createProduct(productDto: ProductInput): Product
    updateProduct(id: ID!, productDto: ProductInput): Product
    deleteProduct(id: ID!): Product
  }
`;

module.exports = typeDefs;

