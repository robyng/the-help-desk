const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type Ticket {
    _id: ID
    ticketText: String
    createdAt: String
    username: String
    status:String
  }
  type Query {
    tickets(username: String): [Ticket]
    ticket(_id: ID!): Ticket
  }

  type Mutation {
    addTicket(username: String!, ticketText: String!): Ticket
    updateTicket(username: String!, ticketText: String!, _id: String!): Ticket
  }
`;

module.exports = typeDefs;
