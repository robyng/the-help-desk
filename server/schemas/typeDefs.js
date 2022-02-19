const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type Ticket {
    _id: ID
    ticketText: String
    createdAt: String
    username: String
  }
  type Query {
    tickets(username: String): [Ticket]
    ticket(_id: ID!): Ticket
  }

  type Mutation {
    addTicket(ticketText: String!): Ticket
  }
`;

module.exports = typeDefs;
