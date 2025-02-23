import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { fetchDetails } from '../store/slice/userSlice';
import { logout } from '../store/slice/authSlice';
import { useNavigate } from 'react-router';
import { fetchPlan } from '../store/slice/planSlice';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router';
const Userlanding = () => {
  const [profileVisibility,setProfileVisibility]=useState(true);
  const [membershipVisibility,setMembershipVisibility]=useState(false);
  const [helpVisibility,setHelpVisibility]=useState(false);
  const [passwordVisibility,setPasswordVisibility]=useState(false);
  const dispatch=useDispatch();
  const {is_Loading,is_Error,plan_data}=useSelector((state)=>state.plan)
  useEffect(()=>{
    dispatch(fetchDetails());
     dispatch(fetchPlan())
  
    
  },[dispatch])
  const {isLoading,isError,data}=useSelector((state)=>state.user)
  const navigate=useNavigate()
  if (isLoading) {
    return <div>Loading...</div>; 
  }

  if (isError) {
    return <div>Error loading user details.</div>; 
  }

  if (!data) {
    return <div>No user data available.</div>; 
  }

  const handleVisibility=(val)=>{
    switch(val){
      case 1:
 setProfileVisibility(true);
 setHelpVisibility(false);
 setPasswordVisibility(false);
 setMembershipVisibility(false)
      
      break;
      case 2: 
      setProfileVisibility(false);
      setHelpVisibility(false);
      setPasswordVisibility(false);
      setMembershipVisibility(true)
           
      break;
      case 3:
        setProfileVisibility(false);
        setHelpVisibility(false);
        setPasswordVisibility(true);
        setMembershipVisibility(false)
             
      break;
      case 4:
        setProfileVisibility(false);
        setHelpVisibility(true);
        setPasswordVisibility(false);
        setMembershipVisibility(false)
             

    }
  }
  const handleSubscribe=async(index)=>{
    console.log(plan_data.plans[index]._id);
    
    const response=await fetch('http://localhost:4000/api/user/subscription',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
         'token':localStorage.getItem('token')
      },
      body:JSON.stringify({
        subscribed:true,
          subscription_id:plan_data.plans[index]._id
          
      })
    })
    if(response.ok){
      window.location.reload();
    }
    const val=await response.json();
    console.log(val);
    
    
    
  }
  return (
    <div className='w-full h-full bg-gradient-to-tr from-black to-gray-600 p-2 relative flex flex-col justify-center'>
      <p className='text-5xl font-bold text-green-500 absolute top-0'><Link to='/'>Gymmy</Link></p>
    
       
      <p className='text-green-500 text-3xl font-bold font-bigShoulder mt-5 absolute top-[5%] '>Welcome {data.user.firstname} 😄!!</p>
    <div className='w-full h-3/4 grid grid-cols-12 p-2 gap-3 '>
       <div className=' w-full h-full border-2 border-green-500 col-span-4 '>
        <ul className='w-full h-full flex flex-col justify-center items-center gap-3 text-xl md:text-2xl font-bold text-green-500 text-center break-all'>
          <li className='cursor-pointer hover:underline' onClick={()=>{handleVisibility(1)}} >Profile</li>
          <li onClick={()=>{handleVisibility(2)}} className='cursor-pointer hover:underline'>Membership & Details</li>
          <li onClick={()=>{handleVisibility(3)}} className='cursor-pointer hover:underline'>Change Password</li>
          <li onClick={()=>{handleVisibility(4)}} className='cursor-pointer hover:underline'>Help</li>
          <li className='cursor-pointer hover:underline' onClick={()=>{
            dispatch(logout());
            navigate('/')
          }}>Logout</li>
         
        </ul>
       </div>
       <div className='border-2 border-green-500 col-span-8'>
       {profileVisibility && <div className=' profile text-xl h-full text-green-500  break-words flex flex-col  pl-4 pt-5'>
          <p><strong>First Name :- </strong> {data.user.firstname} </p>
          <p><strong>Last Name :- </strong>{data.user.lastname}</p>
          <p><strong>Email :- </strong>{data.user.email}</p>
          <p><strong>Phone No :- </strong> {data.user.phone}</p>
          <p><strong>Subscribed :- </strong> {data.user.membership.length?"Yes":"No"}</p>
        </div>}
        {membershipVisibility && <div className=' membership text-xl h-full text-green-500 font-bold font-bigShoulder break-words flex flex-col justify-center items-start md:items-center pl-1'>
          {data.user.membership.length?<div>
            <p>Your Subscritption Plan</p>
            <p>Plan Type:-{data.user.membership[0].subscriptionplan.name}</p>
            <p>Start date :- {data.user.membership[0].startdate}</p>
            <p>End date :- {data.user.membership[0].enddate}</p>
          </div>:<div className='w-full'>
            <p className='text-center'>You haven't subscribed to any plan</p>
            <div className='w-full'>
              <p className='text-center underline'>Plans we offer (click on any below plan to subscribe)</p>
              {is_Loading ?<p>loading..</p>:<Carousel autoPlay={true} stopOnHover={true} infiniteLoop showIndicators={false} onClickItem={handleSubscribe} showThumbs={false} className='w-full mt-1'>
                {plan_data.plans.map((plan)=>{
                   return <div className='  bg-gradient-to-r from-black to-gray-900 rounded-lg' key={plan._id}
                  
                    >
                    <p> Plan Name :{plan.name}</p>
                    <p>Plan Duration: {plan.duration} days</p>
                    <p>Price: {plan.price}</p>
                   </div>
                })}
              </Carousel>}
              
            </div>
            </div>}
        </div> }
        {passwordVisibility && <div className=' change password text-xl h-full text-green-500 font-bold font-bigShoulder break-words flex flex-col justify-center items-start md:items-center pl-1'>
          
        </div> }
        {helpVisibility && <div className='w-full h-full'>
          <p>FAQ'S (Frequently asked questions) </p>
          <div className='w-full'>
           <div>
            <p>How do I sign in ? <span></span></p>
           </div>
          </div>
          
          </div>}
       </div>
       <div></div>
      </div>
    </div>
  )
}

export default Userlanding
