const User = require("../models/User");
const bcryptjs = require("bcryptjs");

const courses = [
  {
    title: "Course 1"
  },
  {
    title: "Course 2"
  }
]

const resolvers = {
  Query: {
    getAllCourse: () => {
      return courses;
    }
  },
  Mutation: {
    createUser: async (_, { userDto }, ctx) => {
      const { email, password } = userDto;
      const isExist = await User.findOne({ email });
      if (isExist) {
        throw new Error(`User ${email} already exists`)
      }
      const salt = await bcryptjs.genSalt(10);
      userDto.password = await bcryptjs.hash(password, salt);
      try {
        const user = new User(userDto);
        await user.save();
        console.log({ user })
        return user;
      } catch (error) {
        console.log(error)
      }
      return "Creando usuario";
    }
  }
}

module.exports = resolvers;