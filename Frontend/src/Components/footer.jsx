import React from 'react'

function Footer() {
    return (
        <div className='container border-t-1 border-t-gray-400 px-4 2xl:px-20 mx-auto flex items-center justify_between gap-4 py-3 mt-20'>
            
            <p className='flex-1 pl-4 text-sm dark:text-gray-300 text-gray-500 max-sm:hidden'>Copyright @AmlanJyoti | All right reserved.</p>
            {/* <div className='flex gap-2.5'>
                <a href="https://www.facebook.com/profile.php?id=100089800446175" target='_blank'><img className='bg-white rounded-full' width={38} src={assets.facebook_icon} alt="" /></a>
                <a href="#"><img className='bg-white rounded-full' width={38} src={assets.twitter_icon} alt="" /></a>
                <a href="https://www.instagram.com/amlan._.jyoti/" target='_blank'><img className='bg-white rounded-full' width={38} src={assets.instagram_icon} alt="" /></a>
            </div> */}
        </div>
    )
}

export default Footer
