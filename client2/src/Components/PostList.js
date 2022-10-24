import {useQuery, useLazyQuery} from '@apollo/client';
import {useState} from 'react'
import {GET_ALL_POSTS} from '../GraphQL/Queries'
import Post from './Post';

import {gql} from '@apollo/client'

function PostList() {
    const [posts, setPosts] = useState([]);
    const {loading, error, data} = useQuery(GET_ALL_POSTS, {
      onCompleted: (qData)=>{
        console.log(qData);
        setPosts(qData.allPosts);
      },
      
    });
  
    if(loading) return null;
    if(error) return "Error: "+error
  
    return (
      <div className="post-list">
         {
             posts.map(post => (<Post key={post._id} post={post}/>))
         }
      </div>
    );
  }
  
  export default PostList;