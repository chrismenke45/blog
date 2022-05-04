import timeFinder from "../functions/timeFinder";

function CommentDisplay(props) {
    const { comment, postid, user } = props;
    const deleteCommentHandler = (e) => {
        e.preventDefault();
        let url = process.env.REACT_APP_developmentAPIurl + '/api/posts/' + postid + '/comment/' + comment._id + '/delete'
        fetch(url, {
            method: 'DELETE',
        })
        window.location.reload(false);
    }
    return (
        <div className="wide" key={comment._id}>
            <div className="dateContainer">
                <p>{timeFinder(comment.created)}</p>
            </div>
            <p>{comment.comment_text}</p>
            <p>{comment.username}</p>
            {(user && user[1] && user[1].admin) ? (
            <button onClick={deleteCommentHandler}>Delete</button>
            ) : (
                null
            )}
        </div>
    );
}

export default CommentDisplay;