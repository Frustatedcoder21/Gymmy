import React, { useEffect, useMemo, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { fetchAdminDetails } from '../store/slice/adminSlice'
const Adminlanding = () => {
  const [profile,setProfile]=useState(true);
  const [stat,setStat]=useState(false);
  const [member,setMember]=useState(false);
  const [phone,setPhone]=useState(false);
  const [subs,setSubs]=useState(false);
 const [userDetails,setUserDetails]=useState(null)
  const dispatch=useDispatch()
  useEffect(()=>{
    const member=async()=>{
      const response=await fetch('http://localhost:4000/api/admin/alluser',{
        headers:{
          token:localStorage.getItem('token')
        }
      });
      const val=await response.json();
      console.log(val);
      
      setUserDetails(val)
    
      
     }
     member();
    dispatch(fetchAdminDetails())
    
  },[])
  const memberInfo=useMemo(()=>{
   const totalMember=userDetails.users.length;
   if(users){
   const subscribedMember=userDetails.users.filter((user)=>{
    return user.membership.length>0
 }).length;
 const normalMember=totalMember-subscribedMember;
  return {
    totalMember,
    subscribedMember,
    normalMember
  }}
  },[userDetails])
  
  const data=useSelector((state)=>state.admin.adminDetails)
  const {is_loading,is_error}=useSelector((state)=>state.admin)

  const handleVisibility=(val)=>{
    console.log(val);
    
    switch(val){
      case 1:
        setProfile(true);
        setStat(false);
        setMember(false);
        setSubs(false)
        break;
        case 2:
          setProfile(false);
        setStat(true);
        setMember(false);
        setSubs(false)
          break;
          case 3:
            setProfile(false);
        setStat(false);
        setMember(true);
        setSubs(false)
            break;
            case 4:
              setProfile(false);
        setStat(false);
        setMember(false);
        setSubs(true)
              break;
    }
  }
  if(is_loading){
    return <div>Loading..</div>
  }

  
  
  return (
    <div className='w-full min-h-screen md:h-full p-3  bg-gray-900 text-green-500'>
      <p className='text-center text-3xl'>Welcome back Admin !!</p>
     {data? <div className='w-full h-full grid grid-cols-12 items-center gap-3 '>
      <div className='col-span-4 min-h-[50vh]  md:h-1/2 border-2 border-black'>
        <ul className='h-full flex flex-col justify-center items-center gap-3 text-xl text-center md:text-2xl break-all'>
          <li onClick={()=>{
            handleVisibility(1)
          }}>Profile</li>
          <li onClick={()=>{
            handleVisibility(2)
          }}>Statistics</li>
          <li onClick={()=>{
            handleVisibility(3)
          }}>Member Management</li>
          <li onClick={()=>{
            handleVisibility(4)
          }}>Subscription Plan Management</li>
          <li>Logout</li>
        </ul>

      </div>
      <div className='col-span-8 min-h-[85vh] md:h-3/4 border-2 border-black '>

        {profile &&      <div className='profile w-full h-full '>
     <p>First Name:-{data.admin.firstname}</p>
     <p>Last Name:-{data.admin.lastname}</p>
     <p>Phone No:-{data.admin.phone}</p>
     <p>Email:-{data.admin.email}</p>
     </div>}
     {stat &&  userDetails? <div className='stats w-full h-full '>
        <div>Total Number of Users <span className='w-[20px] h-[20px] bg-red-600 text-red-600'>kk</span> :- {userDetails.users.length}</div>
        <div>Subscribed User <span className='w-[20px] h-[20px] bg-blue-600 text-blue-600'>kk</span> :- {console.log(memberInfo)
        }</div>
        <div className='w-[300px] h-[300px] rounded-[50%] border-white border-2 flex justify-center items-center'>
         <div className='w-[70%] h-[70%] rounded-[50%] border-white border-2'></div>
        </div>
      
      </div> :<div>Loading</div>}
      </div>
      </div>:<div>loading</div>}
    </div>
  )
}

export default Adminlanding
