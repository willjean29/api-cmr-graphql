const { gql } = require('apollo-server');

const typeDefs = gql`
  type Course {
    title: String
  }
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
    getAllCourse: [Course]
    getUser(token: String!): User
  }

  type Mutation {
    # users
    createUser(userDto: UserInput): User
    signIn(signInDto: SignInInput): Token

    # products
    createProduct(productDto: ProductInput): Product
  }
`;

module.exports = typeDefs;

