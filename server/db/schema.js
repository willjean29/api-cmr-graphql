const { gql } = require('apollo-server');

const typeDefs = gql`
  type Course {
    title: String
  }

  type Query {
    getAllCourse: [Course]
  }
`;

module.exports = typeDefs;

