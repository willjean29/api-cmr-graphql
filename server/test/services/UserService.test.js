const { UserService } = require("../../src/services");
const { UserRepository } = require("../../src/db/repositories");
const { BcryptHashProvider } = require("../../src/providers/HashProvider");
const { JwtSecretProvider } = require("../../src/providers/SecretProvider");

describe('UserService test suite', () => {
  let findOneSpy;
  let createSpy;
  let generateSpy;
  let compareSpy;

  const idMock = "5f9d4f8b2c3b3b1b1c9f4c4d";
  const hashPasswordMock = "hashed_password";
  const tokenMock = "token.secret.app";

  beforeEach(() => {
    findOneSpy = jest.spyOn(UserRepository, 'findOne').mockResolvedValue(null);
    createSpy = jest.spyOn(UserRepository, 'create');
    generateSpy = jest.spyOn(BcryptHashProvider, 'generate').mockResolvedValue(hashPasswordMock);
    compareSpy = jest.spyOn(BcryptHashProvider, 'compare');
    secretSignSpy = jest.spyOn(JwtSecretProvider, 'sign').mockReturnValue(tokenMock);
    secretVerifySpy = jest.spyOn(JwtSecretProvider, 'verify').mockReturnValue({ id: idMock });
  });

  afterEach(() => {
    findOneSpy.mockRestore();
    createSpy.mockRestore();
    generateSpy.mockRestore();
    compareSpy.mockRestore();
    secretSignSpy.mockRestore();
    secretVerifySpy.mockRestore();
  });

  describe('createUser', () => {
    const userDtoMock = {
      email: "paul@gmail.com",
      lastName: "torres",
      name: "paul",
      password: "123456"
    }

    it('should create a user', async () => {
      findOneSpy.mockResolvedValue(null);
      createSpy.mockResolvedValue({
        _id: idMock,
        ...userDtoMock
      });
      const user = await UserService.createUser(userDtoMock);
      expect(user._id).toEqual(idMock);
    })

    it('should not create a user if already exists', async () => {
      findOneSpy.mockResolvedValue({ _id: idMock, ...userDtoMock });
      try {
        await UserService.createUser(userDtoMock);
      } catch (error) {
        expect(error.message).toEqual(`User ${userDtoMock.email} already exists`);
      }
    })

    it('should throw an error if create user fails', async () => {
      const error = new Error('Failed to create user');
      createSpy.mockRejectedValue(error);
      let response;
      try {
        response = await UserService.createUser(userDtoMock);
      } catch (error) {
        expect(response).toBeUndefined();
      }
    });
  })

  describe('signIn', () => {
    const signInDtoMock = {
      email: "test@gmail.com",
      password: "123456"
    }
    it("should return a token", async () => {
      findOneSpy.mockResolvedValue({
        _id: idMock,
        ...signInDtoMock,
        password: hashPasswordMock
      });
      compareSpy.mockResolvedValue(true);
      const response = await UserService.signIn(signInDtoMock);
      expect(response.token).toBeDefined();
    })

    it('should throw an error if user not exists', async () => {
      try {
        await UserService.signIn(signInDtoMock);
      } catch (error) {
        expect(error.message).toEqual('User not exists');
      }
    })

    it('should not sign in a user with invalid credentials', async () => {
      findOneSpy.mockResolvedValue({
        _id: idMock,
        ...signInDtoMock,
        password: hashPasswordMock
      });
      compareSpy.mockResolvedValue(false);
      try {
        await UserService.signIn(signInDtoMock);
      } catch (error) {
        expect(error.message).toEqual('Invalid password');
      }
    })
  })

  describe('getUser', () => {
    it('should return a user', async () => {
      const user = await UserService.getUser(tokenMock);
      expect(user.id).toEqual(idMock);
    })
  })
})
