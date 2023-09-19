const { ApolloServer } = require("apollo-server")
const typeDefs = require("./db/schema")
const resolvers = require("./db/resolvers")
const databaseConnection = require('./config/db')
const jwt = require('jsonwebtoken');
const { APP_SECRET } = require("./config");
databaseConnection();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // console.log({ headers: req.headers });
    const token = req.headers['authorization'];
    if (token) {
      try {
        const user = jwt.verify(token, APP_SECRET);
        // console.log({ user })
        return { user }
      } catch (error) {
        console.log("hubo un error")
        console.log(error);
      }

    }
  }
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});