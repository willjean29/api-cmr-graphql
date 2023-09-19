const mongoose = require("mongoose");
const { DB_URL } = require("./");

module.exports = async () => {
  try {
    mongoose.connect(DB_URL);
    console.log("db connection established")
  } catch (error) {
    console.log("Error connecting to Mongo");
    console.log(error)
    process.exit(1);
  }
}