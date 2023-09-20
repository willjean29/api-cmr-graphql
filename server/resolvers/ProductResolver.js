const Product = require("../models/Product");

const productResolvers = {
  Query: {
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
    getProductByName: async (_, { name }, ctx) => {
      const products = await Product.find({ $text: { $search: name } }).limit(10);
      return products;
    }
  },
  Mutation: {
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
    }
  }
}

module.exports = productResolvers;