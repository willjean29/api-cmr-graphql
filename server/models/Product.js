const mongoose = require('mongoose')
const { CollectionNames } = require('../utils')
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  stock: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true,
    trim: true
  }
}, {
  timestamps: true
})

ProductSchema.index({ name: 'text' })

module.exports = mongoose.model(CollectionNames.Products, ProductSchema);