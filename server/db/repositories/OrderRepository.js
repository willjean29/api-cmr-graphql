const { Order } = require("../../models");
const { StatusOrder, CollectionNames } = require("../../utils");

async function find(queries = {}) {
  const orders = await Order.find(queries);
  return orders;
}

async function findById(id) {
  const order = await Order.findById(id);
  return order;
}

async function findTopCustomer() {
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
}

async function findTopSeller() {
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
}

async function create(orderDto) {
  const order = new Order(orderDto);
  await order.save();
  return order;
}

async function findByIdAndUpdate(id, orderDto) {
  const order = await Order.findByIdAndUpdate({ _id: id }, orderDto, { new: true });
  return order;
}

async function findByIdAndDelete(id) {
  const order = await Order.findByIdAndDelete(id);
  return order;
}

module.exports = {
  find,
  findById,
  findTopCustomer,
  findTopSeller,
  create,
  findByIdAndUpdate,
  findByIdAndDelete
}
