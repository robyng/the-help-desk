const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');
const dateFormat = require('../utils/dateFormat');

const ticketSchema = new Schema(
  {
    title:{
      type: String,
      required: "The ticket is missing a title",
      minlength: 1,
      maxlength: 100
    },
    category:{
      type: String,
      //required: "The ticket is missing a title",
      minlength: 1,
      maxlength: 100

    },
    message: {
      type: String,
      required: 'You need to leave a issue description!',
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: "Open",
      
    },
    isPrivate:{
      type: Boolean,
      default: true,
      required: "The post is missing True/False, does the post contain confidential info"
    },
    comments: [commentSchema]

  },
  {
    toJSON: {
      getters: true
    }
  }
);



const Ticket = model('Ticket', ticketSchema);

module.exports = Ticket;
