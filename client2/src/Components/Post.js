import Comment from './Comment';

function Post({post}){

    let user = "_";
    if(post.user){
        user = user.username
    }
    var datetime = new Date(Number(post.dateCreated))
    var date = datetime.toDateString();
    let comments = post.comments;
    return (
        <div className='post'>
            <div className='title'>
                <h3>{post.title}</h3>
                <span className='date'>By {user} on {date}</span>
            </div>
            <p>{post.content}</p>
            <div className='comments'>
                {
                    comments.map(comment => 
                        (<Comment comment={comment} key={comment._id} pid={post._id}/>))
                }
            </div>
        </div>
    )
}

export default Post;