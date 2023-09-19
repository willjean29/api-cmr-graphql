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
  }
}

module.exports = resolvers;