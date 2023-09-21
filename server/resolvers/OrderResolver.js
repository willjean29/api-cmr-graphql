
const { OrderService } = require("../services");
const orderResolvers = {
  Query: {
    getOrders: (_, { }) => {
      return OrderService.getOrders();
    },
    getOrdersBySeller: (_, { }, ctx) => {
      return OrderService.getOrdersBySeller(ctx);
    },
    getOrdersById: (_, { id }, ctx) => {
      return OrderService.getOrdersById(id, ctx);
    },
    getOrdersByStatus: (_, { status }, ctx) => {
      return OrderService.getOrdersByStatus(status, ctx);
    },
    getTopCustomers: () => {
      return OrderService.getTopCustomers();
    },
    getTopSellers: () => {
      return OrderService.getTopSellers();
    },
  },
  Mutation: {
    createOrder: (_, { orderDto }, ctx) => {
      return OrderService.createOrder(orderDto, ctx);
    },
    updateOrder: (_, { id, orderDto }, ctx) => {
      return OrderService.updateOrder(id, orderDto, ctx);
    },
    deleteOrder: (_, { id }, ctx) => {
      return OrderService.deleteOrder(id, ctx);
    }
  }
}

module.exports = orderResolvers;