const { OrderRepository } = require("../../../src/db/repositories");
const { Order } = require("../../../src/models");

const orderMock = {
  id: "650a120a22e7f53e2ae504c0",
  order: [
    {
      id: "6509a8d1e4775d74b6b06716",
      qty: 50
    }
  ],
  seller: "6509a2bf067e8a7f9ad2aa4f",
  status: "completed",
  total: 400,
  customer: "6509d3475af0ebc2093d9f4"
}

describe('OrderRepository test suite', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a order', async () => {
    jest.spyOn(Order, 'create').mockResolvedValue(orderMock);
    const order = await OrderRepository.create(orderMock);
    expect(order).toEqual(orderMock);
  })

  it('should find a order by id', async () => {
    jest.spyOn(Order, 'findById').mockResolvedValue(orderMock);
    const order = await OrderRepository.findById(orderMock.id);
    expect(order).toEqual(orderMock);
  })

  it('should find all orders', async () => {
    jest.spyOn(Order, 'find').mockResolvedValue([orderMock]);
    const orders = await OrderRepository.find();
    expect(orders).toEqual([orderMock]);
  })

  it('should find all orders with top sellers', async () => {
    jest.spyOn(Order, 'aggregate').mockResolvedValue([orderMock]);
    const orders = await OrderRepository.findTopSeller();
    expect(orders).toEqual([orderMock]);
  })

  it('should find all orders with top customers', async () => {
    jest.spyOn(Order, 'aggregate').mockResolvedValue([orderMock]);
    const orders = await OrderRepository.findTopCustomer();
    expect(orders).toEqual([orderMock]);
  })

  it('should find and update order by id', async () => {
    jest.spyOn(Order, 'findByIdAndUpdate').mockResolvedValue({ ...orderMock, total: 1500 });
    const order = await OrderRepository.findByIdAndUpdate(orderMock.id, { total: 1500 });
    expect(order.total).toEqual(1500);
  })

  it('should find and delete product by id', async () => {
    jest.spyOn(Order, 'findByIdAndDelete').mockResolvedValue(orderMock);
    const order = await OrderRepository.findByIdAndDelete(orderMock.id);
    expect(order).toEqual(orderMock);
  })
})
