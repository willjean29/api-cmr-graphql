const userResolvers = require("./UserResolver");
const productResolvers = require("./ProductResolver");
const cutomerResolvers = require("./CustomerResolver");
const orderResolvers = require("./OrderResolver");

const resolvers = [userResolvers, productResolvers, cutomerResolvers, orderResolvers];

module.exports = resolvers;