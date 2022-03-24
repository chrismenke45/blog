import {
  Link
} from "react-router-dom";

function PostDisplay(props) {
  const { post, setLoaded } = props;
  return (
    <article>
      <Link
        to={'/posts/' + post._id}
        onClick={() => setLoaded(false)}>
        <h2>{post.post_title}</h2>
      </Link>
      {post.post_text ? <p>{post.post_text}</p> : null}

      {post.img && post.img.data ? <img src={'data:image/' + post.img.contenttype + ';base64,' + post.img.data.toString('base64')}></img> : null}

      <p>Origionally Published: {post.created.toString()}</p>
      {post.comments.length != 0 ? <p>{post.comments.length.toString()} comments</p> : null}
      {post.updated ? <p>Updated: {post.updated.toString()}</p> : null}
    </article>
  );
}

export default PostDisplay;
