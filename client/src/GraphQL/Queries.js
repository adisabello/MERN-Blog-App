import {gql} from '@apollo/client'

const GET_ALL_POSTS = gql`
query AllPosts {
  allPosts {
    _id
    content
    title
    dateCreated
    user{
      username
    }
    comments {
      content
      _id
      dateCreated
    }
  }
}
`

export const GET_ALL_POSTS_FOR_USER = gql`
  query ($uid: String!) {
    posts(uid: $uid) {
      _id
      content
      title
      dateCreated
      user{
        username
      }
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

export {GET_ALL_POSTS}