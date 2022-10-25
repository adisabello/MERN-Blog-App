const {Comment} = require('../models/Comment');
const Post = require('../models/Post');
const {User} = require('../models/User');

const resolvers = {
    Query: {
        async allPosts(){
            const posts = await Post.find();
            return posts; 
        },
        async posts(_, args){
            const all = await Post.find()
            const posts = []
            for(var i = 0; i < all.length; i++){
                if(all[i].user && all[i].user._id == args.uid)
                    posts.push(all[i]);
            }
            return posts; 
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
            const user = await User.findById(args.uid);
            if(user){
                console.log(await Post.findById(args.id));
                await Post.findByIdAndDelete(args.id);
                console.log(await Post.findById(args.id));
            }  

            const all = await Post.find()
            const posts = []
            for(var i = 0; i < all.length; i++){
                if(all[i].user && all[i].user._id == args.uid)
                    posts.push(all[i]);
            }
            return posts; 
        },
        async addPost(parent, args){
            const user = await User.findById(args.uid);
            if(user || true){
                const post = new Post({
                    content: args.content,
                    title: args.title,
                    user: user
                });
                await post.save();
                return post;
            }
            else 
                return "Post not added. Kindly log in first"
        },
        async deleteComment(parent, args){
            const user = await User.findById(args.uid);
            if(user){
                const post = await Post.findOneAndUpdate(
                    { _id: args.pId },
                    { $pull: { comments: { _id: args.cId } } },
                    { new: true }
                  );
                  post.save()
                  console.log(post.comments,"Hello",await Post.findById(args.pId).comments);
                  return post;
            }
            else 
                return "Comment not deleted. Kindly log in first"
        },
        async addComment(parent, args){
            let user = await User.findById(args.uid);
            let comment = new Comment({
                content: args.content,
                user: user
            });
            let post = await Post.findById(args.pId)
            comment = await comment.save();
            post.comments.push(comment);
            return await post.save();
        },
        async login(parent, args) {
            const user = await User.findOne({ email: args.email });
            if (!user) {
              return "Error: Can't find this user";
            }
        
            const correctPw = await user.isCorrectPassword(args.password);
        
            if (!correctPw) {
              return 'Error: Wrong password!';
            }

            return user._id;
        }
    }

}

module.exports = {resolvers}