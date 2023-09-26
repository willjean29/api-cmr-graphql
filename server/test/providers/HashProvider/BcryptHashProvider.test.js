const bcryptjs = require("bcryptjs");
const { BcryptHashProvider } = require("../../../src/providers/HashProvider")
describe('BcryptHashProvider', () => {
  let genSaltSpy;
  let hashSpy;
  let compareSpy;

  beforeEach(() => {
    genSaltSpy = jest.spyOn(bcryptjs, 'genSalt');
    hashSpy = jest.spyOn(bcryptjs, 'hash');
    compareSpy = jest.spyOn(bcryptjs, 'compare');
  });

  afterEach(() => {
    genSaltSpy.mockRestore();
    hashSpy.mockRestore();
    compareSpy.mockRestore();
  });

  it("should generate a hash password", async () => {
    const saltMock = "secret_salt";
    const hashMock = "secret_hash";
    const passwordMock = "password";
    genSaltSpy.mockResolvedValue(saltMock);
    hashSpy.mockResolvedValue(hashMock);
    const result = await BcryptHashProvider.generate(passwordMock);
    expect(result).toEqual(hashMock);
  })

  it("should compare hash password", async () => {
    const isEqualPassword = true;
    const passwordMock = "password";
    const hashPasswordMock = "secret_hash";
    compareSpy.mockResolvedValue(isEqualPassword);
    const result = await BcryptHashProvider.compare(passwordMock, hashPasswordMock);
    expect(result).toEqual(true);
  })
})
