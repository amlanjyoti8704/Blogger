import React from 'react'
import ThemeButton from './themeButton.jsx'
import { useContext } from 'react';
import { AppContext } from '../Context/appContext.jsx';
import {useNavigate} from 'react-router-dom';


function Navbar() {
    const { setShowLogin, userData, logout } = useContext(AppContext);
    const navigate=useNavigate();


    return (
        <div className='flex flex-col justify-center items-center w-full h-32 fixed z-50 top-0 overflow-hidden'>
            <div className='w-full h-full object-cover flex justify-center items-center bg-gradient-to-r from-yellow-800 to-yellow-200 dark:from-gray-950 dark:to-gray-950 shadow-md'>
                {/* <img className='m-auto object-cover' src={headingLogo} alt="" /> */}
                <h1 onClick={()=>navigate('/')} className='text-5xl text-[#200e02] dark:text-white font-extrabold'>BLOGGER</h1>
            </div>
            <div className='w-[90%] border-t dark:border-gray-400'></div>
            <div className=' w-full h-16 bg-amber-950/50 dark:bg-gradient-to-b dark:from-slate-950 dark:to-[#383a49d6] flex items-center justify-between text-black font-bold text-xl shadow-xl dark:shadow-black'>
                
                <div className='flex gap-8 items-center ml-9'>
                    <a className='text-[#200e02] dark:text-white' href="">Dashboard</a>
                    <a className='text-[#200e02] dark:text-white' href="">Habits</a>
                    <a className='text-[#200e02] dark:text-white' href="">Calender</a>
                    <ThemeButton/>
                    <a className='text-[#200e02] dark:text-white' href="">About</a>
                </div>
                <div className='flex items-center gap-4 mr-9'>
                    {userData ? (
                        <>
                            <span className="text-white">{userData.email}</span>
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
