const mongoose = require("mongoose");
const { DB_URL } = require("../config");

const mongoDatabaseConnection = () => {
  try {
    mongoose.connect(DB_URL);
    console.log("db connection established")
  } catch (error) {
    console.log("Error connecting to Mongo");
    console.log(error)
    process.exit(1);
  }
}

module.exports = mongoDatabaseConnection;