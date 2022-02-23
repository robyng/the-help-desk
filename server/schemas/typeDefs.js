const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Auth {
    token: ID!
    user: User
  }

  type User {
    _id: ID
    unit: String
    email: String
    tickets: [ID]
  }

  type Ticket {
    _id: ID
    title: String
    category: String
    message: String
    createdAt: String
    unit: String
    status: String
    isPrivate: Boolean
  }
  type Comment {
    _id: ID
    message: String
    createdAt: String
    username: String
  }

  type Query {
    me: User
    adminAllTickets(unit: String, searchForunit: String): [Ticket]
    tickets(searchMyTickets: Boolean): [Ticket]
    ticket(_id: ID!): Ticket
  }

  type Mutation {
    addTicket(
      unit: String!
      message: String!
      title: String!
      isPrivate: Boolean
    ): Ticket
    deleteTicket(_id: String!): Ticket
    updateTicket(
      unit: String!
      message: String!
      _id: String!
      isPrivate: Boolean
    ): Ticket
    login(email: String!, password: String!): Auth
    addUser(
      unit: String!
      email: String!
      password: String!
      isAdmin: Boolean
    ): Auth
  }
`;

module.exports = typeDefs;
