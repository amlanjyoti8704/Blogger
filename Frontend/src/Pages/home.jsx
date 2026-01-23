import React, { useContext, useEffect } from 'react'
import Navbar from '../Components/navbar.jsx'
import Footer from '../Components/footer.jsx'
import { Link } from 'react-router-dom'
// import Content from '../Components/content.jsx'
import Dashboard from './dashboard.jsx'
import CreatePost from '../Components/createPost.jsx'
import { AppContext } from '../Context/appContext.jsx'
import PostCard from '../Components/postCard.jsx'
import Login from '../Components/login.jsx'

function Home() {
    const {userData, posts, fetchPosts, setShowLogin}=useContext(AppContext);

    useEffect(() => {
    fetchPosts();
    }, [fetchPosts]);

    return (
        <div className='w-full flex flex-col justify-center items-center'>
            {/* <div className='mt-10 p-6 w-[90%] md:w-3/4 lg:w-2/4  bg-amber-100 dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900'>
                
            </div> */}
            <div className='w-full top-0'>
                <Dashboard/>
            </div>
            <div className='my-20'>
                {posts?.length === 0 && (
                    <p className="text-center text-gray-500">
                        No posts found.
                    </p>
                )}

                {posts?.length!==0 && (
                    <h1 className='text-center text-3xl mb-10 font-bold text-slate-900 dark:text-slate-300'>
                        Some Blogs
                    </h1>
                )}

                <div className="flex flex-wrap gap-6 justify-center dark:text-slate-300">
                    {posts?.slice(0,2).map((post) => (
                        <PostCard key={post._id} post={post} />
                    ))}
                </div>
            </div>
            {userData ? (
                <div className='w-screen'>
                    <CreatePost/>
                </div>
            )
            :(
                <div>
                    <span className='dark:text-white'>
                        <button className='text-blue-400 mr-1 hover:underline cursor-pointer' onClick={() => {setShowLogin(true)}}>
                            Login
                        </button>
                        to create a post!!
                    </span>
                </div>
            )}
        </div>
    )
}

export default Home
