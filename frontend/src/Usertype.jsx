import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router'
const Usertype = () => {
  const val=useSelector((state)=>state.auth)
  return (
    <div className='w-full h-full flex justify-center items-center gap-5 bg-main bg-right relative '>
        <Link to="/">        <img src="home.svg" className='w-[40px] absolute right-1 top-1' alt="" />
        </Link>
      <div className='admin bg-gray-500 rounded-lg px-4 py-2 duration-500 hover:bg-gray-400 hover:scale-110 cursor-pointer'>
        <Link to={val.isLoggedIn && val.type=="admin"?"/admin/landing":"/admin/login"}><img src="admin.svg" className='w-[100px] h-[150px]' alt="" /></Link>
        
        <p className='text-center'>Admin</p>
      </div>
      <div className='user bg-gray-500 rounded-lg px-4 py-2 duration-500 hover:bg-gray-400 hover:scale-110 cursor-pointer' >
   <Link to={val.isLoggedIn && val.type=="user"?"/user/landing":"/user/login"}><img src="user.svg" className='w-[100px] h-[150px]' alt="" /></Link> 
    <p className='text-center'>User</p>
      </div>
    </div>
  )
}

export default Usertype
