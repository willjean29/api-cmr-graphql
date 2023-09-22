const mongoose = require('mongoose')
const { CollectionNames } = require('../utils')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
})



module.exports = mongoose.model(CollectionNames.Users, UserSchema);