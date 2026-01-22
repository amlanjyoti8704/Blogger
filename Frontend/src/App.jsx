import React, { use } from 'react'
import { useEffect, useState } from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import Home from './Pages/home.jsx';
import { useContext } from 'react';
import { AppContext } from './Context/appContext.jsx';
import Login from './Components/login.jsx';
import About from './Pages/about.jsx';
import Layout from './Layout.jsx';
import Posts from './Pages/posts.jsx';
import Post from './Pages/post.jsx'
import CreatePost from './Components/createPost.jsx';
import User from './Pages/user.jsx';


function App() {

  const { showLogin, userData } = useContext(AppContext);

  return (
    <div>
      {showLogin && <Login />}
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='about' element={<About/>}/>
          <Route path='posts' element={<Posts/>}/>
          <Route path='post/:slug' element={<Post/>}/>

          <Route path="create-post" element={userData?.isAdmin?<CreatePost/>:<Navigate to="/"/>}/>
          <Route path="users" element={userData?.isAdmin?<User/>:<Navigate to="/"/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
