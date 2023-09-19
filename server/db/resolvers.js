const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { APP_SECRET } = require("../config");
const Product = require("../models/Product");
const Customer = require("../models/Customer");
const generateToken = (payload, secret, expiresIn) => {
  const token = jwt.sign(payload, secret, { expiresIn });
  return token;
}

const resolvers = {
  Query: {
    getUser: (_, { token }) => {
      const user = jwt.verify(token, APP_SECRET);
      return user;
    },
    getProducts: async () => {
      try {
        const products = await Product.find({});
        return products;
      } catch (error) {
        console.log(error);
      }
    },
    getProductsById: async (_, { id }) => {
      const product = await Product.findById(id);
      if (!product) {
        throw new Error("Product not found");
      }
      return product;
    },
    getCustomers: async () => {
      try {
        const customers = await Customer.find({});
        return customers;
      } catch (error) {
        console.log({ error });
      }
    },
    getCustomersBySeller: async (_, { }, ctx) => {
      try {
        const customers = await Customer.find({ seller: ctx.user.id.toString() });
        return customers;
      } catch (error) {
        console.log(error)
      }
    },
    getCustomersById: async (_, { id }, ctx) => {
      const customer = await Customer.findById(id);
      if (!customer) {
        throw new Error("Customer not found");
      }
      if (customer.seller.toString() !== ctx.user.id) {
        throw new Error("Unauthorized");
      }
      return customer;
    }
  },
  Mutation: {
    createUser: async (_, { userDto }, ctx) => {
      const { email, password } = userDto;
      const isExist = await User.findOne({ email });
      if (isExist) {
        throw new Error(`User ${email} already exists`)
      }
      const salt = await bcryptjs.genSalt(10);
      userDto.password = await bcryptjs.hash(password, salt);
      try {
        const user = new User(userDto);
        await user.save();
        console.log({ user })
        return user;
      } catch (error) {
        console.log(error)
      }
      return "Creando usuario";
    },
    signIn: async (_, { signInDto }) => {
      const { email, password } = signInDto;
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not exists')
      }
      const isCorrectPassword = await bcryptjs.compare(password, user.password);

      if (!isCorrectPassword) {
        throw new Error('Invalid password')
      }

      const token = generateToken({ id: user._id }, APP_SECRET, '24H');

      return {
        token
      }
    },
    createProduct: async (_, { productDto }) => {
      try {
        const product = new Product(productDto);
        await product.save();
        return product;
      } catch (error) {
        console.log({ error });
      }
    },
    updateProduct: async (_, { id, productDto }) => {
      let product = await Product.findById(id);
      if (!product) {
        throw new Error("Product not found");
      }

      product = await Product.findByIdAndUpdate({ _id: id }, productDto, { new: true });

      return product;
    },
    deleteProduct: async (_, { id }) => {
      let product = await Product.findById(id);
      if (!product) {
        throw new Error("Product not found");
      }

      await Product.findByIdAndDelete(id);
      return product;
    },
    createCustomer: async (_, { customerDto }, ctx) => {
      const { email } = customerDto;
      const customer = await Customer.findOne({ email });
      if (customer) {
        throw new Error("Customer already exists");
      }
      const newCustomer = new Customer(customerDto);
      newCustomer.seller = ctx.user.id;
      try {
        await newCustomer.save();
        return newCustomer;
      } catch (error) {
        console.log({ error });
      }
    },
    updateCustomer: async (_, { id, customerDto }, ctx) => {
      let customer = await Customer.findById(id);
      if (!customer) {
        throw new Error("Customer not found")
      }

      if (customer.seller.toString() !== ctx.user.id) {
        throw new Error("Unauthorized")
      }

      customer = Customer.findByIdAndUpdate({ _id: id }, customerDto, { new: true });

      return customer;
    },
    deleteCustomer: async (_, { id }, ctx) => {
      let customer = await Customer.findById(id);
      if (!customer) {
        throw new Error("Customer not found")
      }

      if (customer.seller.toString() !== ctx.user.id) {
        throw new Error("Unauthorized")
      }

      await Customer.findByIdAndDelete(id);

      return customer;
    }
  }
}

module.exports = resolvers;