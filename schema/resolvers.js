const {Comment} = require('../models/Comment');
const Post = require('../models/Post');
const {User} = require('../models/User');

const resolvers = {
    Query: {
        allPosts(){
            return Post.find()  
        },
        allUsers(){
            return User.find();
        },
        post(parent, args){
            return Post.findById(args.id);
        }
    },
    Mutation: {
        addUser(parent, args){
            const user = new User({
                username: args.username,
                email: args.email,
                password: args.password
            });

            return user.save();
        },
        async deletePost(parent, args){
            await Post.findByIdAndDelete(args.id);
            
            return "Post deleted";
        },
        async addPost(parent, args){
            const post = new Post({
                content: args.content,
                title: args.title,
            });

            return await post.save();
        },
        async deleteComment(parent, args){
            const post = await Post.findOneAndUpdate(
                { _id: args.pId },
                { $pull: { comments: { _id: args.cId } } },
                { new: true }
              );
            
            return post;
        },
        async addComment(parent, args){
            let comment = new Comment({
                content: args.content,
            });
            let post = await Post.findById(args.pId)
            comment = await comment.save();
            post.comments.push(comment);
            return post.save();
        }
        
    }

}

module.exports = {resolvers}