import React from 'react'
import ThemeButton from './themeButton.jsx'


function Navbar() {
    return (
        <div className='flex flex-col justify-center items-center w-full h-32 fixed z-50 top-0 overflow-hidden'>
            <div className='w-full h-full object-cover flex justify-center items-center bg-gradient-to-r from-yellow-800 to-yellow-200 dark:from-gray-950 dark:to-gray-950 shadow-md'>
                {/* <img className='m-auto object-cover' src={headingLogo} alt="" /> */}
                <h1 className='text-5xl text-[#200e02] dark:text-white font-extrabold'>BLOGGER</h1>
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
                <div className='flex items-center justify-center mr-9'>
                    <a href="/login" className='bg-gray-300 border-1 border-black hover:bg-white text-black px-4 py-1 rounded-full'>Login</a>
                </div>

            </div>
        </div>
    )
}

export default Navbar
