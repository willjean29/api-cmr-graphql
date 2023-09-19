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

  input OrderProductInput{
    id: ID!
    qty: Int
  }

  input OrderInput {
    order: [OrderProductInput]!
    total: Float!
    customer: ID!
    status: StatusOrder
  }
  
  input UpdateOrderInput {
    order: [OrderProductInput]
    total: Float
    customer: ID!
    status: StatusOrder
  }

  enum StatusOrder {
    pending
    completed
    cancelled
  }

  type OrderProduct{
    id: ID
    qty: Int
  }

  type Order {
    id: ID
    order: [OrderProduct]
    total: Float
    customer: ID
    seller: ID
    status: StatusOrder
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

    # orders
    getOrders: [Order]
    getOrdersBySeller: [Order]
    getOrdersById(id: ID!): Order
    getOrdersByStatus(status: StatusOrder!): [Order]
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

    #orders
    createOrder(orderDto: OrderInput): Order
    updateOrder(id: ID!, orderDto: UpdateOrderInput): Order
    deleteOrder(id: ID!): Order
  }
`;

module.exports = typeDefs;

