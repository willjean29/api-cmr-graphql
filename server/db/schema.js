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
  type User {
    id: ID
    name: String
    lastName: String
    email: String
  }

  type Query {
    getAllCourse: [Course]
  }

  type Mutation {
    createUser(userDto: UserInput): User
  }
`;

module.exports = typeDefs;

