const { UserRepository } = require("../db/repositories");
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { APP_SECRET } = require("../config");

function generateToken(payload, secret, expiresIn) {
  const token = jwt.sign(payload, secret, { expiresIn });
  return token;
}

async function getUser(token) {
  const user = jwt.verify(token, APP_SECRET);
  return user;
}

async function createUser(userDto) {
  const { email, password } = userDto;
  const isExist = await UserRepository.findOne('email', email);
  if (isExist) {
    throw new Error(`User ${email} already exists`)
  }
  // todo: refactor to solid principle
  const salt = await bcryptjs.genSalt(10);
  userDto.password = await bcryptjs.hash(password, salt);
  try {
    const user = await UserRepository.create(userDto);
    console.log({ user })
    return user;
  } catch (error) {
    console.log(error)
  }
}

async function signIn(signInDto) {
  const { email, password } = signInDto;
  const user = await UserRepository.findOne('email', email);
  if (!user) {
    throw new Error('User not exists')
  }
  const isCorrectPassword = await bcryptjs.compare(password, user.password);

  if (!isCorrectPassword) {
    throw new Error('Invalid password')
  }

  const token = generateToken({ id: user._id }, APP_SECRET, '24H');

  return {
    token
  }
}

module.exports = {
  getUser,
  createUser,
  signIn
}