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
        dateCreated: Float!
    }

    type PostType {
        _id: String!
        content: String!
        title: String!
        comments: [CommentType],
        dateCreated: Float!
        user: UserType
    }

    #Queries
    type Query{
        allUsers: [UserType]
        allPosts: [PostType]
        post(id: String!): PostType
        posts(uid: String!): [PostType]
    }

    #Mutations
    type Mutation{
        login( email: String! password: String!): String!
        addUser( email: String! username:String! password: String!): UserType
        addPost(content: String! title: String! uid: String!): PostType
        deletePost(id: String! uid:String!): [PostType]
        addComment(content: String! pId: String! uid:String!): PostType
        deleteComment(cId: String!, pId: String! uid:String!): PostType
    }
`

module.exports = {typeDefs};