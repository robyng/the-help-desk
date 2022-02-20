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
    
    // get all tickets, or get all tickets for a specific user by username
    // *** Does not filter by
    adminAllTickets: async (parent, { searchForUsername }, context) => {
      if (context.user) {// verify the admin is logged in
        let userID = await User.findOne({ username: context.user.username }); // get userId for next query
        userID = userID._id
        // search admin container for the specific id
        // if a Id object is returned they are an admin
        // else if its null/empty they are not an admin
        const isAdmin = await Admin.find({ userId: { $eq: userID } })

        // return either {"username":"mogannam"} or {}
        // if username is not empty, then search for one users tickets
        // if username is empty search for all users
        const specificUser = searchForUsername ? { username: searchForUsername } : {};
        // if isAdmin is not empty you are an admin
        if (isAdmin) // if admin, show anything for aspecific user or annything for all users
          return Ticket.find(specificUser).sort({ createdAt: -1 });
        // else you are not an admin, and either an error occured or somehow a regular user got thru
        // so return nothing
        return Ticket
    }

    throw new AuthenticationError('You need to be logged in!');
  
    },
    tickets: async (parent, args, context) => {
      // if browsing as yourself or not logged in
     
        // if I am logged in, I have a valid username, pulled from the header
        const myUserName = context.user.username 
        
        // get a bool parameter to decide
        // true -> search my tickets
        // false ->  search all public tickets
        const searchMyTickets = args.searchMyTickets
        console.log(`username ${myUserName} | searchMyTickets ${searchMyTickets}`)
        if(myUserName && searchMyTickets) // if true search my tickets
            //if username is valid, search my tickets -> show all tickets
            return Ticket.find({username: myUserName}).sort({ createdAt: -1 });
        // else there is no valid user logged in so show all public tickets
        return Ticket.find({ isPrivate: { $eq: false } }).sort({ createdAt: -1 });
        
    },

    //get ticket by id
    //todo: prevent regular user from seeing private tickets
    ticket: async (parent, { _id }) => {
      return Ticket.findOne({ _id });
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
