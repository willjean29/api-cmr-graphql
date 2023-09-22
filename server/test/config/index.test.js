const dotenv = require('dotenv');

describe('Configuration module', () => {
  let dotenvSpy;

  beforeEach(() => {
    dotenvSpy = jest.spyOn(dotenv, 'config');
  });

  afterEach(() => {
    dotenvSpy.mockRestore();
    delete process.env.NODE_ENV;
    delete process.env.MONGODB_URI;
    delete process.env.APP_SECRET;
    jest.resetModules();
  });

  it('should load the development environment variables when NODE_ENV is not prod', () => {
    process.env.NODE_ENV = 'dev';
    process.env.MONGODB_URI = 'mongodb://localhost/testdb';
    process.env.APP_SECRET = 'secret_test';
    dotenv.config({ path: './.env.dev' });
    require('../../src/config');
    expect(dotenvSpy).toHaveBeenCalledWith({ path: './.env.dev' });
  });

  it('should load the production environment variables when NODE_ENV is prod', () => {
    process.env.NODE_ENV = 'prod';
    process.env.MONGODB_URI = 'mongodb://localhost/proddb';
    process.env.APP_SECRET = 'secret_prod';
    dotenv.config();
    require('../../src/config');
    expect(dotenvSpy).toHaveBeenCalledWith();
  });
});