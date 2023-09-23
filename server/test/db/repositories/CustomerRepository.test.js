const { CustomerRepository } = require("../../../src/db/repositories");
const { Customer } = require("../../../src/models");

const customerMock = {
  id: "6509d3475af0ebc2093d9f45",
  email: "jean@gmail.com",
  business: "unmsm",
  lastName: "pipo",
  name: "jean",
  phone: "4848484",
  seller: "6509a2bf067e8a7f9ad2aa4f"
}

describe('CustomerRepository test suite', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a customer', async () => {
    jest.spyOn(Customer, 'create').mockResolvedValue(customerMock);
    const customer = await CustomerRepository.create(customerMock);
    expect(customer).toEqual(customerMock);
  })

  it('should find a customer by email', async () => {
    jest.spyOn(Customer, 'findOne').mockResolvedValue(customerMock);
    const customer = await CustomerRepository.findOne('email', customerMock.email);
    expect(customer).toEqual(customerMock);
  })

  it('should find a customer by id', async () => {
    jest.spyOn(Customer, 'findOne').mockResolvedValue(customerMock);
    const customer = await CustomerRepository.findById(customerMock.id);
    expect(customer).toEqual(customerMock);
  })

  it('should find all products', async () => {
    jest.spyOn(Customer, 'find').mockResolvedValue([customerMock]);
    const customers = await CustomerRepository.find();
    expect(customers).toEqual([customerMock]);
  })

  it('should find and update customer by id', async () => {
    jest.spyOn(Customer, 'findByIdAndUpdate').mockResolvedValue({ ...customerMock, name: "pedro" });
    const customer = await CustomerRepository.findByIdAndUpdate(customerMock.id, { name: 'pedro' });
    expect(customer.name).toEqual('pedro');
  })

  it('should find and delete product by id', async () => {
    jest.spyOn(Customer, 'findByIdAndDelete').mockResolvedValue(customerMock);
    const customer = await CustomerRepository.findByIdAndDelete(customerMock.id);
    expect(customer).toEqual(customerMock);
  })
})
