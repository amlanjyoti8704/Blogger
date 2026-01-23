import React from 'react'
import { useEffect, useContext } from 'react';
import { AppContext } from '../Context/appContext.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function ManagePosts() {
    const navigate=useNavigate();
    const { userData, currentPost, setCurrentPost, posts, fetchPosts, backendURL, userToken }=useContext(AppContext)

    const myPosts=posts?.filter(post=>post.userId===userData?._id);

    // handle edit post
    const handleEdit=(post)=>{
        setCurrentPost(post);
        // navigate to edit post page
        navigate(`/edit-post/${post._id}`);
        
    }

    // handle delete post
    const handleDelete=async(postId)=>{
        const confirmDelete=window.confirm("Are you sure you want to delete this post?");
        if(!confirmDelete){
            return;
        }

        try{
            // call delete api
            await axios.delete(`${backendURL}/api/post/deletepost/${postId}`, {
                headers: {
                    token: userToken,
                },
            });
            // refetch posts
            fetchPosts();
        }
        catch(error){
            console.error("Error deleting post:", error);
        }
    }

    return (
        <div>
            <div className='flex flex-col justify-center items-center'>
                <div>
                    <h1 className='text-3xl font-bold dark:text-white'>Manage Posts</h1>
                </div>
                <div className=''>
                    <div>
                        {myPosts?.length===0 ? (
                            <p className='dark:text-gray-300'>No posts to manage.</p>
                        ):(
                            <div className='flex flex-col gap-4 mt-6'>
                                {myPosts.map((post)=>(
                                    <div key={post._id} className='border p-4 rounded-lg h-auto w-150 shadow-md dark:bg-gray-800 dark:text-gray-200'>
                                        <img src={`${backendURL}${post.image}`} alt={post.title} className='w-full h-48 object-cover mb-4 rounded'/>
                                        <h2 className='text-2xl font-semibold mb-2'>{post.title}</h2>
                                        <p className='mb-4'>{post.content.substring(0,100)}...</p>
                                        <div className='flex gap-4'>
                                            <button onClick={()=>{handleEdit(post)}} className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>Edit</button>
                                            <button onClick={()=>handleDelete(post._id)} className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'>Delete</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="text-center mt-10">
                        <NavLink
                            to="/create-post"
                            className="text-teal-500 hover:underline"
                        >
                            Create a new post →
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManagePosts
