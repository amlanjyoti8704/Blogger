import React, { use } from 'react'
import { useEffect, useState } from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './Pages/home.jsx';
import { useContext } from 'react';
import { AppContext } from './Context/appContext.jsx';
import Login from './Components/login.jsx';
import About from './Pages/about.jsx';
import Layout from './Layout.jsx';
import Post from './Pages/post.jsx';


function App() {

  const { showLogin } = useContext(AppContext);

  return (
    <div>
      {showLogin && <Login />}
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='about' element={<About/>}/>
          <Route path='post' element={<Post/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
