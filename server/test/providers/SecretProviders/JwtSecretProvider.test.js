const jwt = require("jsonwebtoken")
const { JwtSecretProvider } = require("../../../src/providers/SecretProvider")

describe('JwtSecretProvider', () => {
  let signSpy;
  let verifySpy;

  const payloadMock = {
    id: "123",
  }
  const secretMock = "secret";
  const expiresInMock = "1d";
  const tokenMock = "token";

  beforeEach(() => {
    signSpy = jest.spyOn(jwt, 'sign');
    verifySpy = jest.spyOn(jwt, 'verify');
  });

  afterEach(() => {
    signSpy.mockRestore();
    verifySpy.mockRestore();
  });

  it("should return a JWT", () => {
    signSpy.mockReturnValue(tokenMock);
    const result = JwtSecretProvider.sign(payloadMock, secretMock, { expiresIn: expiresInMock });
    expect(result).toEqual(tokenMock);
  })

  it("should verify that the JWT is valid", () => {
    verifySpy.mockReturnValue(payloadMock);
    const result = JwtSecretProvider.verify(tokenMock, secretMock);
    expect(result).toEqual(payloadMock);
  })
})
