const { ProductRepository } = require("../../../src/db/repositories");
const { Product } = require("../../../src/models");

const productMock = {
  id: "650c7586741867a8fdbd4b83",
  name: "Monitor 49 pulgadas",
  price: 950.5,
  stock: 200
}

describe('ProductRepository test suite', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a product', async () => {
    jest.spyOn(Product, 'create').mockResolvedValue(productMock);
    const product = await ProductRepository.create(productMock);
    expect(product).toEqual(productMock);
  })

  it('should find a product by price', async () => {
    jest.spyOn(Product, 'findOne').mockResolvedValue(productMock);
    const product = await ProductRepository.findOne('price', productMock.price);
    expect(product).toEqual(productMock);
  })

  it('should find a product by id', async () => {
    jest.spyOn(Product, 'findById').mockResolvedValue(productMock);
    const product = await ProductRepository.findById(productMock.id);
    expect(product).toEqual(productMock);
  })

  it('should find all products', async () => {
    jest.spyOn(Product, 'find').mockReturnValue({ exec: jest.fn().mockResolvedValue([productMock]) });
    const products = await ProductRepository.find();
    expect(products).toEqual([productMock]);
  })

  it('should find all products with limit query', async () => {
    jest.spyOn(Product, 'find').mockReturnValue({
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue([productMock]),
    });
    const queries = { name: 'monitor' };
    const options = { limit: 10 };
    const products = await ProductRepository.find(queries, options);
    expect(products).toEqual([productMock]);
  })

  it('should find and update product by id', async () => {
    jest.spyOn(Product, 'findByIdAndUpdate').mockResolvedValue({ ...productMock, name: "PS4" });
    const product = await ProductRepository.findByIdAndUpdate(productMock.id, { name: 'PS4' });
    expect(product.name).toEqual('PS4');
  })

  it('should find and delete product by id', async () => {
    jest.spyOn(Product, 'findByIdAndDelete').mockResolvedValue(productMock);
    const product = await ProductRepository.findByIdAndDelete(productMock.id);
    expect(product).toEqual(productMock);
  })
})


// ProductRepository.test.js
// const sinon = require('sinon');
// const Product = require('./Product');
// const ProductRepository = require('./ProductRepository');

// describe('ProductRepository', () => {
//   describe('find', () => {
//     let productFindSpy;

//     beforeEach(() => {
//       productFindSpy = jest.spyOn(Product, 'find');
//     });

//     afterEach(() => {
//       productFindSpy.mockRestore();
//     });

//     it('should call Product.find with the correct queries', async () => {
//       const queries = { name: 'Test Product' };
//       await ProductRepository.find(queries);
//       expect(productFindSpy).toHaveBeenCalledWith(queries);
//     });

//     it('should call Product.find with the correct limit', async () => {
//       const queries = { name: 'Test Product' };
//       const options = { limit: 10 };
//       await ProductRepository.find(queries, options);
//       expect(productFindSpy).toHaveBeenCalledWith(queries);
//       expect(productFindSpy).toHaveBeenCalledWith(expect.objectContaining({ limit: options.limit }));
//     });

//     it('should return the result of Product.find', async () => {
//       const queries = { name: 'Test Product' };
//       const products = [{ name: 'Test Product 1' }, { name: 'Test Product 2' }];
//       productFindSpy.mockReturnValue({ exec: jest.fn().mockResolvedValue(products) });
//       const result = await ProductRepository.find(queries);
//       expect(result).toEqual(products);
//     });
//   });
// });
