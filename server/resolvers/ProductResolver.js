const { ProductRepository } = require("../db/repositories");
const { ProductService } = require("../services");
const productResolvers = {
  Query: {
    getProducts: () => {
      return ProductService.getProducts();
    },
    getProductsById: (_, { id }) => {
      return ProductService.getProductsById(id);
    },
    getProductByName: (_, { name }) => {
      return ProductService.getProductByName(name);
    }
  },
  Mutation: {
    createProduct: (_, { productDto }) => {
      return ProductService.createProduct(productDto);
    },
    updateProduct: (_, { id, productDto }) => {
      return ProductService.updateProduct(id, productDto);
    },
    deleteProduct: (_, { id }) => {
      return ProductService.deleteProduct(id);
    }
  }
}

module.exports = productResolvers;