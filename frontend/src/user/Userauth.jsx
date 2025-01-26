import React, { useState }  from 'react'
import Userlogin from './Userlogin';
import Usersignup from './Usersignup';
import { Link } from 'react-router';
const Userauth = () => {
    const [loginVisibility,setLoginVisibily]=useState(true);
    const [signupVisibility,setSignupVisibility]=useState(false);
    const visibility=(value)=>{
     switch(value){
      case 1: setLoginVisibily(true);
              setSignupVisibility(false);
      break;
      case 2: setSignupVisibility(true);
              setLoginVisibily(false);
      break;
     }
    }
  return (
    <div className='w-full h-full flex  justify-center items-center text-green-500 p-1 bg-main bg-center relative'>
      <Link to="/" className='absolute right-1 top-1'><img className='w-[40px]' src="home.svg" alt="" /></Link>
        <div className='w-[400px] h-[500px]'>
        <div className='w-[400px] flex justify-around gap-2'>
    <p className='text-3xl font-bold hover:underline cursor-pointer' onClick={()=>{visibility(1)}}>Login</p>
    
    <p className='text-3xl font-bold hover:underline cursor-pointer'  onClick={()=>visibility(2)}>Signup</p>
    </div>
    <div className=''>
    {loginVisibility&&<Userlogin/>}
    {signupVisibility && <Usersignup/>}
    </div>
        </div>
    
    

  </div>
 
  )
}

export default Userauth
