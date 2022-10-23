const { Schema, model } = require('mongoose');
const {userSchema} = require('./User')
const {commentSchema} = require('./Comment')

const postSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: userSchema,
    // required: true
  },
  comments : [commentSchema],
  title: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  }
});

const Post = model('Post', postSchema);

module.exports = Post;
