
const Product = require("../models/Product");
const Customer = require("../models/Customer");
const Order = require("../models/Order");
const { StatusOrder, CollectionNames } = require("../utils");
const { OrderRepository, CustomerRepository, ProductRepository } = require("../db/repositories");
const orderResolvers = {
  Query: {
    getOrders: async (_, { }) => {
      try {
        const orders = await OrderRepository.find({});
        return orders;
      } catch (error) {
        console.log(error)
      }
    },
    getOrdersBySeller: async (_, { }, ctx) => {
      try {
        const orders = await OrderRepository.find({ seller: ctx.user.id });
        return orders;
      } catch (error) {
        console.log(error)
      }
    },
    getOrdersById: async (_, { id }, ctx) => {
      const order = await OrderRepository.findById(id);
      if (!order) {
        throw new Error("Order not found")
      }
      if (order.seller.toString() !== ctx.user.id) {
        throw new Error("Unauthorized");
      }

      return order;
    },
    getOrdersByStatus: async (_, { status }, ctx) => {
      try {
        const orders = await OrderRepository.find({ seller: ctx.user.id, status });
        return orders;
      } catch (error) {
        console.log(error)
      }
    },
    getTopCustomers: async () => {
      const customers = await OrderRepository.findTopCustomer();
      return customers;
    },
    getTopSellers: async () => {
      const sellers = await OrderRepository.findTopSeller();
      return sellers;
    },
  },
  Mutation: {
    createOrder: async (_, { orderDto }, ctx) => {
      const { customer: id, order } = orderDto;
      let customer = await CustomerRepository.findById(id);
      if (!customer) {
        throw new Error("Customer not found")
      }
      if (customer.seller.toString() !== ctx.user.id) {
        throw new Error("Unauthorized")
      }

      for await (const item of order) {
        const { id } = item;
        const product = await ProductRepository.findById(id);
        if (item.qty > product.stock) {
          throw new Error("The product exceeds the quantity in stock.")
        } else {
          product.stock = product.stock - item.qty;
          await ProductRepository.findByIdAndUpdate(id, product);
        }
      }

      const newOrder = await OrderRepository.create({
        ...orderDto,
        seller: ctx.user.id
      });
      return newOrder;
    },
    updateOrder: async (_, { id, orderDto }, ctx) => {
      const { customer: customerId } = orderDto;
      let order = await OrderRepository.findById(id);
      if (!order) {
        throw new Error("Order not found");
      }

      const customer = await CustomerRepository.findById(customerId);
      if (!customer) {
        throw new Error("Customer not found");
      }

      if (customer.seller.toString() !== ctx.user.id) {
        throw new Error("Unauthorized")
      }

      if (orderDto.order) {
        for await (const item of order) {
          const { id } = item;
          const product = await ProductRepository.findById(id);
          if (item.qty > product.stock) {
            throw new Error("The product exceeds the quantity in stock.")
          } else {
            product.stock = product.stock - item.qty;
            await ProductRepository.findByIdAndUpdate(id, product);
          }
        }
      }

      order = await OrderRepository.findByIdAndUpdate(id, orderDto);

      return order;
    },
    deleteOrder: async (_, { id }, ctx) => {
      const order = await OrderRepository.findById(id);
      if (!order) {
        throw new Error("Order not found");
      }
      if (order.seller.toString() !== ctx.user.id) {
        throw new Error("Unauthorized")
      }
      await OrderRepository.findByIdAndDelete(id);

      return order;
    }
  }
}

module.exports = orderResolvers;