import React from 'react'
import { assets } from '../assets/assets'

const Navbar = () => {
  return (
    <div className='flex px-12 py-3  items-center justify-between' >
        <div>
           <div className="text-3xl font-bold text-red-500">
            Tomato<span className="text-black">.</span>
           </div>
           <div className='font-semibold'> Admin Panel</div>
        </div>
         <img className='w-[4vw] rounded-full' src={assets.pfp} alt='profile'/>
    </div>
  )
}

export default Navbar