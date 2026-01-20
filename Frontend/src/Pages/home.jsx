import React from 'react'
import Navbar from '../Components/navbar.jsx'
import Footer from '../Components/footer.jsx'
// import Content from '../Components/content.jsx'
import Dashboard from './dashboard.jsx'

function Home() {
    return (
        <div className='w-full  flex flex-col justify-center items-center'>
            {/* <div className='mt-10 p-6 w-[90%] md:w-3/4 lg:w-2/4  bg-amber-100 dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900'>
                
            </div> */}
            <Dashboard/>
        </div>
    )
}

export default Home
