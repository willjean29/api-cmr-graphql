
const Product = require("../models/Product");
const Customer = require("../models/Customer");
const Order = require("../models/Order");
const { StatusOrder, CollectionNames } = require("../utils");

const orderResolvers = {
  Query: {
    getOrders: async (_, { }, ctx) => {
      try {
        const orders = await Order.find({});
        return orders;
      } catch (error) {
        console.log(error)
      }
    },
    getOrdersBySeller: async (_, { id }, ctx) => {
      try {
        const orders = await Order.find({ seller: ctx.user.id });
        return orders;
      } catch (error) {
        console.log(error)
      }
    },
    getOrdersById: async (_, { id }, ctx) => {
      const order = await Order.findById(id);
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
        const orders = await Order.find({ seller: ctx.user.id, status });
        return orders;
      } catch (error) {
        console.log(error)
      }
    },
    getTopCustomers: async () => {
      const customers = await Order.aggregate([
        { $match: { status: StatusOrder.Completed } },
        {
          $group: {
            _id: '$customer',
            total: { $sum: '$total' }
          }
        },
        {
          $lookup: {
            from: CollectionNames.Customers,
            localField: '_id',
            foreignField: '_id',
            as: 'customer'
          }
        },
        {
          $sort: { total: -1 }
        }
      ])

      return customers;
    },
    getTopSellers: async () => {
      const sellers = await Order.aggregate([
        { $match: { status: StatusOrder.Completed } },
        {
          $group: {
            _id: '$seller',
            total: { $sum: '$total' }
          }
        },
        {
          $lookup: {
            from: CollectionNames.Users,
            localField: '_id',
            foreignField: '_id',
            as: 'seller'
          }
        },
        {
          $sort: { total: -1 }
        }
      ])

      return sellers;
    },
  },
  Mutation: {
    createOrder: async (_, { orderDto }, ctx) => {
      const { customer: id, order } = orderDto;
      let customer = await Customer.findById(id);
      if (!customer) {
        throw new Error("Customer not found")
      }
      if (customer.seller.toString() !== ctx.user.id) {
        throw new Error("Unauthorized")
      }

      for await (const item of order) {
        const { id } = item;
        const product = await Product.findById(id);
        if (item.qty > product.stock) {
          throw new Error("The product exceeds the quantity in stock.")
        } else {
          product.stock = product.stock - item.qty;
          await product.save();
        }
      }

      const newOrder = new Order(orderDto);
      newOrder.seller = ctx.user.id;
      await newOrder.save();
      return newOrder;
    },
    updateOrder: async (_, { id, orderDto }, ctx) => {
      console.log({ id, orderDto });
      const { customer: customerId } = orderDto;
      let order = await Order.findById(id);
      if (!order) {
        throw new Error("Order not found");
      }

      const customer = await Customer.findById(customerId);
      if (!customer) {
        throw new Error("Customer not found");
      }

      if (customer.seller.toString() !== ctx.user.id) {
        throw new Error("Unauthorized")
      }

      if (orderDto.order) {
        for await (const item of order) {
          const { id } = item;
          const product = await Product.findById(id);
          if (item.qty > product.stock) {
            throw new Error("The product exceeds the quantity in stock.")
          } else {
            product.stock = product.stock - item.qty;
            await product.save();
          }
        }
      }

      order = await Order.findByIdAndUpdate({ _id: id }, orderDto, { new: true });

      return order;
    },
    deleteOrder: async (_, { id }, ctx) => {
      const order = await Order.findById(id);
      if (!order) {
        throw new Error("Order not found");
      }
      if (order.seller.toString() !== ctx.user.id) {
        throw new Error("Unauthorized")
      }
      await Order.findByIdAndDelete(id);

      return order;
    }
  }
}

module.exports = orderResolvers;