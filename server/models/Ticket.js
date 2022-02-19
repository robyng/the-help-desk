const { Schema, model } = require('mongoose');
//const commentSchema = require('./Comment');
const dateFormat = require('../utils/dateFormat');

const ticketSchema = new Schema(
  {
    ticketText: {
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
    //comments: [commentSchema]

  },
  {
    toJSON: {
      getters: true
    }
  }
);

ticketSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Ticket = model('Ticket', ticketSchema);

module.exports = Ticket;
