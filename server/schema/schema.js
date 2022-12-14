const Post = require('../models/Post');
const User = require('../models/User');
const {GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLSchema,
    GraphQLNonNull
} = require('graphql');
const graphql = require('graphql');

const PostType = new GraphQLObjectType({
    name: "Post",
    fields: ()=> ({
        content: {type: GraphQLString},
        title: {type: GraphQLString}
    })
});


// const UserType = new GraphQLObjectType({
//     name:"User",
//     fields: () =>({
//         username: {type: GraphQLString},
//         email: {type: GraphQLString},
//         password: {type: GraphQLString},
//         savedBooks: {type: GraphQLList(BookType)},
//         _id: {type: GraphQLString}
//     })
// });

const RootQuery = new GraphQLObjectType({
    name: "root",
    fields: () =>({
        posts: {
            type: new GraphQLList(PostType),
            resolve: () => Post.find()
        },
    })
});


// const mutation = new GraphQLObjectType({
//     name: 'Mutation',
//     fields: {
//         addUser: {
//             type: UserType,
//             args: {
//                 username: {type: GraphQLNonNull(GraphQLString)},
//                 email: {type: GraphQLNonNull(GraphQLString)},
//                 password: {type: GraphQLNonNull(GraphQLString)},
//             },
//             resolve: (parent, args) =>{
//                 const user = new User({
//                     username: args.username,
//                     email: args.email,
//                     password: args.password
//                 });

//                 return user.save();
//             }
//         },
//         addBook:{
//             type: UserType,
//             args: {
//                 userId: {type: GraphQLString}
//             }
//         },
//         login: {
//             type: GraphQLString,
//             args: {
//                 username: {type: GraphQLString},
//                 email: {type: GraphQLString},
//                 password: {type: GraphQLNonNull(GraphQLString)},
//             },
//             resolve: async (parent, args)=>{
//                 const user = await User.findOne({ $or: [{ username: args.username }, { email: args.email }] });
//                 if (!user) {
//                     return "No such user";
//                 }

//                 const correctPw = await user.isCorrectPassword(args.password);

//                 if (!correctPw) {
//                     return "Incorrect password";
//                 }
//                 return user._id;
//             }
//         },
//         deleteBook: {
//             type: UserType,
//             args: {
//                 userId: {type: GraphQLString},
//                 bookId: {type: GraphQLString}
//             },
//             resolve: async (parent, args) => {
//                 const updatedUser = await User.findOneAndUpdate(
//                     { _id: args.userId },
//                     { $pull: { savedBooks: { bookId: args.bookId } } },
//                     { new: true }
//                   );
//                 if (!updatedUser) {
//                     return "Couldn't find user with this id!";
//                 }
//                 return UserType.findById(args.userId);
//             }
//         }
//     }
// });


module.exports = new GraphQLSchema({
    query: RootQuery,
});