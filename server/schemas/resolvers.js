const { AuthenticationError } = require('apollo-server-express');
const { User, Ticket } = require('../models');
//const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    
    // get all tickets
    tickets: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Ticket.find(params).sort({ createdAt: -1 });
    },
    //get ticket by id
    ticket: async (parent, { _id }) => {
      return Ticket.findOne({ _id });
    }
  },

  Mutation: {
    
    // add a ticket
    addTicket: async (parent, args, context) => {
      // if (context.user) {
        //const ticket = await Ticket.create({ ...args, username: context.user.username });
        const ticket = await Ticket.create({ ...args, username: args.username });


        // await User.findByIdAndUpdate(
        //   { _id: context.user._id },
        //   { $push: { tickets: ticket._id } },
        //   { new: true }
        // );

        return ticket;
      //}

      throw new AuthenticationError('You need to be logged in!');
    },

    updateTicket: async(parent,args,context) =>{
      //if (context.user) { // if logged in
        //const ticket = await Ticket.create({ ...args, username: context.user.username });
        const updateTicket = await Ticket.findOneAndUpdate(
          {...args },
          //{ $push: { comments: { commentBody, username: context.user.username } } },
          { new: true, runValidators: true }

        );


        

        return updateTicket;
      //}

      throw new AuthenticationError('You need to be logged in!');

    },
    

  }
};

module.exports = resolvers;
