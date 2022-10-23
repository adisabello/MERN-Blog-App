const {Comment} = require('../models/Comment');
const Post = require('../models/Post');
const {User} = require('../models/User');

const {gql} = require("apollo-server-express");

const typeDefs = gql`

    type UserType {
        username: String!
        email: String!
        password: String!
        _id: String!
    }

    type CommentType {
        content: String!
        user: UserType
        _id: String!
    }

    type PostType {
        _id: String!
        content: String!
        title: String!
        comments: [CommentType]
    }

    #Queries
    type Query{
        allUsers: [UserType]
        allPosts: [PostType]
        post(id: String!): PostType
    }

    #Mutations
    type Mutation{
        login( credential: String! password: String!): String!
        addUser( email: String! username:String! password: String!): UserType
        addPost(content: String! title: String!): PostType
        deletePost(id: String!): String!
        addComment(content: String! pId: String): PostType
        deleteComment(cId: String!, pId: String!): PostType
    }
`

module.exports = {typeDefs};