const { gql } = require('apollo-server');

const userTypeDefs = gql`
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

  extend type Query {
    # users
    getUser(token: String!): User
  }

  extend type Mutation {
    # users
    createUser(userDto: UserInput): User
    signIn(signInDto: SignInInput): Token
  }
`;

module.exports = userTypeDefs;