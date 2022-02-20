const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Auth {
    token: ID!
    user: User
  }

  type User {
    _id: ID
    username: String
    email: String
    tickets: [Ticket]
  }

  type Ticket {
    _id: ID
    title: String
    category: String
    message: String
    createdAt: String
    username: String
    status:String
    isPrivate:Boolean
  
  }
  type Query {
    me: User
    adminAllTickets(username: String, searchForUsername: String): [Ticket] 
    tickets(searchMyTickets: Boolean): [Ticket] 
    ticket(_id: ID!): Ticket
  }

  type Mutation {
    addTicket(username: String!, message: String!, title: String!, isPrivate: Boolean): Ticket
    updateTicket(username: String!, message: String!, _id: String!, isPrivate: Boolean): Ticket
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!, isAdmin:Boolean): Auth
  }
`;

module.exports = typeDefs;
