const { ApolloServer } = require("apollo-server")
const typeDefs = require("./schema")
const resolvers = require("./resolvers")
const databaseConnection = require('./config/db')
const { APP_SECRET } = require("./config");
const { JwtSecretProvider } = require("./providers/SecretProvider");

databaseConnection();

const secretProvider = JwtSecretProvider;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers['authorization'];
    if (token) {
      try {
        const user = secretProvider.verify(token, APP_SECRET);
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