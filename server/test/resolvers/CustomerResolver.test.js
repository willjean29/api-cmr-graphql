const { CustomerService } = require("../../src/services");
const CustomerResolver = require("../../src/resolvers/CustomerResolver");

describe('CustomerResolver test suite', () => {
  let getCustomersSpy;
  let getCustomersBySellerSpy;
  let getCustomersByIdSpy;
  let createCustomerSpy;
  let updateCustomerSpy;
  let deleteCustomerSpy;

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
    getCustomersSpy = jest.spyOn(CustomerService, 'getCustomers');
    getCustomersBySellerSpy = jest.spyOn(CustomerService, 'getCustomersBySeller');
    getCustomersByIdSpy = jest.spyOn(CustomerService, 'getCustomersById');
    createCustomerSpy = jest.spyOn(CustomerService, 'createCustomer');
    updateCustomerSpy = jest.spyOn(CustomerService, 'updateCustomer');
    deleteCustomerSpy = jest.spyOn(CustomerService, 'deleteCustomer');
  });

  afterEach(() => {
    getCustomersSpy.mockRestore();
    getCustomersBySellerSpy.mockRestore();
    getCustomersByIdSpy.mockRestore();
    createCustomerSpy.mockRestore();
    updateCustomerSpy.mockRestore();
    deleteCustomerSpy.mockRestore();
  });

  describe('Queries', () => {
    it("should return a list of customers", () => {
      getCustomersSpy.mockReturnValue([customerMock]);
      CustomerResolver.Query.getCustomers();
      expect(getCustomersSpy).toHaveBeenCalled();
    })

    it("should return a list of customers by seller", () => {
      getCustomersBySellerSpy.mockReturnValue([customerMock]);
      CustomerResolver.Query.getCustomersBySeller({}, {}, ctxMock);
      expect(getCustomersBySellerSpy).toHaveBeenCalledWith(ctxMock);
    })

    it("should return a customer by id", () => {
      getCustomersByIdSpy.mockReturnValue(customerMock);
      CustomerResolver.Query.getCustomersById({}, { id: customerMock.id }, ctxMock);
      expect(getCustomersByIdSpy).toHaveBeenCalledWith(customerMock.id, ctxMock);
    })
  })

  describe('Mutations', () => {
    it("should create a customer", () => {
      createCustomerSpy.mockReturnValue(customerMock);
      CustomerResolver.Mutation.createCustomer({}, { customerDto: customerMock }, ctxMock);
      expect(createCustomerSpy).toHaveBeenCalledWith(customerMock, ctxMock);
    })

    it("should update a customer", () => {
      updateCustomerSpy.mockReturnValue(customerMock);
      CustomerResolver.Mutation.updateCustomer({}, { id: customerMock.id, customerDto: customerMock }, ctxMock);
      expect(updateCustomerSpy).toHaveBeenCalledWith(customerMock.id, customerMock, ctxMock);
    })

    it("should delete a customer", () => {
      deleteCustomerSpy.mockReturnValue(customerMock);
      CustomerResolver.Mutation.deleteCustomer({}, { id: customerMock.id }, ctxMock);
      expect(deleteCustomerSpy).toHaveBeenCalledWith(customerMock.id, ctxMock);
    })
  })
})
