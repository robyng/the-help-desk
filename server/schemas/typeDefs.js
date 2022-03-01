const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Auth {
    token: ID!
    user: User
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
    imageName: String
    comments: [Comment]
  }

  type User {
    _id: ID
    unit: String
    email: String
    tickets: [Ticket]
  }
  type Comment {
    _id: ID
    message: String
    createdAt: String
    unit: String
  }


  type Query {
    me: User
    adminAllTickets(unit: String, searchForunit: String): [Ticket]
    tickets(searchMyTickets: Boolean): [Ticket]
    getTickets(searchMyTickets: Boolean, unit: String, searchForUnit: String): [Ticket]
    ticket(_id: ID!): Ticket
  }

  type Mutation {
    addTicket(
      unit: String
      message: String!
      category: String!
      title: String!
      isPrivate: Boolean!
      imageName: String
    ): Ticket
    deleteTicket(_id: String!): Ticket
    updateTicket(
      unit: String!
      message: String!
      _id: String!
      isPrivate: Boolean
      status: String
    ): Ticket
    login(email: String!, password: String!): Auth
    addUser(
      unit: String!
      email: String!
      password: String!
      isAdmin: Boolean
    ): Auth
    addComment(ticketId: String!, message: String!): Ticket
    updateComment(message: String!, commentId: String!): Ticket
  }
`;

module.exports = typeDefs;
