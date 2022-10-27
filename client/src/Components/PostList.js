import {useQuery, useLazyQuery, useMutation} from '@apollo/client';
import {useState, useContext} from 'react'
import {GET_ALL_POSTS} from '../GraphQL/Queries'
import Post from './Post';
import {POST} from '../GraphQL/Mutations'
import { LoginContext } from '../Contexts/LoginContext';


function PostList() {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    let {loggedIn, userId} = useContext(LoginContext);
    let [addPost, {err}] = useMutation(POST, {
      onCompleted: (data)=>{
        let ccmts = posts.unshift(data.addPost);
      }
    });
    const {loading, error, data} = useQuery(GET_ALL_POSTS, {
      onCompleted: (qData)=>{
        let cmts = [];
        for(var i = 0; i < qData.allPosts.length; i++){
            cmts.push(qData.allPosts[i])
        }
        cmts.reverse();
        setPosts(cmts);
      },
      
    });
  
    if(loading) return null;
    if(error) return "Error: "+error
  
    let sendPost = () => {
        addPost({
            variables: {
                title:title,
                content: content,
                uid: userId,
            }
        })
    };

    return (
      <div className="post-list">
          { loggedIn ? <div className='post-form'>
              <input type='text' placeholder='Post Title' onChange={(e) => {setTitle(e.target.value)}}/><br/>
              <textarea placeholder='Post Content' onChange={(e)=>{setContent(e.target.value)}}></textarea>
              <button onClick={()=>{sendPost()}}>Post</button>
              </div> : ""
          }
         {
             posts.map(post => (<Post owner={false} setPosts={setPosts} key={post._id} post={post}/>))
         }
      </div>
    );
  }
  
  export default PostList;