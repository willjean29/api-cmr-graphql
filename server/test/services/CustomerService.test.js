const { CustomerRepository } = require("../../src/db/repositories");
const { CustomerService } = require("../../src/services");

describe('CustomerService test suite', () => {
  let findSpy;
  let findOneSpy;
  let findByIdSpy;
  let createSpy;
  let updateSpy;
  let deleteSpy;

  const customerMock = {
    id: "6509d3475af0ebc2093d9f45",
    email: "jean@gmail.com",
    business: "unmsm",
    lastName: "pipo",
    name: "jean",
    phone: "4848484",
    seller: "6509a2bf067e8a7f9ad2aa4f"
  }

  const ctxMock = {
    user: {
      id: customerMock.seller
    }
  }

  beforeEach(() => {
    findSpy = jest.spyOn(CustomerRepository, 'find');
    findOneSpy = jest.spyOn(CustomerRepository, 'findOne');
    findByIdSpy = jest.spyOn(CustomerRepository, 'findById');
    createSpy = jest.spyOn(CustomerRepository, 'create');
    updateSpy = jest.spyOn(CustomerRepository, 'findByIdAndUpdate');
    deleteSpy = jest.spyOn(CustomerRepository, 'findByIdAndDelete');
  });

  afterEach(() => {
    findSpy.mockRestore();
    findByIdSpy.mockRestore();
    createSpy.mockRestore();
    updateSpy.mockRestore();
    deleteSpy.mockRestore();
  });

  describe('getCustomers', () => {
    it("should return customers", async () => {
      findSpy.mockResolvedValue([customerMock]);
      const result = await CustomerService.getCustomers();
      expect(result).toEqual([customerMock]);
      expect(findSpy).toHaveBeenCalledWith({});
    })

    it("should throw an error if get customers fails", async () => {
      const error = new Error('Failed to get customers');
      findSpy.mockRejectedValue(error);
      let response;
      try {
        response = await CustomerService.getCustomers();
      } catch (error) {
        expect(response).toBeUndefined();
      }
    })
  })

  describe('getCustomersById', () => {
    it("should return customer by id", async () => {
      findByIdSpy.mockResolvedValue(customerMock);
      const result = await CustomerService.getCustomersById(customerMock.id, ctxMock);
      expect(result).toEqual(customerMock);
      expect(findByIdSpy).toHaveBeenCalledWith(customerMock.id);
    })

    it("should throw an error if customer not found", async () => {
      findByIdSpy.mockResolvedValue(null);
      try {
        await CustomerService.getCustomersById(customerMock.id, ctxMock);
      } catch (error) {
        expect(error.message).toEqual('Customer not found');
      }
    })

    it("should throw an error if customer is not from the seller", async () => {
      findByIdSpy.mockResolvedValue({ ...customerMock, seller: "other seller" });
      try {
        await CustomerService.getCustomersById(customerMock.id, ctxMock);
      } catch (error) {
        expect(error.message).toEqual('Unauthorized');
      }
    })
  })

  describe('createCustomer', () => {
    it("should create a customer", async () => {
      findOneSpy.mockResolvedValue(null);
      createSpy.mockResolvedValue(customerMock);
      const result = await CustomerService.createCustomer(customerMock, ctxMock);
      expect(result).toEqual(customerMock);
      expect(createSpy).toHaveBeenCalledWith({ ...customerMock, seller: ctxMock.user.id });
    })

    it("should throw an error if costumer already exists", async () => {
      findOneSpy.mockResolvedValue(customerMock);
      try {
        await CustomerService.createCustomer(customerMock, ctxMock);
      } catch (error) {
        expect(error.message).toEqual('Customer already exists');
      }
    })

    it("should throw an error if create customer fails", async () => {
      findOneSpy.mockResolvedValue(null);
      const error = new Error('Failed to create customer');
      createSpy.mockRejectedValue(error);
      let response;
      try {
        response = await CustomerService.createCustomer(customerMock, ctxMock);
      } catch (error) {
        expect(response).toBeUndefined();
      }
    })
  })

  describe('updateCustomer', () => {
    it("should update a customer", async () => {
      findByIdSpy.mockResolvedValue(customerMock);
      updateSpy.mockResolvedValue(customerMock);
      const result = await CustomerService.updateCustomer(customerMock.id, customerMock, ctxMock);
      expect(result).toEqual(customerMock);
      expect(updateSpy).toHaveBeenCalledWith(customerMock.id, customerMock);
    })
  })

  describe('deleteCustomer', () => {
    it("should delete a customer", async () => {
      findByIdSpy.mockResolvedValue(customerMock);
      deleteSpy.mockResolvedValue(customerMock);
      const result = await CustomerService.deleteCustomer(customerMock.id, ctxMock);
      expect(result).toEqual(customerMock);
      expect(deleteSpy).toHaveBeenCalledWith(customerMock.id);
    })
  })

  describe('getCustomersBySeller', () => {
    it("should return customers by seller", async () => {
      findSpy.mockResolvedValue([customerMock]);
      const result = await CustomerService.getCustomersBySeller(ctxMock);
      expect(result).toEqual([customerMock]);
      expect(findSpy).toHaveBeenCalledWith({ seller: ctxMock.user.id.toString() });
    })
    it("should throw an error if get customers by seller fails", async () => {
      const error = new Error('Failed to get customers by seller');
      findSpy.mockRejectedValue(error);
      let response;
      try {
        response = await CustomerService.getCustomersBySeller(ctxMock);
      } catch (error) {
        expect(response).toBeUndefined();
      }
    })
  })

})