import Comment from './Comment';
import {useContext, useState} from 'react';
import { LoginContext } from '../Contexts/LoginContext';
import {useMutation} from '@apollo/client'
import {ADD_COMMENT} from '../GraphQL/Mutations'
import {DELETE_POST} from '../GraphQL/Mutations'

function Post({post, owner, setPosts}){

    let {loggedIn, userId} =  useContext(LoginContext);
    const [content, setContent] = useState("");
    let user = "_";
    if(post.user){
        user = user.username
    }
    var datetime = new Date(Number(post.dateCreated))
    var date = datetime.toDateString();
    let cmts = [];
    for(var i = 0; i < post.comments.length; i++){
        cmts.push(post.comments[i])
    }
    cmts.reverse();
    const [comments, setComments] = useState(cmts);
    let [addComment, {error}] = useMutation(ADD_COMMENT, {
        onCompleted: (data)=>{
            setComments(data.addComment.comments.reverse())
        }
    });

    let [deletePost, {err}] = useMutation(DELETE_POST, {
        onCompleted: (data)=>{
            // console.log(data);
            setPosts(data.deletePost.reverse());
        }
    })

    let postComment = () => {
        addComment({
            variables: {
                content: content,
                uid: userId,
                pId: post._id
            }
        })
    };

    let delPost = ()=>{
        deletePost({
            variables: {
                uid: userId,
                deletePostId: post._id
            }
        })
    }

    return (
        <div className='post'>
            <div className='title'>
                <h3>{post.title}</h3>
                <span className='date'>By {user} on {date}</span>
            </div>
            <p>{post.content}</p>

            <div className='comments'>
                { loggedIn ? <div><textarea placeholder='Comment' onChange={(e)=>{setContent(e.target.value)}}></textarea><button onClick={()=>{postComment()}}>Comment</button></div> : ""}
                {owner ? <button onClick={()=>{delPost()}}>Delete</button>: ""}
                {
                    comments.map(comment => 
                        (<Comment comment={comment} owner={owner} setComments={setComments} key={comment._id} pid={post._id}/>))
                }
            </div>
        </div>
    )
}

export default Post;