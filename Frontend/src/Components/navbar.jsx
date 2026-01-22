import React from 'react'
import ThemeButton from './themeButton.jsx'
import {Link, NavLink} from 'react-router-dom'
import { useContext } from 'react';
import { AppContext } from '../Context/appContext.jsx';
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { FiBell } from 'react-icons/fi';



function Navbar() {
    const { setShowLogin, userData, logout } = useContext(AppContext);
    const navigate=useNavigate();
    const menuRef=useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(()=>{
        const handleClickOutside=(event)=>{
            if(menuRef.current && !menuRef.current.contains(event.target)){
                setIsOpen(false);
            }
        }
        if(isOpen){
            document.addEventListener('click', handleClickOutside);
        }
        else{
            document.removeEventListener('click', handleClickOutside);
        }
        return ()=>{
            document.removeEventListener('click', handleClickOutside);
        }
    },[isOpen]);   


    return (
        <div className='flex flex-col justify-center items-center w-full h-32 fixed z-50 top-0 overflow-hidden'>
            <div className='w-full h-full object-cover flex justify-center items-center bg-gradient-to-r from-yellow-800 to-yellow-200 dark:from-gray-950 dark:to-gray-950 shadow-md'>
                {/* <img className='m-auto object-cover' src={headingLogo} alt="" /> */}
                {/* <h1 onClick={()=>navigate('/')} className='text-5xl text-[#200e02] dark:text-white font-extrabold'>BLOGGER</h1> */}
                <span className='font-extrabold bg-gradient-to-r to-[#200e02] from-[#89461a] dark:from-slate-400 dark:via-slate-200 dark:to-slate-500 bg-clip-text text-transparent text-6xl'>
                    BLOGGER
                </span>
            </div>
            <div className='w-[90%] border-t dark:border-gray-400'></div>
            <div className=' w-full h-16 bg-amber-950/50 dark:bg-gradient-to-b dark:from-slate-950 dark:to-[#383a49d6] flex items-center justify-between text-black font-bold text-xl shadow-xl dark:shadow-black'>
                
                {/* <div className='flex gap-8 items-center ml-9'>
                    <a className='text-[#200e02] dark:text-white' href="">Dashboard</a>
                    <a className='text-[#200e02] dark:text-white' href="">Posts</a>
                    <a className='text-[#200e02] dark:text-white' href="">Calender</a>
                    <a className='text-[#200e02] dark:text-white' href="">About</a>
                    <ThemeButton/>
                </div> */}
               
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="xl:hidden text-white text-3xl focus:outline-none order-first flex items-center ml-4"
                    aria-expanded={isOpen}
                >
                    {isOpen ? <FiX /> : <FiMenu />}
                </button>

                <div
                    ref={menuRef}
                    className={`xl:flex flex-col xl:flex-row xl:space-x-10 xl:items-center 
                            absolute xl:relative xl:left-8 xl:top-0 right-0 left-0 w-[100vw] xl:w-auto
                            overflow-y-auto xl:overflow-visible xl:bg-transparent xl:p-0 
                            transition-[max-height,padding] duration-300 ease-in-out
                            ${isOpen ? 'max-h-[70vh] p-4' : 'max-h-0 p-0'}
                        `}
                >
                    <ul className={`flex flex-col font-medium xl:flex-row xl:space-x-10 gap-4 sm:gap-4 lg:gap-8 xl:gap-0 xl:mt-0 xl:items-center xl:mr-5 transition-all duration-300 ease-in-out ${isOpen ? 'mt-4' : 'mt-0'}`}>
                        <li>
                            <NavLink to="/" className={({ isActive }) => `${isActive ? "text-black dark:text-white border-b xl:border-0 xl:scale-120 xl:hover:border-b-0 xl:text-black dark:xl:text-gray-200" : "lg:border-0 text-black dark:text-gray-100"} block py-2 pr-2 pl-1 duration-200 hover:bg-transparent xl:hover:border-b lg:p-0`}>
                                Dashsboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/posts" className={({ isActive }) => `${isActive ? "text-black dark:text-white border-b xl:border-0 xl:scale-120 xl:hover:border-b-0 xl:text-black dark:xl:text-gray-200" : "lg:border-0 text-black dark:text-gray-100"} block py-2 pr-2 pl-1 duration-200 hover:bg-transparent xl:hover:border-b lg:p-0`}>
                                Posts
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className={({ isActive }) => `${isActive ? "text-black dark:text-indigo-950 border-b xl:border-0 xl:scale-120 xl:hover:border-b-0 xl:text-black" : "lg:border-0 text-black"} block py-2 pr-2 pl-1 duration-200 hover:bg-transparent xl:hover:border-b lg:p-0`}>
                                <ThemeButton/>
                            </NavLink>
                        </li>
                        {userData?.isAdmin && (
                            <NavLink to="/users" className={({ isActive }) => `${isActive ? "text-black dark:text-white border-b xl:border-0 xl:scale-120 xl:hover:border-b-0 xl:text-black dark:xl:text-gray-200" : "lg:border-0 text-black dark:text-gray-100"} block py-2 pr-2 pl-1 duration-200 hover:bg-transparent xl:hover:border-b lg:p-0`}>
                                Users
                            </NavLink>
                        )}
                        {/* <li>
                            <NavLink>

                            </NavLink>
                        </li> */}
                        <li>
                            <NavLink to="/about" className={({ isActive }) => `${isActive ? "text-black dark:text-white border-b xl:border-0 xl:scale-120 xl:hover:border-b-0 xl:text-black dark:xl:text-gray-200" : "lg:border-0 text-black dark:text-gray-100"} block py-2 pr-2 pl-1 duration-200 hover:bg-transparent xl:hover:border-b lg:p-0`}>
                                About
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <div className='flex items-center gap-4 mr-9'>
                    {userData ? (
                        <>
                            <span className="text-white">{userData.username}</span>
                            <button onClick={logout} className="bg-red-500 text-white px-4 py-1 rounded-full">
                                Logout
                            </button>
                        </>
                    ):(
                        <button onClick={() => setShowLogin(true)} className="bg-gray-300 hover:bg-white text-black px-4 py-1 rounded-full">
                            Login
                        </button>
                    )}
                </div>

            </div>
        </div>
    )
}

export default Navbar
