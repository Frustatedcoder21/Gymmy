import React, { useState } from 'react'
import { Link } from 'react-scroll'
// import { Link } from 'react-router'
const Navbar = () => {
  const [menuVisiblity,setMenuVisibility]=useState(false)
  return (
    <div className=' navbar w-full  h-full pt-4 bg-black flex flex-col gap-0 relative' >
      <div className='w-full h-full   p-3  flex justify-between items-end absolute top-0'>
      <div className=' h-full absolute top-0 '>
        <p className='text-5xl text-green-500 font-bigShoulder font-bold '>Gymmy</p>
      </div>
      <ul className=' w-full flex gap-4 text-green-500 text-2xl justify-center items-end   self-end relative font-bigShoulder'>
        <li className='hidden md:block cursor-pointer'><Link to="home" smooth={true} duration={800} offset={-100}>Home</Link></li>
        <li className='hidden md:block cursor-pointer'><Link to="services" smooth={true} duration={800} offset={-75}>Service</Link></li>
        <li className='hidden md:block cursor-pointer'><Link to="store" smooth={true} duration={800} offset={-75}>Store</Link></li>
        <li className='hidden md:block cursor-pointer'><Link to="about" smooth={true} duration={800} offset={-75}>About</Link></li>
        <li className='hidden md:block cursor-pointer'><Link to="contact" smooth={true} duration={800} offset={100}>Contact</Link></li>
        <li className='sm:inline md:hidden absolute right-0 bottom-1 mr-1'>  <img  src={menuVisiblity?"cross.svg":"menu.svg"} onClick={()=>{
          setMenuVisibility((prev)=>!prev)
        }} onMouseOut={()=>{
          setMenuVisibility(false)
        }} className='w-[25px] self-end absolute left-2 z-30' alt="" /></li>
      </ul>
      <div className='self-center ml-4'>
        <a href="/user-type"><img src="profile.svg" className='w-[30px]' alt="" /></a>
      </div>
      </div>
      <div className=' mobile-menu w-full p-5'>
        {menuVisiblity&& <ul className='sm:block md:hidden w-full flex flex-col items-center absolute z-30 bg-black text-green-500'>
        <Link to="home" smooth={true} duration={800} offset={-100} onClick={()=>{
          alert('hi')
        }}>Home</Link>
        <Link to="home" smooth={true} duration={800} offset={-100} onClick={()=>{
          alert('hi')
        }}>Service</Link>
        <li ><Link to="contact" smooth={true} duration={800} offset={100}>About</Link></li>
        <li ><Link to="contact" smooth={true} duration={800} offset={-100}>Contact</Link></li>
       
      </ul>}
      </div>
      
    </div>
  )
}

export default Navbar
