import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
const Store = () => {
  const [store,setStore]=useState(null)
  useEffect(()=>{
    const fetchData=async()=>{
      const response= await fetch('http://localhost:4000/api/user/store/items',{
        headers:{
         "token":localStorage.getItem('token')
        }
       })
       const val=await response.json();
       setStore(val)
       console.log(val);
       

    }
    fetchData()
   
  },[])
  return (
    <div className='w-full min-h-screen md:h-full relative bg-black text-white overflow-auto flex flex-col items-center'>
<Link to="/">    
  <img  src="home.svg" className='w-[40px] absolute right-2 top-2 hover:scale-90' alt="" />
</Link>
      <p className='text-5xl break-words text-center'>Store is Under Development</p>
       <img src="gear.svg" alt="" />
    </div>
  )
}

export default Store
