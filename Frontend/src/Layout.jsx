import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import Navbar from '../src/Components/navbar.jsx'
import Footer from '../src/Components/footer.jsx'

function Layout() {
  const location = useLocation();

  // Redirect to home if the current path is '/'
  // if (location.pathname === '/') {
  //   return <Navigate to="/" replace />;
  // }

  return (
    <div className="flex flex-col min-h-screen dark:bg-gradient-to-t dark:from-slate-950 dark:to-slate-400">
      <Navbar />
      <main className="flex-grow pt-[300px] min-h-[calc(100vh-300px)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout