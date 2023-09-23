const { UserRepository } = require("../../../src/db/repositories");
const { User } = require("../../../src/models");

const userMock = {
  _id: "123456",
  email: "paul@gmail.com",
  lastName: "torres",
  name: "paul",
  password: "123456"
}

describe('UserRepository test suite', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a user', async () => {
    jest.spyOn(User, 'create').mockResolvedValue(userMock);
    const user = await UserRepository.create(userMock);
    expect(user).toEqual(userMock);
  })

  it('should find a user by email', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValue(userMock);
    const user = await UserRepository.findOne('email', userMock.email);
    expect(user).toEqual(userMock);
  })
})
