import React from 'react';
import amlanjyoti from "../assets/amlanjyoti.jpeg"

function About() {
  return (
    <div className="bg-transparent">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="md:flex grid grid-rows-2 md:flex-row items-center justify-center md:justify-normal gap-10 lg:gap-20">

          {/* Content */}
          <div className="md:w-7/12 lg:w-6/12 order-2">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center md:text-left tracking-tight">
              <span className="bg-gradient-to-br from-pink-700 via-yellow-600 to-red-500 dark:from-blue-300 dark:via-blue-200 dark:to-blue-100 bg-clip-text text-transparent">
                Something about Project
              </span>
            </h2>

            <p className="mt-6 text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              Blogger is a full-stack blogging platform built with React on the frontend and Express / Node.js on the backend. It allows users to register, create, manage, edit, and delete blog posts with image upload support. The application also includes user authentication and role-based access so that users can manage their own content securely.
            </p>

            <p className="mt-4 text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
             This project demonstrates core features of modern web applications such as RESTful APIs, JWT based authentication, CRUD operations, file uploads, protected routes, and dynamic routing in React.
            </p>
          </div>

          <div className='md:z-20 z-10 flex-block order-1 row-span-1 h-100 w-75 md:h-100 md:w-75 rounded-full bg-[#030417] justify-center items-center relative md:absolute top-4/10 sm:top-5/11 md:top-8/16 left-1/2 md:left-3/4 -translate-x-1/2 -translate-y-1/2 md:-translate-y-1/2 drop-shadow-[0_0_60px_gray] dark:drop-shadow-[0_0_60px_#222d72]'>
              <img 
                  src={amlanjyoti}
                  alt="Profile_image" 
                  className='md:z-30 w-full h-full object-contain rounded-full overflow-t-visible md:transition-transform md:duration-400 md:ease-in-out md:hover:scale-110 origin-bottom'
              />
          </div>

        </div>
      </div>
    </div>
  );
}

export default About;