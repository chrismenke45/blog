import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Header from "./components/Header";
import PostList from "./components/PostList";
import IndividualPost from "./components/IndividualPost"

import fetchPosts from "./functions/fetchPosts";
import fetchPost from "./functions/fetchPost";

function App() {
  const [posts, setPosts] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [post, setPost] = useState({})


  const getPosts = () => {
    fetchPosts()
      .then(postsArray => {
        setPosts(postsArray)
        setLoaded(true)
      }
      )
  }
  const getPost = (postid) => {
    fetchPost(postid)
      .then(post => {
        setPost(post)
        setLoaded(true)
      }
      )
  }


  return (
    <BrowserRouter>
      <Header setLoaded={setLoaded}/>
      <Routes>
        <Route path="/posts" element={<PostList posts={posts} loaded={loaded} getPosts={getPosts} setLoaded={setLoaded}/>}>
        </Route>
        <Route path="/posts/:id" element={<IndividualPost post={post} loaded={loaded} getPost={getPost} setLoaded={setLoaded} />}>
        </Route>
        <Route
        path="/"
        element={<Navigate to="/posts" replace />}
    />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
