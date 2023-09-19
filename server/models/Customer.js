const mongoose = require('mongoose')
const { CollectionNames } = require('../utils')
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  business: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  phone: {
    type: String,
    trim: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: CollectionNames.Users
  }
}, {
  timestamps: true
})



module.exports = mongoose.model(CollectionNames.Customers, CustomerSchema);