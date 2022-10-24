import {gql} from '@apollo/client'

const GET_ALL_POSTS = gql`
query AllPosts {
  allPosts {
    _id
    content
    title
    dateCreated
    comments {
      content
      _id
      dateCreated
    }
  }
}
`

export {GET_ALL_POSTS}