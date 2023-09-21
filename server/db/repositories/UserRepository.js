const { User } = require("../../models");

async function create(userDto) {
  const user = new User(userDto);
  await user.save();
  return user;
}

async function findOne(param) {
  const user = await User.findOne({ param });
  return user;
}

module.exports = {
  create,
  findOne
}