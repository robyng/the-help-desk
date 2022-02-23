const { Schema, model } = require("mongoose");
//const commentSchema = require('./Comment');
const dateFormat = require("../utils/dateFormat");

const ticketSchema = new Schema(
  {
    title: { // the title of our ticket
      type: String,
      required: "The ticket is missing a title",
      minlength: 1,
      maxlength: 100,
    },
    category: { // the categor of the ticket, i.e plumbing, electrical, general
      type: String,
      //required: "The ticket is missing a title",
      minlength: 1,
      maxlength: 100,
    },
    message: { // The description of the issue/ ticket
      type: String,
      required: "You need to leave a issue description!",
      minlength: 1,
      maxlength: 280,
    },
    createdAt: { // The time stamp of when the ticket was created
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    unit: { // the location of the issue/ or the users location
            // unit act as an identifier to the user -> its similar to a username
      type: String,
      required: true,
    },
    status: {
      // the status, open, closed, cancelled, etc
      type: String,
      default: "Open",
    },
    isPrivate: {
      // defines if the ticket is private. This is used to determine if the 
      // general public is allowed to see this ticket or just the owner
      // and admins can see this ticket
      type: Boolean,
      default: true,
      required:
        "The post is missing True/False, does the post contain confidential info",
    },
    //comments: [commentSchema] // an array of comments the are places on the individual ticket
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Ticket = model("Ticket", ticketSchema);
module.exports = Ticket, ticketSchema;
