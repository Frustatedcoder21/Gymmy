import React, { useEffect, useState } from 'react'
import {login,logout} from '../store/slice/authSlice'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
const Adminlogin = () => {
  // const [passwordVisibility,setPasswordVisibility]=useState(false)
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [error,setError]=useState(false);
    const [data,setData]=useState(false);
     const [disable,setDisable]=useState(false)
     const dispatch=useDispatch()
     const navigate=useNavigate()
      const handleSubmit=async(e)=>{
        console.log('ok');
        
        e.preventDefault();
        setError(false);
        setData(false)
        const response=await fetch('http://localhost:4000/api/admin/login',{
          method:'post',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            email,
            password
          })
        })
        
        console.log(response);
        
        if(!response.ok){
          console.log('error');
          
          setError(true);
          setData(false)
          
        }else{
          setError(false)
          const val=await response.json();
          console.log(val);
          
          setData(true)
          localStorage.setItem('token',val.token)
          localStorage.setItem('type',"admin")
          dispatch(login({token:val.token,type:"admin"}))
          navigate('/admin/landing')

        }
      
      }
    
  
  return (
    <div className='login w-[400px] h-[600px] bg-gradient-to-r from-gray-900 to-gray-600 rounded-lg '>
        
    <form action="" onSubmit={(e)=>{
      setDisable(true);
      handleSubmit(e)}}
       className='w-full h-full flex flex-col justify-center items-center gap-4'>
      <input type="email" name='email' className=' w-[90%] h-[50px] pl-2 rounded-lg  ' value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder='Email' />
      <input type="password" name='password' className=' w-[90%] h-[50px] pl-2 rounded-lg    ' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password' />
      <input type="submit" disabled={disable}  className='w-[100px] py-2 px-3 rounded-lg  text-black  bg-green-500 hover:bg-white' />
    </form>
      {error&&<div className='text-red-600'>something went wrong</div>}
      {data&&<div className='text-green-600'>logged in successfully</div>}
    </div>
  )
}

export default Adminlogin



