const { AuthenticationError } = require("apollo-server-express");
const {  User, Ticket, Admin, CommentsSchema } = require("../models");
const { signToken } = require("../utils/auth");

const verifyAdmin = async (unitToValidate) => {
  // // Input: unit String
  // // Output:
  // // either returns null
  // // or returns an array with an Admin Schema
  // // [{_ID: someAdminId, userId: someUserId }]
  // let userID = await User.findOne({ unit: unitToValidate }); // get userId for next query, to check admin
  
  // if (!userID) throw new AuthenticationError("Invalid unit or basic user");
  // userID = userID._id;
  // // search admin container for the specific id
  // // if a Id object is returned they are an admin
  // // else if its null/empty they are not an admin
  // const isAdmin = await Admin.find({ userId: { $eq: userID } });
  // if (isAdmin && isAdmin != "undefined" && isAdmin.length > 0) return isAdmin;
  // console.log("")
  if(unitToValidate === "000")
    return true
  return false;
};

const ticketsHelperAdmin = async (parent, args, context) => {
  const searchForUnit = args.searchForUnit
  if (context.user) {
    // verify the admin is logged in

    // search admin container for the specific id
    // if a Id object is returned they are an admin
    // else if its null/empty they are not an admin
    const isAdmin = await verifyAdmin(context.user.unit);
    // return either {"unit":"mogannam"} or {}
    // if unit is not empty, then search for one users tickets
    // if unit is empty search for all users
    const specificUser = searchForUnit ? { unit: searchForUnit } : {};
    // if isAdmin is not empty you are an admin
    if (isAdmin){
      // if admin, show anything for aspecific user or annything for all users
      return Ticket.find(specificUser).sort({ createdAt: -1 });
    }
    // else you are not an admin, and either an error occured or somehow a regular user got thru
    // so return nothing
    return Ticket.find({ isPrivate: { $eq: false } }).sort({ createdAt: -1 });;
  }

  throw new AuthenticationError("You need to be logged in!");
}

const ticketsHelper = async (parent, args, context) => {
  // if browsing as yourself or not logged in
  // if I am logged in, I have a valid unit, pulled from the header
  if (context.user) {
    // if user is logged in they are allowed to search there tickets
    const myunit = context.user.unit; // without the if block, the code crashes here

    // get a bool parameter to decide
    // true -> search my tickets
    // false ->  search all public tickets
    const searchMyTickets = args.searchMyTickets;
    if (myunit && searchMyTickets)
      // if true search my tickets
      //if unit is valid, search my tickets -> show all tickets
      return Ticket.find({ unit: myunit }).sort({ createdAt: -1 });
    // else there is no valid user logged in so show all public tickets
  }
  return Ticket.find({ isPrivate: { $eq: false } }).sort({ createdAt: -1 });
}



