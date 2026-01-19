import React from 'react'
import { useEffect, useState } from 'react';


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
        <div className='w-full h-full mt-32 flex flex-col justify-center items-center'>
            {(typeof data.users==="undefined")?(
                <p>Loading...</p>
            ):(
                data.users.map((user,i)=>(
                    <p key={i}>{user}</p>
                ))
            )}
        </div>
    )
}

export default Dashboard
