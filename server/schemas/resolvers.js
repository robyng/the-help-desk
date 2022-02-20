const { AuthenticationError } = require('apollo-server-express');
const { User, Ticket, Admin } = require('../models');
const { signToken } = require('../utils/auth');

const verifyAdmin = async usernameToValidate => {
  // Input: username String
  // Output:
      // either returns null
      // or returns an array with an Admin Schema
      // [{_ID: someAdminId, userId: someUserId }]
  let userID = await User.findOne({ username: usernameToValidate }); // get userId for next query, to check admin
  console.log(`in resolver.js:verifyAdmin userID ${userID}`)
  if(!userID)
    throw new AuthenticationError('Invalid username or basic user');
  userID = userID._id
  // search admin container for the specific id
  // if a Id object is returned they are an admin
  // else if its null/empty they are not an admin
  const isAdmin = await Admin.find({ userId: { $eq: userID } })
  console.log(`in resolver.js:verifyAdmin ${JSON.stringify(isAdmin)}`)
  if(isAdmin && isAdmin != 'undefined' && isAdmin.length >0)
    return isAdmin
  return null
}

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
      //console.log(`context.user: ${JSON.stringify(context.user)}`)
      if (context.user) {// verify the admin is logged in
    
        // search admin container for the specific id
        // if a Id object is returned they are an admin
        // else if its null/empty they are not an admin
        const isAdmin = await verifyAdmin(context.user.username)  
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
      console.log(`in public get tickets`)
        // if I am logged in, I have a valid username, pulled from the header
        if(context.user){// if user is logged in they are allowed to search there tickets
        const myUserName = context.user.username // without the if block, the code crashes here
        
        // get a bool parameter to decide
        // true -> search my tickets
        // false ->  search all public tickets
        const searchMyTickets = args.searchMyTickets
        console.log(`username ${myUserName} | searchMyTickets ${searchMyTickets}`)
        if(myUserName && searchMyTickets) // if true search my tickets
            //if username is valid, search my tickets -> show all tickets
            return Ticket.find({username: myUserName}).sort({ createdAt: -1 });
        // else there is no valid user logged in so show all public tickets
        }
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
    deleteTicket: async (paerent, args,context) => {
      //ToDo: Delete ticket id from user field
      if(context.user){
        const ticketId = args._id
        // search admin container for the specific id
        // if a Id object is returned they are an admin
        // else if its null/empty they are not an admin
        const isAdmin = await verifyAdmin(context.user.username)  
        //check if valid admin logged in before deleting, or its the user who owns thee ticket
        if (isAdmin){ // if admin, show anything for aspecific user or annything for all users
          console.log("admin is deleting a ticket")
          return Ticket.findOneAndDelete({...args});
        }
        // else when deleting, filter by username on the ticket and ticketid
        // if they don't match return a null result, else return the ticket deleted
        return Ticket.findOneAndDelete({$and:[
          {username : {$eq:context.user.username}},
          {...args}
        ]}); 
        // you can no longer reach this, but it helped when debugging
        //throw new Error("An invalid delete operation is being performed")
      }

      throw new AuthenticationError('You need to be logged in, to delete a ticket');

    },
    
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
    // ****** Beg addComment
    addComment: async (parent, { ticketId, message }, context) => {
      if (context.user) {
        const updatedTicket = await Ticket.findOneAndUpdate(
          { _id: ticketId },
          { $push: { comments: { message, username: context.user.username } } },
          { new: true, runValidators: true }
        );

        return updatedTicket;
      }

      throw new AuthenticationError('You need to be logged in to comment on a ticket!');
    },
    // ****** End addComment
    

  }
};

module.exports = resolvers;
