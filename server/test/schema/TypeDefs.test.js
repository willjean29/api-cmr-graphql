const { print } = require('graphql');
const TypeDefs = require('../../src/schema');
const { gql } = require('apollo-server');

const userTypeDefs = TypeDefs[1];

describe('TypeDefs test suite', () => {
  it('should define the UserInput type', () => {
    const expectedType = gql`
      input UserInput {
        name: String!
        lastName: String!
        email: String!
        password: String!
      }
    `;

    expect(print(userTypeDefs)).toContain(print(expectedType));
  });
})
