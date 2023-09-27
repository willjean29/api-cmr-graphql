const mongoDatabaseConnection = require("../../src/db");
const mongoose = require("mongoose");
const { DB_URL } = require('../../src/config');

jest.mock('mongoose');

describe('mongoDatabaseConnection', () => {
  it('should connect to the database', async () => {
    await mongoDatabaseConnection();
    expect(mongoose.connect).toHaveBeenCalledWith(DB_URL);
  });

  it('should handle errors', async () => {
    const mockError = new Error('mock error');
    mongoose.connect.mockRejectedValue(mockError);
    try {
      await mongoDatabaseConnection();
    } catch (error) {
      expect(error.message).toBe('Error connecting to Mongo');
    }
  });
});
