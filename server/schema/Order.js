const { gql } = require('apollo-server');

const orderTypeDefs = gql`
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

  type TopCustomer {
    total: Float
    customer: [Customer]
  }

  type TopSeller {
    total: Float
    seller: [User]
  }

  extend type Query {
    getOrders: [Order]
    getOrdersBySeller: [Order]
    getOrdersById(id: ID!): Order
    getOrdersByStatus(status: StatusOrder!): [Order]

    getTopCustomers: [TopCustomer]
    getTopSellers: [TopSeller]
  }

  extend type Mutation {
    createOrder(orderDto: OrderInput): Order
    updateOrder(id: ID!, orderDto: UpdateOrderInput): Order
    deleteOrder(id: ID!): Order
  }
`;

module.exports = orderTypeDefs;

