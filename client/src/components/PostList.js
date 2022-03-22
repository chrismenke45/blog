import React, { useEffect } from 'react'
import PostDisplay from "./PostDisplay";

function PostList(props) {
    const { posts, postsLoaded, getPosts } = props

    useEffect(() => {
        getPosts();//on mount pull data from api to make hero cards 
        console.log('hhhhh')
    }, []);
    /*
    let post1 = {
        _id: 69,
        post_title: 'Howdy',
        post_text: 'Yeehaw hawyee',
        comments: ['6666', '420', '9708', '0987'],
        img:
        {
            data: null,
            contentType: null
        },
        created: new Date('2022-03-20 10:29:00'),
        updated: null,
    }
    let post2 = {
        _id: 90,
        post_title: 'get it',
        post_text: 'sjfhjskfjsklhs;ldfgsjdflkgl',
        comments: ['9708', '0987'],
        img:
        {
            data: null,
            contentType: null
        },
        created: new Date('2022-03-21 13:40:00'),
        updated: null,
    }
    let post3 = {
        _id: 40,
        post_title: 'lsip',
        post_text: 'sjfhjskfjsklhs;ldfgsjdflkgl',
        comments: [],
        img:
        {
            data: null,
            contentType: null
        },
        created: new Date('2022-02-21 13:40:00'),
        updated: new Date('2022-03-21 13:40:00'),
    }
    let posts = [post1, post2, post3]
    */
    return (
        <main>
            {console.log(posts)}
            {!postsLoaded ? <div className="spin"></div> : (
                        posts.map(post => {
                        return <PostDisplay key={post._id} post={post} />
                    })
            )
            }
        </main>
    );
}

export default PostList;
