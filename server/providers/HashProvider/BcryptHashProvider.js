const bcryptjs = require("bcryptjs");

async function generate(password) {
  const salt = await bcryptjs.genSalt(10);
  const hashPassword = await bcryptjs.hash(password, salt);
  return hashPassword;
}

async function compare(password, hashPassword) {
  const isEqualPassword = await bcryptjs.compare(password, hashPassword);
  return isEqualPassword;
}

module.exports = {
  generate,
  compare
}