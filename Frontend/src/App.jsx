import React, { use } from 'react'
import { useEffect, useState } from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './Pages/home.jsx';
import { useContext } from 'react';
import { AppContext } from './Context/appContext.jsx';
import Login from './Components/login.jsx';

function App() {

  const { showLogin } = useContext(AppContext);

  return (
    <div>
      {showLogin && <Login />}
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App
