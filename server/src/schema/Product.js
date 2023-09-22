const { gql } = require('apollo-server');

const produtTypeDefs = gql`
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

  extend type Query {
    getProducts: [Product]
    getProductsById(id: ID!): Product
    getProductByName(name: String!): [Product] 
  }

  extend type Mutation {
    createProduct(productDto: ProductInput): Product
    updateProduct(id: ID!, productDto: ProductInput): Product
    deleteProduct(id: ID!): Product
  }
`;

module.exports = produtTypeDefs;

