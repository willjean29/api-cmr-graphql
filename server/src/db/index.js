const mongoose = require("mongoose");
const { DB_URL } = require("../config");

const mongoDatabaseConnection = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("db connection established")
  } catch (error) {
    console.log("Error connecting to Mongo");
    console.log(error)
    throw new Error("Error connecting to Mongo");
  }
}

module.exports = mongoDatabaseConnection;