import React, { useEffect } from 'react'
import { useParams } from "react-router-dom"
import CommentForm from './CommentForm';

function IndividualPost(props) {
  const { post, loaded, getPost, setLoaded } = props
  const { id } = useParams()

  useEffect(() => {
    setLoaded(false)
    getPost(id);//on mount pull data from api to get posts
  }, []);
  return (
    <main>
      {!loaded ? <div className="spin"></div> : (
        <div>
          <div>
            <h1>{post.post_title}</h1>
            {post.post_text ? <p>{post.post_text}</p> : null}

            {post.img && post.img.data ? <img src={'data:image/' + post.img.contenttype + ';base64,' + post.img.data.toString('base64')}></img> : null}

            <p>Origionally Published: {post.created.toString()}</p>
            {post.comments.length == 0 ?
              <p>Be the first to comment</p> :
              post.comments.map(comment => {
                return (
                  <div key={comment._id}>
                    <p>{comment.comment_text}</p>
                    <br></br>
                    <p>{comment.username}</p>
                    <br></br>
                    <p>{comment.created}</p>
                  </div>
                )
              })}
            {post.updated ? <p>Updated: {post.updated.toString()}</p> : null}
            <p>{post.url}</p>
          </div>
          <div>
            <h3>Add a Comment!</h3>
            <CommentForm postid={id}/>
          </div>
        </div>
      )
      }
    </main>
  );
}

export default IndividualPost;
