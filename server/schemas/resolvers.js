const { AuthenticationError } = require('apollo-server-express');
const { User, Ticket, Admin } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // if user is logged in send back the data of the logged in user
    me: async (parent, args, context) => {
      
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('tickets')
    
        return userData;
      }
    
      throw new AuthenticationError('Not logged in');
    },
    
    // get all tickets
    // ToDo: filter by admin
    tickets: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Ticket.find(params).sort({ createdAt: -1 });
    },
    //get ticket by id
    //todo: prevent regular user from seeing private tickets
    ticket: async (parent, { _id }) => {
      return Ticket.findOne({ _id });
    }
  },

  Mutation: {
    
    //******  Beg add a ticket
    addTicket: async (parent, args, context) => {
      if (context.user) {
        const ticket = await Ticket.create({ ...args, username: context.user.username });
        //const ticket = await Ticket.create({ ...args, username: args.username });
        // await User.findByIdAndUpdate(
        //   { _id: context.user._id },
        //   { $push: { tickets: ticket._id } },
        //   { new: true }
        // );

        return ticket;
      }

      throw new AuthenticationError('You need to be logged in!');
    }, // *******  End add ticket
    // ###### Beg UpdateTicket
    // TODO: validate user is updating their own ticket only
    updateTicket: async (parent, args, context) => {
      if (context.user) {
        const ticket = await Ticket.findOneAndUpdate(
          { _id: args._id},
          { ...args })
          return ticket;

        
      }

      throw new AuthenticationError('You need to be logged in!');
    }, // ######### End UpdateTicket
    // ****** Beg addUser
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      console.log(`userID ${user._id}`)
      if(args.isAdmin){
        const admin = await Admin.create({userId:user._id})
      }
    
      return { token, user };
    }, // ******** End AddUser
    // ###### Beg login
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
    
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
    
      const correctPw = await user.isCorrectPassword(password);
    
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
    
      const token = signToken(user);
      return { token, user };
    }, // ##### End Login
    

  }
};

module.exports = resolvers;
