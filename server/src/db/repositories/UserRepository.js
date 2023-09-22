const { User } = require("../../models");

async function create(userDto) {
  const user = new User(userDto);
  await user.save();
  return user;
}

async function findOne(param, value) {
  const user = await User.findOne({ [param]: value });
  return user;
}

module.exports = {
  create,
  findOne
}