const { ProductService } = require("../../src/services");
const ProductResolver = require("../../src/resolvers/ProductResolver");

describe('ProductResolver test suite', () => {
  let getProductsSpy;
  let getProductsByIdSpy;
  let getProductByNameSpy;
  let createProductSpy;
  let updateProductSpy;
  let deleteProductSpy;

  const productMock = {
    id: "650c7586741867a8fdbd4b83",
    name: "Monitor 49 pulgadas",
    price: 950.5,
    stock: 200
  }

  beforeEach(() => {
    getProductsSpy = jest.spyOn(ProductService, 'getProducts');
    getProductsByIdSpy = jest.spyOn(ProductService, 'getProductsById');
    getProductByNameSpy = jest.spyOn(ProductService, 'getProductByName');
    createProductSpy = jest.spyOn(ProductService, 'createProduct');
    updateProductSpy = jest.spyOn(ProductService, 'updateProduct');
    deleteProductSpy = jest.spyOn(ProductService, 'deleteProduct');
  });

  afterEach(() => {
    getProductsSpy.mockRestore();
    getProductsByIdSpy.mockRestore();
    getProductByNameSpy.mockRestore();
    createProductSpy.mockRestore();
    updateProductSpy.mockRestore();
    deleteProductSpy.mockRestore();
  });

  describe('Queries', () => {
    it('should return a list of products', () => {
      getProductsSpy.mockReturnValue([productMock]);
      ProductResolver.Query.getProducts();
      expect(getProductsSpy).toHaveBeenCalled();
    })

    it("should return a product by id", () => {
      getProductsByIdSpy.mockReturnValue(productMock);
      ProductResolver.Query.getProductsById({}, { id: productMock.id });
      expect(getProductsByIdSpy).toHaveBeenCalledWith(productMock.id);
    })

    it("should return a product by name", () => {
      getProductByNameSpy.mockReturnValue(productMock);
      ProductResolver.Query.getProductByName({}, { name: productMock.name });
      expect(getProductByNameSpy).toHaveBeenCalledWith(productMock.name);
    })
  })

  describe('Mutations', () => {
    it("should create a product", () => {
      createProductSpy.mockReturnValue(productMock);
      ProductResolver.Mutation.createProduct({}, { productDto: productMock });
      expect(createProductSpy).toHaveBeenCalledWith(productMock);
    })

    it("should update a product", () => {
      updateProductSpy.mockReturnValue(productMock);
      ProductResolver.Mutation.updateProduct({}, { id: productMock.id, productDto: productMock });
      expect(updateProductSpy).toHaveBeenCalledWith(productMock.id, productMock);
    })

    it("should delete a product", () => {
      deleteProductSpy.mockReturnValue(productMock);
      ProductResolver.Mutation.deleteProduct({}, { id: productMock.id });
      expect(deleteProductSpy).toHaveBeenCalledWith(productMock.id);
    })
  })
})
