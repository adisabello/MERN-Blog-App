
function Comment({comment}){

    let user = "_";
    if(comment.user){
        user = user.username
    }
    var datetime = new Date(comment.dateCreated)
    var date = datetime.toDateString();
    return (
        <div className='comment'>
            <div ><span className='date'>By {user} on {date}</span></div>
            <p>{comment.content}</p>
        </div>
    )

}

export default Comment;