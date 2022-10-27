import {useQuery} from '@apollo/client'
import {useState, useContext} from 'react'
import { LoginContext } from '../Contexts/LoginContext';
import {useNavigate} from 'react-router-dom'
import Post from './Post'
import {GET_ALL_POSTS_FOR_USER} from '../GraphQL/Queries'

const MyPost = function(){
    let nav = useNavigate()
    let {loggedIn, userId} = useContext(LoginContext)
    if(!loggedIn){
        nav('../login');
    }
    const [posts, setPosts] = useState([]);
    const {loading, error, data} = useQuery(GET_ALL_POSTS_FOR_USER, {
      onCompleted: (qData)=>{
        setPosts(qData.posts);
      },
      variables: {
          uid: userId
      }
    });
  
    if(loading) return null;
    if(error) return "Error: "+error
  
    return (
      <div className="post-list">
         {
             posts.map(post => (<Post owner={true} key={post._id} post={post} setPosts={setPosts}/>))
         }
      </div>
    );
}

export default MyPost;