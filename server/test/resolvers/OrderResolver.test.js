const { OrderService } = require("../../src/services");
const OrderResolver = require("../../src/resolvers/OrderResolver");

describe('OrderResolver test suite', () => {
  let getOrdersSpy;
  let getOrdersBySeller;
  let getOrdersByIdSpy;
  let getOrdersByStatusSpy;
  let getTopCustomersSpy;
  let getTopSellersSpy;
  let createOrderSpy;
  let updateOrderSpy;
  let deleteOrderSpy;

  const orderMock = {
    customer: "6509d3475af0ebc2093d9f45",
    id: "650ccc19884a587dc9b80506",
    order: [
      {
        qty: 30,
        id: "650c7586741867a8fdbd4b83"
      }
    ],
    total: 1000,
    status: "pending",
    seller: "6509a2bf067e8a7f9ad2aa4f"
  }

  const ctxMock = {
    user: {
      id: orderMock.seller
    }
  }

  beforeEach(() => {
    getOrdersSpy = jest.spyOn(OrderService, 'getOrders');
    getOrdersBySeller = jest.spyOn(OrderService, 'getOrdersBySeller');
    getOrdersByIdSpy = jest.spyOn(OrderService, 'getOrdersById');
    getOrdersByStatusSpy = jest.spyOn(OrderService, 'getOrdersByStatus');
    getTopCustomersSpy = jest.spyOn(OrderService, 'getTopCustomers');
    getTopSellersSpy = jest.spyOn(OrderService, 'getTopSellers');
    createOrderSpy = jest.spyOn(OrderService, 'createOrder');
    updateOrderSpy = jest.spyOn(OrderService, 'updateOrder');
    deleteOrderSpy = jest.spyOn(OrderService, 'deleteOrder');
  });

  afterEach(() => {
    getOrdersSpy.mockRestore();
    getOrdersBySeller.mockRestore();
    getOrdersByIdSpy.mockRestore();
    getOrdersByStatusSpy.mockRestore();
    getTopCustomersSpy.mockRestore();
    getTopSellersSpy.mockRestore();
    createOrderSpy.mockRestore();
    updateOrderSpy.mockRestore();
    deleteOrderSpy.mockRestore();
  });

  describe('Queries', () => {
    it("should return a list of orders", () => {
      getOrdersSpy.mockReturnValue([orderMock]);
      OrderResolver.Query.getOrders({}, {});
      expect(getOrdersSpy).toHaveBeenCalled();
    })

    it("should return a list of orders by seller", () => {
      getOrdersBySeller.mockReturnValue([orderMock]);
      OrderResolver.Query.getOrdersBySeller({}, {}, ctxMock);
      expect(getOrdersBySeller).toHaveBeenCalledWith(ctxMock);
    })

    it("should return a order by id", () => {
      getOrdersByIdSpy.mockReturnValue(orderMock);
      OrderResolver.Query.getOrdersById({}, { id: orderMock.id }, ctxMock);
      expect(getOrdersByIdSpy).toHaveBeenCalledWith(orderMock.id, ctxMock);
    })

    it("should return a list of orders by status", () => {
      getOrdersByStatusSpy.mockReturnValue([orderMock]);
      OrderResolver.Query.getOrdersByStatus({}, { status: orderMock.status }, ctxMock);
      expect(getOrdersByStatusSpy).toHaveBeenCalledWith(orderMock.status, ctxMock);
    })

    it("should return a list of top customers", () => {
      getTopCustomersSpy.mockReturnValue([orderMock]);
      OrderResolver.Query.getTopCustomers();
      expect(getTopCustomersSpy).toHaveBeenCalled();
    })

    it("should return a list of top sellers", () => {
      getTopSellersSpy.mockReturnValue([orderMock]);
      OrderResolver.Query.getTopSellers();
      expect(getTopSellersSpy).toHaveBeenCalled();
    })
  })

  describe('Mutations', () => {
    it("should create a order", () => {
      createOrderSpy.mockReturnValue(orderMock);
      OrderResolver.Mutation.createOrder({}, { orderDto: orderMock }, ctxMock);
      expect(createOrderSpy).toHaveBeenCalledWith(orderMock, ctxMock);
    })

    it("should update a order", () => {
      updateOrderSpy.mockReturnValue(orderMock);
      OrderResolver.Mutation.updateOrder({}, { id: orderMock.id, orderDto: orderMock }, ctxMock);
      expect(updateOrderSpy).toHaveBeenCalledWith(orderMock.id, orderMock, ctxMock);
    })

    it("should delete a order", () => {
      deleteOrderSpy.mockReturnValue(orderMock);
      OrderResolver.Mutation.deleteOrder({}, { id: orderMock.id }, ctxMock);
      expect(deleteOrderSpy).toHaveBeenCalledWith(orderMock.id, ctxMock);
    })
  })
})
