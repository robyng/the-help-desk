const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const commentSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
      maxlength: 280
    },
    unit: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);


const Comment = model("Comment", commentSchema);
module.exports = commentSchema,Comment;