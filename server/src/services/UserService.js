const { UserRepository } = require("../db/repositories");
const { BcryptHashProvider } = require("../providers/HashProvider");
const { JwtSecretProvider } = require("../providers/SecretProvider");
const { APP_SECRET } = require("../config");

const hashProvider = BcryptHashProvider;
const secretProvider = JwtSecretProvider;

function generateToken(payload, secret, expiresIn) {
  const token = secretProvider.sign(payload, secret, { expiresIn });
  return token;
}

async function getUser(token) {
  const user = secretProvider.verify(token, APP_SECRET);
  return user;
}

async function createUser(userDto) {
  const { email, password } = userDto;
  const isExist = await UserRepository.findOne('email', email);
  if (isExist) {
    throw new Error(`User ${email} already exists`)
  }

  userDto.password = await hashProvider.generate(password);

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
  const isCorrectPassword = await hashProvider.compare(password, user.password);

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