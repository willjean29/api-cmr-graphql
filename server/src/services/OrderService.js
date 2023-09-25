const { OrderRepository, } = require("../db/repositories");
const CustomerService = require("../services/CustomerService");
const ProductService = require("../services/ProductService");

async function getOrders() {
  try {
    const orders = await OrderRepository.find({});
    return orders;
  } catch (error) {
    console.log(error)
  }
}

async function getOrdersBySeller(ctx) {
  try {
    const orders = await OrderRepository.find({ seller: ctx.user.id });
    return orders;
  } catch (error) {
    console.log(error)
  }
}
async function getOrdersById(id, ctx) {
  const order = await OrderRepository.findById(id);
  if (!order) {
    throw new Error("Order not found")
  }
  if (order.seller.toString() !== ctx.user.id) {
    throw new Error("Unauthorized");
  }

  return order;
}

async function getOrdersByStatus(status, ctx) {
  try {
    const orders = await OrderRepository.find({ seller: ctx.user.id, status });
    return orders;
  } catch (error) {
    console.log(error)
  }
}

async function getTopCustomers() {
  const customers = await OrderRepository.findTopCustomer();
  return customers;
}

async function getTopSellers() {
  const sellers = await OrderRepository.findTopSeller();
  return sellers;
}

async function createOrder(orderDto, ctx) {
  const { customer: id, order } = orderDto;

  await CustomerService.getCustomersById(id, ctx);

  for await (const item of order) {
    const { id } = item;
    const product = await ProductService.getProductsById(id);
    if (item.qty > product.stock) {
      throw new Error("The product exceeds the quantity in stock.")
    } else {
      product.stock = product.stock - item.qty;
      await ProductService.updateProduct(id, product);
    }
  }

  const newOrder = await OrderRepository.create({
    ...orderDto,
    seller: ctx.user.id
  });
  return newOrder;
}

async function updateOrder(id, orderDto, ctx) {
  const { customer: customerId } = orderDto;
  let order = await OrderRepository.findById(id);
  if (!order) {
    throw new Error("Order not found");
  }

  await CustomerService.getCustomersById(customerId, ctx);

  if (orderDto.order) {
    for await (const item of orderDto.order) {
      const { id } = item;
      const product = await ProductService.getProductsById(id);
      if (item.qty > product.stock) {
        throw new Error("The product exceeds the quantity in stock.")
      } else {
        product.stock = product.stock - item.qty;
        await ProductService.updateProduct(id, product);
      }
    }
  }

  order = await OrderRepository.findByIdAndUpdate(id, orderDto);

  return order;
}

async function deleteOrder(id, ctx) {
  const order = await getOrdersById(id, ctx);
  await OrderRepository.findByIdAndDelete(id);

  return order;
}

module.exports = {
  getOrders,
  getOrdersBySeller,
  getOrdersById,
  getOrdersByStatus,
  getTopCustomers,
  getTopSellers,
  createOrder,
  updateOrder,
  deleteOrder
}

