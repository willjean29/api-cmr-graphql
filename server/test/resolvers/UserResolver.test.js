const { UserService } = require("../../src/services");
const resolvers = require("../../src/resolvers");

const UserResolver = resolvers[0];

describe('UserResolver test suite', () => {
  let getUserSpy;
  let createUserSpy;
  let signInSpy;

  const userMock = {
    id: "123",
    email: "paul@gmail.com",
    lastName: "torres",
    name: "paul",
  }
  const tokenMock = "tokenMock"

  beforeEach(() => {
    getUserSpy = jest.spyOn(UserService, 'getUser');
    createUserSpy = jest.spyOn(UserService, 'createUser');
    signInSpy = jest.spyOn(UserService, 'signIn');
  });

  afterEach(() => {
    getUserSpy.mockRestore();
    createUserSpy.mockRestore();
    signInSpy.mockRestore();
  });

  describe('Queries', () => {
    it("should return a user", () => {
      getUserSpy.mockReturnValue(userMock);
      UserResolver.Query.getUser({}, { token: tokenMock })
      expect(getUserSpy).toHaveBeenCalledWith(tokenMock);
    })
  })

  describe('Mutations', () => {
    it("should create a user", () => {
      createUserSpy.mockReturnValue(userMock);
      UserResolver.Mutation.createUser({}, { userDto: userMock })
      expect(createUserSpy).toHaveBeenCalledWith(userMock);
    })

    it("should sign in a user", () => {
      signInSpy.mockReturnValue(userMock);
      UserResolver.Mutation.signIn({}, { signInDto: userMock })
      expect(signInSpy).toHaveBeenCalledWith(userMock);
    })
  })
})
