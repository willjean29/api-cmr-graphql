const { gql } = require("apollo-server");
const userTypeDefs = require("./User");
const produtTypeDefs = require("./Product");
const customerTypeDefs = require("./Customer");
const orderTypeDefs = require("./Order");

const rootTypeDefs = gql`
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`;

const typeDefs = [rootTypeDefs, userTypeDefs, produtTypeDefs, customerTypeDefs, orderTypeDefs];

module.exports = typeDefs;
