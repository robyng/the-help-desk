const { AuthenticationError } = require('apollo-server-express');
const { User, Ticket } = require('../models');
//const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    
   
    tickets: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Ticket.find(params).sort({ createdAt: -1 });
    },
    ticket: async (parent, { _id }) => {
      return Ticket.findOne({ _id });
    }
  },

  Mutation: {
    
    
    addTicket: async (parent, args, context) => {
      // if (context.user) {
        const ticket = await Ticket.create({ ...args, username: context.user.username });

        // await User.findByIdAndUpdate(
        //   { _id: context.user._id },
        //   { $push: { tickets: ticket._id } },
        //   { new: true }
        // );

        return ticket;
      //}

      throw new AuthenticationError('You need to be logged in!');
    },
    

  }
};

module.exports = resolvers;
