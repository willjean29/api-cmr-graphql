const { ProductRepository } = require("../../src/db/repositories");
const { ProductService } = require("../../src/services");

describe('ProductService test suite', () => {
  let findSpy;
  let findByIdSpy;
  let createSpy;
  let updateSpy;
  let deleteSpy;

  const productMock = {
    id: "650c7586741867a8fdbd4b83",
    name: "Monitor 49 pulgadas",
    price: 950.5,
    stock: 200
  }

  beforeEach(() => {
    findSpy = jest.spyOn(ProductRepository, 'find');
    findByIdSpy = jest.spyOn(ProductRepository, 'findById');
    createSpy = jest.spyOn(ProductRepository, 'create');
    updateSpy = jest.spyOn(ProductRepository, 'findByIdAndUpdate');
    deleteSpy = jest.spyOn(ProductRepository, 'findByIdAndDelete');
  });

  afterEach(() => {
    findSpy.mockRestore();
    findByIdSpy.mockRestore();
    createSpy.mockRestore();
    updateSpy.mockRestore();
    deleteSpy.mockRestore();
  });

  describe('getProducts', () => {
    it("should return a list of products", async () => {
      findSpy.mockResolvedValue([productMock]);
      const result = await ProductService.getProducts();
      expect(result).toEqual([productMock]);
      expect(findSpy).toHaveBeenCalledWith({});
    })

    it("should throw an error if products not found", async () => {
      const error = new Error('Failed to create user');
      findSpy.mockRejectedValue(error);
      let response;
      try {
        response = await ProductService.getProducts();
      } catch (error) {
        expect(response).tobeUndefined();
      }
    })
  })

  describe("getProductsById", () => {
    it("should return product by id", async () => {
      findByIdSpy.mockResolvedValue(productMock);
      const result = await ProductService.getProductsById(productMock.id);
      expect(result).toEqual(productMock);
      expect(findByIdSpy).toHaveBeenCalledWith(productMock.id);
    })
    it("should throw an error if products not found", async () => {
      findByIdSpy.mockResolvedValue(null);
      try {
        await ProductService.getProductsById(productMock.id);
      } catch (error) {
        expect(error.message).toEqual('Product not found');
      }
    })
  })

  describe("createProduct", () => {
    it("should create a product", async () => {
      createSpy.mockResolvedValue(productMock);
      const result = await ProductService.createProduct(productMock);
      expect(result).toEqual(productMock);
      expect(createSpy).toHaveBeenCalledWith(productMock);
    })
    it("should throw an error if create product fails", async () => {
      const error = new Error('Failed to create product');
      createSpy.mockRejectedValue(error);
      let response;
      try {
        const response = await ProductService.createProduct(productMock);
      } catch (error) {
        expect(response).tobeUndefined();
      }
    })
  })

  describe("updateProduct", () => {
    it("should update a product", async () => {
      findByIdSpy.mockResolvedValue(productMock);
      updateSpy.mockResolvedValue(productMock);
      const result = await ProductService.updateProduct(productMock.id, productMock);
      expect(result).toEqual(productMock);
      expect(updateSpy).toHaveBeenCalledWith(productMock.id, productMock);
    })
  })

  describe('deleteProduct', () => {
    it("should delete a product", async () => {
      findByIdSpy.mockResolvedValue(productMock);
      deleteSpy.mockResolvedValue(productMock);
      const result = await ProductService.deleteProduct(productMock.id);
      expect(result).toEqual(productMock);
      expect(deleteSpy).toHaveBeenCalledWith(productMock.id);
    })
  })

  describe('getProductByName', () => {
    it("should get a products by name", async () => {
      findSpy.mockResolvedValue([productMock]);
      const result = await ProductService.getProductByName(productMock.name);
      expect(result).toEqual([productMock]);
      expect(findSpy).toHaveBeenCalledWith({ $text: { $search: productMock.name } }, { limit: 10 });
    })
  })
})