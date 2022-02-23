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
<<<<<<< HEAD
    unit: String
    status: String
    isPrivate: Boolean
=======
    username: String
    status:String
    isPrivate:Boolean
    comments: [Comment]
  
>>>>>>> jmo-ticket-comment
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
<<<<<<< HEAD
    addUser(
      unit: String!
      email: String!
      password: String!
      isAdmin: Boolean
    ): Auth
=======
    addUser(username: String!, email: String!, password: String!, isAdmin:Boolean): Auth
    addComment(ticketId: String!, message: String!): Ticket
    updateComment(message: String!, commentId: String!): Comment
>>>>>>> jmo-ticket-comment
  }
`;

module.exports = typeDefs;
