import React, { useEffect } from 'react'
import PostDisplay from "./PostDisplay";

function PostList(props) {
    const { posts, loaded, getPosts, setLoaded } = props

    useEffect(() => {
        setLoaded(false)
        getPosts();//on mount pull data from api to get posts
    }, []);
    return (
        <main>
            {!loaded ? <div className="spin"></div> : (
                        posts.map(post => {
                        return <PostDisplay key={post._id} post={post} setLoaded={setLoaded} />
                    })
            )
            }
        </main>
    );
}

export default PostList;
