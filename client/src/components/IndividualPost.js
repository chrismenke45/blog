import React, { useEffect } from 'react'
import { useParams, useNavigate, Link } from "react-router-dom"
import CommentForm from './CommentForm';
import CommentDisplay from './CommentDisplay';
import timeFinder from '../functions/timeFinder';

function IndividualPost(props) {
  const { post, loaded, getPost, setLoaded, setPost, user } = props
  const { id } = useParams()

  useEffect(() => {
    setLoaded(false)
    getPost(id);//on mount pull data from api to get posts
  }, []);

  let navigate = useNavigate()
  const deletePostHandler = (e) => {
    e.preventDefault();
    let url = process.env.REACT_APP_developmentAPIurl + '/api/posts/' + id + '/delete'
    fetch(url, {
      method: 'DELETE',
    })
      .then(() => {
        navigate('/', { replace: true })
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  return (
    <main>
      {!loaded ? <div className="spin"></div> : (
        <div className='mainInfo'>
          <div className='postDisplay'>
            <div className='dateContainer'>
              <p>{timeFinder(post.created.toString())}</p>
            </div>
            <h1>{post.post_title}</h1>
            {(user && user[1] && user[1].admin) ? (
                    <Link
                    to={'/posts/' + post._id + '/update'}
                    onClick={() => setLoaded(false)}>
                    <button>Update</button>
                  </Link>
                ) : (
                    null
                )}
            {post.post_text ? <p>{post.post_text}</p> : null}
            {post.img && post.img.data ? <img className="displayImg" src={('data:image/' + post.img.contentType + ';base64,' + btoa(String.fromCharCode(...new Uint8Array(post.img.data.data))))}></img> : null}
            {(user && user[1] && user[1].admin) ? (
            <button onClick={deletePostHandler}>Delete Post</button>
            ) : (
              null
            )}
            <div className='dateContainer'>
              {post.updated ? <p>Updated: {timeFinder(post.updated.toString())}</p> : null}
            </div>
          </div>
          <div className='postDisplay'>
            {post.comments.length == 0 ?
              null :
              post.comments.map(comment => {
                return <CommentDisplay key={comment._id} comment={comment} postid={id} user={user}/>
                {/*(
                  <div key={comment._id}>
                    <p>{comment.comment_text}</p>
                    <br></br>
                    <p>{comment.username}</p>
                    <br></br>
                    <p>{comment.created}</p>
                </div>
                )*/}
              })}
          </div>
          <div className='postDisplay'>
            <h3>Add a Comment!</h3>
            <CommentForm postid={id} />
          </div>
        </div>
      )
      }
    </main>
  );
}

export default IndividualPost;
