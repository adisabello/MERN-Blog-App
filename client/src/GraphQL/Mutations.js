import {gql} from '@apollo/client'

export const CREATE_USER = gql`

    mutation($email: String!, $username: String!, $password: String!){
        addUser(email: $email, username: $username, password: $password) {
            _id
            username
            email
        }
    }
`;

export const LOGIN = gql`
    mutation($email: String!, $password: String!){
        login(email: $email, password: $password)
    }
`

export const ADD_COMMENT = gql`
    mutation($content: String!, $uid: String!, $pId: String!){
        addComment(content: $content, uid: $uid, pId: $pId) {
            _id
            user {
                username
            }
            content
            title
            comments {
                _id
                content
                user {
                    username
                }
                dateCreated
            }
            dateCreated
        }
    }
`;

export const POST = gql`
    mutation($content: String!, $title: String!, $uid: String!){
        addPost(content: $content, title: $title, uid: $uid) {
            _id
            content
            title
            user {
                username
            }
            dateCreated
            comments {
                _id
                content
                user {
                    username
                }
                dateCreated
            }
        }
    }
`;

export const DELETE_POST = gql`
    mutation($deletePostId: String!, $uid: String!){
        deletePost(id: $deletePostId, uid: $uid){
            _id
            title
            content
            dateCreated
            user {
                username
            }
            comments {
                _id
                content
                dateCreated
                user {
                    username
                }
            }
        }
    }
`;

export const DELETE_COMMENT = gql`
mutation($cId: String!, $pId: String!, $uid: String!){
    deleteComment(cId: $cId, pId: $pId, uid: $uid) {
      comments {
        _id
        content
        user {
          username
        }
        dateCreated
      }
    }
  }

`