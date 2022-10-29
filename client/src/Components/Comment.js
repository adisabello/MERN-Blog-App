import {useContext} from 'react'
import {DELETE_COMMENT} from '../GraphQL/Mutations'
import { useMutation } from '@apollo/client';
import { LoginContext } from '../Contexts/LoginContext';

function Comment({comment, setComments, pid, owner}){
    let {userId} = useContext(LoginContext);
    let [deleteComment, {err}] = useMutation(DELETE_COMMENT, {
        onCompleted: (data)=>{
            setComments(data.deleteComment.comments);
        }
    })

    let user = "_";
    if(comment.user){
        user = comment.user.username
    }
    var datetime = new Date(comment.dateCreated)
    var date = datetime.toDateString();

    let delComment = ()=>{
        deleteComment({
            variables: {
                uid: userId,
                pId: pid,
                cId: comment._id
            }
        })
    }

    return (
        <div className='comment'>
            <div ><span className='date'>By {user} on {date}</span></div>
            <p>{comment.content}</p>
            {owner ? <button onClick={() => delComment()}>Delete Comment</button>: ""}
        </div>
    )

}

export default Comment;       