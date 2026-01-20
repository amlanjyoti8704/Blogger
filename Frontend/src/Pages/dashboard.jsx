import React from 'react'
import { useEffect, useState } from 'react';
import About from './about';
import { TypeAnimation } from 'react-type-animation';
import {FaLightbulb} from 'react-icons/fa';


function Dashboard() {
    const [data, setData] = useState([{}]);
    useEffect(() => {
        fetch('/api').then(
        res=>res.json().then(
            data=>{
            setData(data);
            console.log(data);
            }
        )
        )
    }, []);
    return (
        <div className='w-full h-full flex flex-col justify-center items-center '>
            
            <div className=' pt-17 pb-10 w-[90%] md:w-3/4 lg:w-2/4 bg-amber-100 dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900 flex flex-col items-center gap-15'>
                <div className="relative">
                    <FaLightbulb
                        className="dark:text-yellow-400 text-shadow-yellow-950 text-9xl animate-bounce dark:animate-pulse"
                    />
                    {/* Glow */}
                    <div className="absolute hidden dark:block inset-0 blur-2xl bg-yellow-300 opacity-50 rounded-full"></div>
                </div>
                <div className='text-black dark:text-transparent text-xl text-center'>
                    <span className='bg-clip-text bg-gradient-to-t from-gray-600 via- to-gray-400 font-extrabold md:text-3xl'>
                    <TypeAnimation
                        sequence={[
                        'Think. Build. Share. Grow.',
                        2000,
                        'From Curiosity to Clarity.',
                        2000]}
                        wrapper="span"
                        speed={50}
                        repeat={Infinity}
                    />
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