const resolvers = {
  Query: {
    // if user is logged in send back the data of the logged in user
    me: async (parent, args, context) => {
      //console.log("----- in resolvers.js, in me query, context.user is ", JSON.stringify(context.user))
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          //.populate("tickets");
        //console.log("----- in resolvers.js, in me query, userData is ", JSON.stringify(userData))
        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },

    getTickets: async ( parent, args, context) =>{
      
      if(context.user.unit === "000")
        return ticketsHelperAdmin(parent,args,context)
      return ticketsHelper(parent, args,context)

    },

    // get all tickets, or get all tickets for a specific user by unit
    // *** Does not filter by
    adminAllTickets: async (parent, { searchForunit }, context) => {
      if (context.user) {
        // verify the admin is logged in

        // search admin container for the specific id
        // if a Id object is returned they are an admin
        // else if its null/empty they are not an admin
        const isAdmin = await verifyAdmin(context.user.unit);
        // return either {"unit":"mogannam"} or {}
        // if unit is not empty, then search for one users tickets
        // if unit is empty search for all users
        const specificUser = searchForunit ? { unit: searchForunit } : {};
        // if isAdmin is not empty you are an admin
        if (isAdmin)
          // if admin, show anything for aspecific user or annything for all users
          return Ticket.find(specificUser).sort({ createdAt: -1 });
        // else you are not an admin, and either an error occured or somehow a regular user got thru
        // so return nothing
        return Ticket;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    tickets: async (parent, args, context) => {
      // if browsing as yourself or not logged in
      // if I am logged in, I have a valid unit, pulled from the header
     
      if (context.user) {
        // if user is logged in they are allowed to search there tickets
        const myunit = context.user.unit; // without the if block, the code crashes here

        // get a bool parameter to decide
        // true -> search my tickets
        // false ->  search all public tickets
        const searchMyTickets = args.searchMyTickets;
        if (myunit && searchMyTickets)
          // if true search my tickets
          //if unit is valid, search my tickets -> show all tickets
          return Ticket.find({ unit: myunit }).sort({ createdAt: -1 });
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
    },

    // get all users - RMG
    users: async() => {
      return User.find().sort({ createdAt: -1});
    }
  },

  Mutation: {
    deleteUser: async (parent, args, context) => {
      if (context.user) {
        const userId = args._id;
        // search admin container for the specific id
        // if a Id object is returned they are an admin
        // else if its null/empty they are not an admin
        const isAdmin = await verifyAdmin(context.user.unit);
        //check if valid admin logged in before deleting, or its the user who owns thee ticket
        if (isAdmin) {
          // if admin, show anything for aspecific user or annything for all users
        return await User.findByIdAndDelete(
            { _id: args._id },
            // { $pull: { tickets: ticket._id } },
            // { new: true }
         );
          
        }
        // else when deleting, filter by unit on the ticket and ticketid
        // if they don't match return a null result, else return the ticket deleted
        // await User.findByIdAndUpdate(
        //   { _id: context.user._id },
        //   { $pull: { tickets: ticket._id } },
        //   { new: true }
        // );
        // return Ticket.findOneAndDelete({
        //   $and: [{ unit: { $eq: context.user.unit } }, { ...args }],
        // });
        // you can no longer reach this, but it helped when debugging
        //throw new Error("An invalid delete operation is being performed")
      }

      throw new AuthenticationError(
        "You need to be logged in, to delete a ticket"
      );
    },

    deleteTicket: async (paerent, args, context) => {
      //ToDo: Delete ticket id from user field
      if (context.user) {
        const ticketId = args._id;
        // search admin container for the specific id
        // if a Id object is returned they are an admin
        // else if its null/empty they are not an admin
        const isAdmin = await verifyAdmin(context.user.unit);
        //check if valid admin logged in before deleting, or its the user who owns thee ticket
        if (isAdmin) {
          // if admin, show anything for aspecific user or annything for all users
          await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $pull: { tickets: ticket._id } },
            { new: true }
         );
          return Ticket.findOneAndDelete({ ...args });
        }
        // else when deleting, filter by unit on the ticket and ticketid
        // if they don't match return a null result, else return the ticket deleted
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { tickets: ticket._id } },
          { new: true }
        );
        return Ticket.findOneAndDelete({
          $and: [{ unit: { $eq: context.user.unit } }, { ...args }],
        });
        // you can no longer reach this, but it helped when debugging
        //throw new Error("An invalid delete operation is being performed")
      }

      throw new AuthenticationError(
        "You need to be logged in, to delete a ticket"
      );
    },

    //******  Beg add a ticket
    addTicket: async (parent, args, context) => {
      
      if (context.user) {
        console.log(" ******* in graphql should add ticket")
        const ticket = await Ticket.create({
          ...args,
          unit: context.user.unit,
        });
        await User.findByIdAndUpdate(
           { _id: context.user._id },
           { $push: { tickets: ticket._id } },
           { new: true }
        );
        console.log(`in Resolvers.js ticket is --> \n\n\n \t\t ${ticket}`)
        return ticket;
      }
      console.log("You need to be logged in!")
      throw new AuthenticationError("You need to be logged in!");
    }, // *******  End add ticket
    // ###### Beg UpdateTicket
    // TODO: validate user is updating their own ticket only
    updateTicket: async (parent, args, context) => {
      if (context.user) {
        const ticket = await Ticket.findOneAndUpdate(
          { _id: args._id },
          { ...args }
        );
        return ticket;
      }

      throw new AuthenticationError("You need to be logged in!");
    }, // ######### End UpdateTicket
    // ****** Beg addUser
    addUser: async (parent, args) => {
      const unit = args.unit;
      if (unit === "000") {
        args.isAdmin = true;
      }
      const user = await User.create(args);
      const token = signToken(user);
      if (args.isAdmin) {
        const admin = await Admin.create({ userId: user._id });
      }

      return { token, user };
    }, // ******** End AddUser
    // ###### Beg login
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    }, // ##### End Login
    // ****** Beg addComment
    addComment: async (parent, { ticketId, message }, context) => {
      if (context.user) {
        const updatedTicket = await Ticket.findOneAndUpdate(
          { _id: ticketId },
          { $push: { comments: { message, unit: context.user.unit } } },
          { new: true, runValidators: true }
        );

        return updatedTicket;
      }

      throw new AuthenticationError('You need to be logged in to comment on a ticket!');
    },
    // ****** End addComment
    //####### Beg updateComment
    updateComment: async (parent, {message, commentId }, context) => {
      if (context.user) {
        const updateComment = await Comment.findOneAndUpdate(
          { _id: commentId },
          { $push: { comments: { message, unit: context.user.unit } } },
          { new: true, runValidators: true }
        );

        return updateComment;
      }

      throw new AuthenticationError('You need to be logged in to comment on a ticket!');
    },
    // ###### End update Comment
    

  }
};

module.exports = resolvers;
