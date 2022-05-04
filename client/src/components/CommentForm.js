import { useState } from 'react'

function CommentForm(props) {
    const { postid } = props
    const [commentInfo, setCommentInfo] = useState(
        {
            comment_text: '',
            username: '',
        }
    )

    const submitHandler = (e) => {
        e.preventDefault();
        //e.target.reset();
        let url = process.env.REACT_APP_developmentAPIurl + '/api/posts/' + postid + '/comment/create'
        fetch(url, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "comment_text": commentInfo.comment_text,
                "username": commentInfo.username,
            }),
        })
        window.location.reload(false);

    }

    return (
        <form onSubmit={submitHandler} className="wide">
            <div className='formGroup'>
                <label htmlFor='comment_text'>Comment:</label>
                <textarea name='comment_text' maxLength='280' onChange={e => setCommentInfo({ ...commentInfo, comment_text: e.target.value})} required></textarea>
            </div>
            <div className='formGroup'>
                <label htmlFor='username'>Your Name:</label>
                <input type='text' name='username' maxLength='30' onChange={e => setCommentInfo({ ...commentInfo, username: e.target.value})} required></input>
            </div>
            <button type='submit'>Submit</button>
        </form>
    );
}

export default CommentForm;