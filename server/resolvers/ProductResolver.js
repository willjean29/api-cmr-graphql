const { ProductRepository } = require("../db/repositories");
const productResolvers = {
  Query: {
    getProducts: async () => {
      try {
        const products = await ProductRepository.find({});
        return products;
      } catch (error) {
        console.log(error);
      }
    },
    getProductsById: async (_, { id }) => {
      const product = await ProductRepository.findById(id);
      if (!product) {
        throw new Error("Product not found");
      }
      return product;
    },
    getProductByName: async (_, { name }, ctx) => {
      const products = await ProductRepository.find({ $text: { $search: name } }).limit(10);
      return products;
    }
  },
  Mutation: {
    createProduct: async (_, { productDto }) => {
      try {
        const product = await ProductRepository.create(productDto);
        await product.save();
        return product;
      } catch (error) {
        console.log({ error });
      }
    },
    updateProduct: async (_, { id, productDto }) => {
      let product = await ProductRepository.findById(id);
      if (!product) {
        throw new Error("Product not found");
      }

      product = await ProductRepository.findByIdAndUpdate(id, productDto);

      return product;
    },
    deleteProduct: async (_, { id }) => {
      let product = await ProductRepository.findById(id);
      if (!product) {
        throw new Error("Product not found");
      }

      await ProductRepository.findByIdAndDelete(id);
      return product;
    }
  }
}

module.exports = productResolvers;