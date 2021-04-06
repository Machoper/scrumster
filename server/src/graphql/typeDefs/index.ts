import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    users: [User!]!
    user(userId: ID!): User!
    login(email: String!, password: String!): AuthData!
  }
  type Mutation {
    createUser(userInput: UserInput): User!
  }
  type User {
    id: ID!
    name: String!
    password: String!
    email: String!
  }
  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }
  input UserInput {
    email: String!
    name: String!
    password: String!
  }
`;

export default typeDefs;
