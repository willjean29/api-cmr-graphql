const mongoose = require('mongoose')
const { CollectionNames, StatusOrder } = require('../utils')
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  order: {
    type: Array,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: CollectionNames.Customers
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: CollectionNames.Users
  },
  status: {
    type: String,
    enum: Object.values(StatusOrder),
    default: StatusOrder.Pending
  }
}, {
  timestamps: true
})



module.exports = mongoose.model(CollectionNames.Orders, OrderSchema);