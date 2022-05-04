import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Header from "./components/Header";
import PostList from "./components/PostList";
import IndividualPost from "./components/IndividualPost"
import PostForm from "./components/PostForm";
import SetCredentials from "./components/SetCredentials";

import fetchPosts from "./functions/fetchPosts";
import fetchPost from "./functions/fetchPost";
import getUser from "./functions/getUser"

function App() {
  const [posts, setPosts] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [post, setPost] = useState({})
  const [user, setUser] = useState(null)


  useEffect(() => {
    let getUserInfo = getUser();
    if (!getUserInfo[2]) {
      setUser(getUserInfo.slice(0,2))
    }
    console.log("getuserinfo", getUserInfo)
  }, [])


  //console.log("user", user)
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
      <Header setLoaded={setLoaded} user={user} setUser={setUser}/>
      <Routes>
        <Route path="/posts" element={<PostList posts={posts} loaded={loaded} getPosts={getPosts} setLoaded={setLoaded} />}>
        </Route>
        <Route path="/posts/:id" element={<IndividualPost post={post} loaded={loaded} getPost={getPost} setLoaded={setLoaded} setPost={setPost} user={user}/>}>
        </Route>
        <Route path="/posts/create" element={<PostForm loaded={loaded} setLoaded={setLoaded} title="Create Post" user={user} />}>
        </Route>
        <Route path="/posts/:id/update" element={<PostForm post={post} loaded={loaded} getPost={getPost} setLoaded={setLoaded} title="Update Post" user={user}/>}>
        </Route>
        <Route
          path="/set-credentials"
          element={<SetCredentials />}
        />
        <Route
          path="/"
          element={<Navigate to="/posts" replace />}
        />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
