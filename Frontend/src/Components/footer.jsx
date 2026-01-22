import React from 'react'
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

function Footer() {
    return (
        <div className='container border-t-1 border-t-gray-400 px-4 2xl:px-20 mx-auto flex items-center justify_between gap-4 py-3 mt-20'>
            
            <p className='flex-1 pl-4 text-sm dark:text-gray-300 text-gray-500 max-sm:hidden'>Copyright @AmlanJyoti | All right reserved.</p>
            <div className='flex gap-10'>
                <a className='flex items-center justify-center bg-gray-500 dark:bg-gray-300 rounded-full border size-10 text-center align-middle' href="https://www.facebook.com/profile.php?id=100089800446175" target='_blank'><FaFacebookF className="text-white dark:text-blue-600 hover:text-white" /></a>
                <a className='flex items-center justify-center bg-gray-500 dark:bg-gray-300 rounded-full border size-10 text-center align-middle' href="#"><FaLinkedinIn className="text-white dark:text-blue-700 hover:text-white" /></a>
                <a className='flex items-center justify-center bg-gray-500 dark:bg-gray-300 rounded-full border size-10 text-center align-middle' href="https://www.instagram.com/amlan._.jyoti/" target='_blank'><FaInstagram className="text-white dark:text-pink-600 hover:text-white" /></a>
            </div>
        </div>
    )
}

export default Footer
