const { Schema, model } = require('mongoose');
const {userSchema} = require('./User')

const commentSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: userSchema,
    // required: true
  },
  dateCreated: {
    type: Number,
    default: Date.now()
  }
});

const Comment = model('Comment', commentSchema);

module.exports = {commentSchema, Comment };
