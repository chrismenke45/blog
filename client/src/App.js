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

function App() {
  const [posts, setPosts] = useState([])
  const [postsLoaded, setPostsLoaded] = useState(false)


  const getPosts = () => {
    fetchPosts()
      .then(postsArray => {
        setPosts(postsArray)
        setPostsLoaded(true)
      }
      )

  }
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/posts" element={<PostList posts={posts} postsLoaded={postsLoaded} getPosts={getPosts} />}>
        </Route>
        <Route path="/posts/:id" element={<IndividualPost/>}>
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
