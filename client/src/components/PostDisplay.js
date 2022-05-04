import {
  Link
} from "react-router-dom";
import timeFinder from "../functions/timeFinder";

function PostDisplay(props) {
  const { post, setLoaded } = props;
  return (
    <article className="postDisplay">
      <div className="dateContainer">
        <p>{timeFinder(post.created.toString())}</p>
      </div>

      <Link
        className="link"
        to={'/posts/' + post._id}
        onClick={() => setLoaded(false)}>
        <h2>{post.post_title}</h2>
      </Link>
      {post.post_text ? <p>{post.post_text}</p> : null}

      {post.img && post.img.data ? <img src={'data:image/' + post.img.contentType + ';base64,' + btoa(String.fromCharCode(...new Uint8Array(post.img.data.data)))} className="displayImg"></img> : null}
      {post.comments.length != 0 ? <p>{post.comments.length.toString()} comments</p> : null}
      <div className="dateContainer">
        {post.updated ? <p>Updated: {timeFinder(post.updated.toString())}</p> : null}
      </div>

    </article>
  );
}

export default PostDisplay;
