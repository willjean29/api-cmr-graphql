const { UserService } = require("../services");

const userResolvers = {
  Query: {
    getUser: (_, { token }) => {
      return UserService.getUser(token);
    }
  },
  Mutation: {
    createUser: (_, { userDto }) => {
      return UserService.createUser(userDto);
    },
    signIn: (_, { signInDto }) => {
      return UserService.signIn(signInDto);
    }
  }
}

module.exports = userResolvers;