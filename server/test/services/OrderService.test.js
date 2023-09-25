const { OrderRepository } = require("../../src/db/repositories");
const { OrderService, CustomerService, ProductService } = require("../../src/services");

describe('OrderService', () => {
  let findSpy;
  let findByIdSpy;
  let findTopCustomerSpy;
  let findTopSellerSpy;
  let createSpy;
  let updateSpy;
  let deleteSpy;

  let getCustomersByIdSpy;
  let getProductsByIdSpy;
  let updateProductSpy;

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

  const customerMock = {
    id: "6509d3475af0ebc2093d9f45",
    email: "jean@gmail.com",
    business: "unmsm",
    lastName: "pipo",
    name: "jean",
    phone: "4848484",
    seller: "6509a2bf067e8a7f9ad2aa4f"
  }

  const productMock = {
    id: "650c7586741867a8fdbd4b83",
    name: "Monitor 49 pulgadas",
    price: 950.5,
    stock: 200
  }

  beforeEach(() => {
    findSpy = jest.spyOn(OrderRepository, 'find');
    findByIdSpy = jest.spyOn(OrderRepository, 'findById');
    findTopCustomerSpy = jest.spyOn(OrderRepository, 'findTopCustomer');
    findTopSellerSpy = jest.spyOn(OrderRepository, 'findTopSeller');
    createSpy = jest.spyOn(OrderRepository, 'create');
    updateSpy = jest.spyOn(OrderRepository, 'findByIdAndUpdate');
    deleteSpy = jest.spyOn(OrderRepository, 'findByIdAndDelete');

    getCustomersByIdSpy = jest.spyOn(CustomerService, 'getCustomersById');
    getProductsByIdSpy = jest.spyOn(ProductService, 'getProductsById');
    updateProductSpy = jest.spyOn(ProductService, 'updateProduct');
  });

  afterEach(() => {
    findSpy.mockRestore();
    findByIdSpy.mockRestore();
    findTopCustomerSpy.mockRestore();
    findTopSellerSpy.mockRestore();
    createSpy.mockRestore();
    deleteSpy.mockRestore();

    getCustomersByIdSpy.mockRestore();
    getProductsByIdSpy.mockRestore();
    updateProductSpy.mockRestore();
  });

  describe('getOrders', () => {
    it("should return all orders", async () => {
      findSpy.mockResolvedValue([orderMock]);
      const orders = await OrderService.getOrders();
      expect(orders).toEqual([orderMock]);
    })

    it("should throw if get orders fails", async () => {
      findSpy.mockRejectedValue(new Error("Error"));
      let response;
      try {
        response = await OrderService.getOrders();
      } catch (error) {
        expect(response).toBeUndefined();
      }
    })
  })

  describe('getOrdersBySeller', () => {
    it("should return all orders by seller", async () => {
      findSpy.mockResolvedValue([orderMock]);
      const orders = await OrderService.getOrdersBySeller(ctxMock);
      expect(orders).toEqual([orderMock]);
    })

    it("should throw if get orders by seller fails", async () => {
      findSpy.mockRejectedValue(new Error("Error"));
      let response;
      try {
        response = await OrderService.getOrdersBySeller(ctxMock);
      } catch (error) {
        expect(response).toBeUndefined();
      }
    })
  })

  describe('getOrdersById', () => {
    it("should return an order by id", async () => {
      findByIdSpy.mockResolvedValue(orderMock);
      const order = await OrderService.getOrdersById(orderMock.id, ctxMock);
      expect(order).toEqual(orderMock);
    })

    it("should throw if order by id not found", async () => {
      findByIdSpy.mockResolvedValue(null);
      try {
        await OrderService.getOrdersById(orderMock.id, ctxMock);
      } catch (error) {
        expect(error.message).toEqual("Order not found");
      }
    })

    it("should throw if seller does not match", async () => {
      findByIdSpy.mockResolvedValue(orderMock);
      ctxMock.user.id = "6509d3475af0ebc2093d9f45";
      try {
        await OrderService.getOrdersById(orderMock.id, ctxMock);
      } catch (error) {
        expect(error.message).toEqual("Unauthorized");
      }
    })
  })

  describe('getOrdersByStatus', () => {
    it("should return all orders by status", async () => {
      findSpy.mockResolvedValue([orderMock]);
      const orders = await OrderService.getOrdersByStatus(orderMock.status, ctxMock);
      expect(orders).toEqual([orderMock]);
    })

    it("should throw if get orders by status fails", async () => {
      findSpy.mockRejectedValue(new Error("Error"));
      let response;
      try {
        response = await OrderService.getOrdersByStatus(orderMock.status, ctxMock);
      } catch (error) {
        expect(response).toBeUndefined();
      }
    })
  })

  describe('getTopCustomers', () => {
    it("should return top customers", async () => {
      findTopCustomerSpy.mockResolvedValue([orderMock]);
      const customers = await OrderService.getTopCustomers();
      expect(customers).toEqual([orderMock]);
    })
  })

  describe('getTopSellers', () => {
    it("should return top sellers", async () => {
      findTopSellerSpy.mockResolvedValue([orderMock]);
      const sellers = await OrderService.getTopSellers();
      expect(sellers).toEqual([orderMock]);
    })
  })

  describe('createOrder', () => {
    it('should create an order with valid data', async () => {
      getCustomersByIdSpy.mockResolvedValue(customerMock);
      getProductsByIdSpy.mockResolvedValue(productMock);
      updateProductSpy.mockResolvedValue({});

      createSpy.mockResolvedValue(orderMock);

      const result = await OrderService.createOrder(orderMock, ctxMock);

      expect(result).toEqual(orderMock);
    });

    it("should throw if an product in order exceeds the quantity in stock", async () => {
      getCustomersByIdSpy.mockResolvedValue(customerMock);
      getProductsByIdSpy.mockResolvedValue(productMock);
      updateProductSpy.mockResolvedValue({});

      orderMock.order[0].qty = 300;

      try {
        await OrderService.createOrder(orderMock, ctxMock);
      } catch (error) {
        console.log({ error })
        expect(error.message).toEqual("The product exceeds the quantity in stock.")
      }
    })
  })

  describe('updateOrder', () => {
    it('should update an order with valid data', async () => {
      orderMock.order[0].qty = 30;
      findByIdSpy.mockResolvedValue(orderMock);
      getCustomersByIdSpy.mockResolvedValue(customerMock);
      getProductsByIdSpy.mockResolvedValue(productMock);
      updateProductSpy.mockResolvedValue({});

      updateSpy.mockResolvedValue(orderMock);

      const result = await OrderService.updateOrder(orderMock.id, orderMock, ctxMock);

      expect(result).toEqual(orderMock);
    });

    it('should update an order with valid data without altering the quantity of products', async () => {
      const orderDtoMock = {
        ...orderMock,
        order: null
      }
      findByIdSpy.mockResolvedValue(orderMock);
      getCustomersByIdSpy.mockResolvedValue(customerMock);
      getProductsByIdSpy.mockResolvedValue(productMock);
      updateProductSpy.mockResolvedValue({});

      updateSpy.mockResolvedValue(orderMock);

      const result = await OrderService.updateOrder(orderMock.id, orderDtoMock, ctxMock);

      expect(result).toEqual(orderMock);
    });

    it("should throw if an product in order exceeds the quantity in stock", async () => {
      findByIdSpy.mockResolvedValue(orderMock);
      getCustomersByIdSpy.mockResolvedValue(customerMock);
      getProductsByIdSpy.mockResolvedValue(productMock);
      updateProductSpy.mockResolvedValue({});

      orderMock.order[0].qty = 300;

      try {
        await OrderService.updateOrder(orderMock.id, orderMock, ctxMock);
      } catch (error) {
        expect(error.message).toEqual("The product exceeds the quantity in stock.")
      }
    })

    it("should throw if order by id not found", async () => {
      findByIdSpy.mockResolvedValue(null);
      try {
        await OrderService.updateOrder(orderMock.id, orderMock, ctxMock);
      } catch (error) {
        expect(error.message).toEqual("Order not found");
      }
    })
  })

  describe('deleteOrder', () => {
    it("should delete an order", async () => {
      ctxMock.user.id = orderMock.seller;
      findByIdSpy.mockResolvedValue(orderMock);
      deleteSpy.mockResolvedValue(orderMock);
      const order = await OrderService.deleteOrder(orderMock.id, ctxMock);
      expect(order).toEqual(orderMock);
    })
  })

})
