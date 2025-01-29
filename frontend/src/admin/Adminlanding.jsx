import React, { useEffect, useMemo, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { fetchAdminDetails } from '../store/slice/adminSlice'
import {logout} from '../store/slice/authSlice'
import { useNavigate } from 'react-router'
import { fetchPlan } from '../store/slice/planSlice'
const Adminlanding = () => {
  const [profile,setProfile]=useState(true);
  const [stat,setStat]=useState(false);
  const [member,setMember]=useState(false);
  const [phone,setPhone]=useState(false);
  const [subs,setSubs]=useState(false);
 const [userDetails,setUserDetails]=useState(null)
 const [planName,setPlanName]=useState("");
 const [planPrice,setPlanPrice]=useState("");
 const [planDuration,setPlanDuration]=useState("")
 const navigate=useNavigate()
  const dispatch=useDispatch()
  const {is_Loading,plan_data}=useSelector((state)=>state.plan)
  console.log(plan_data);
  
  useEffect(()=>{
    dispatch(fetchAdminDetails())
    dispatch(fetchPlan())
    const allUserDetails=async()=>{
      const response=await fetch('http://localhost:4000/api/admin/alluser',{
        headers:{
          token:localStorage.getItem('token')
        }
      });
      const val=await response.json();
      
      setUserDetails(val)
    
      
     }
     allUserDetails();
    
  },[])
  
   
const deleteUser=async(id)=>{
const response=await fetch(`http://localhost:4000/api/admin/user/${id}`,{
  method:'DELETE',
  headers:{
    'Content-Type':'application/json',
    token:localStorage.getItem('token')
  }
})
if(response.ok){
  window.location.reload()
}

}
  
  const data=useSelector((state)=>state.admin.adminDetails)
  const {is_loading,is_error}=useSelector((state)=>state.admin)

  const handleVisibility=(val)=>{
    
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
  const handleDelete=async(e,id)=>{
    e.preventDefault();
     console.log(id);
     
    const response=await fetch(`http://localhost:4000/api/admin/plan/${id}`,{
      method:'DELETE',
      headers:{
        "Content-Type":"application/json",
        "token":localStorage.getItem('token')
      }
    })
    const data=await response.json();
    console.log(data);
    
    // if(response.ok){
    //   window.location.reload();
    // }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    

    if (!planName || !planDuration || !planPrice) {
        console.error("Missing required fields!");
        return;
    }

    try {
        const response = await fetch('http://localhost:4000/api/admin/createplan', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token')
            },
            body: JSON.stringify({
                name: planName,
                duration: planDuration,
                price: planPrice
            })
        });


        const val = await response.json();

        if (response.ok) {
            window.location.reload();
        } 
    } catch (error) {
        console.error("Error in handleSubmit:", error);
    }
};

  if(is_loading){
    return <div>Loading..</div>
  }

  
  
  return (
    <div className='w-full min-h-screen md:h-full p-3  bg-gray-900 text-green-500'>
      <p className='text-center text-3xl font-semibold'>Welcome Back Admin 😃 !!</p>
      <div className='w-full h-full grid grid-cols-12 items-center gap-3 '>
      <div className='col-span-4 min-h-[50vh]  md:h-1/2   rounded-lg bg-gradient-to-r from-black to-gray-900'>
        <ul className='h-full flex flex-col justify-center items-center gap-3 text-xl text-center md:text-2xl break-all'>
          <li className='cursor-pointer hover:underline' onClick={()=>{
            handleVisibility(1)
          }}>Profile</li>
          <li  className='cursor-pointer hover:underline' onClick={()=>{
            handleVisibility(2)
          }}>Statistics</li>
          <li className='cursor-pointer hover:underline' onClick={()=>{
            handleVisibility(3)
          }}>Member Management</li>
          <li className='cursor-pointer hover:underline' onClick={()=>{
            handleVisibility(4)
          }}>Subscription Plan Management</li>
          <li className='cursor-pointer hover:underline' onClick={()=>{
            dispatch(logout());
            navigate('/')
          }}>Logout</li>
        </ul>

      </div>
      <div className='col-span-8 min-h-[85vh] md:h-3/4 border-2 border-black rounded-lg bg-gradient-to-r from-black to-gray-900 '>

        {profile &&   
          <div className='profile w-full h-full text-2xl p-2 '>
          {is_loading?<div>loading..</div>:data?<div>
            <p><strong>First Name:-</strong>{data.admin.firstname}</p>
     <p><strong>Last Name:-</strong>{data.admin.lastname}</p>
     <p><strong>Phone Number:-</strong>{data.admin.phone}</p>
     <p><strong>Email:-</strong>{data.admin.email}</p>
     </div>:<div>loading..</div>}
          </div>
           }
        
     
     
     { stat && <div className='stat w-full h-full'>
       {userDetails?<div className='w-full h-full p-3 text-center flex items-center flex-wrap'>
        <div>
         <p className='w-[150px] h-[90px] border-2 border-black bg-green-500 rounded-lg flex text-black justify-center items-center m-5'>Total Users :-{userDetails.users.length}</p>
         <p className='w-[150px] h-[90px] border-2 bg-yellow-400 border-black rounded-lg flex  text-black justify-center items-center m-5'>Total Subscribed Users <span className='w-[10px] h-[10px] rounded-[50%] bg-green-500 '></span> :-{userDetails.users.filter((user)=>user.membership.length>0).length}</p>
         <p className='w-[150px] h-[90px] border-2 bg-yellow-400 border-black rounded-lg flex  text-black justify-center items-center m-5'>Total Non-Subscribed Users  <span className='w-[10px] h-[10px] rounded-[50%] bg-red-500 '></span>:-{userDetails.users.length-userDetails.users.filter((user)=>user.membership.length>0).length} </p>
         </div>
         <div 
  className=" w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full border-2 flex justify-center items-center" 
  style={{
    backgroundImage: `conic-gradient(
      green ${((userDetails.users.filter(user => user.membership.length > 0).length) / userDetails.users.length) * 100}%,
      red 0
    )`
  }}
>
          
          <div className='w-[60%] h-[60%]  rounded-full border-2 bg-black'>
        
          </div>
         </div>
  
       </div>:<div>loading</div>}
      
      </div>}
    
      {member && (
  <div className="member w-full h-full overflow-auto">
    {userDetails?.users?.length > 0 ? (
      userDetails.users.map((user) => (
        <div className="w-full text-white border-b border-gray-700 p-2" key={user._id}>
          {/* User Details */}
          <p>
            <strong>Name:</strong> {user.firstname} {user.lastname}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          {/* Membership Details */}
          {user.membership.length > 0 ? (
            <div>
            <div>
              <p>
                <strong>Plan Name:</strong> {user.membership[0]?.subscriptionplan?.name || 'N/A'}
              </p>
              <p>
                <strong>Start Date:</strong> {user.membership[0]?.startdate || 'N/A'}
              </p>
              <p>
                <strong>End Date:</strong> {user.membership[0]?.enddate || 'N/A'}
              </p>
              <p>
                <strong>Price:</strong> ₹{user.membership[0]?.subscriptionplan?.price || 'N/A'}
              </p>
              
            </div>
            
            </div>
          ) : (
            <p className="text-red-500">Non-Subscribed</p>
          )}
          <p className='hover:underline cursor-pointer text-red-500 ' onClick={()=>{
            deleteUser(user._id)
          }}>delete</p>
        </div>
      ))
    ) : (
      <div>Loading...</div>
    )}
  </div>
)}
{subs && <div className='w-full h-full  overflow-y-scroll '>
    <div className='w-full flex flex-col items-center  p-2 border-b-2 border-gray-400'> 
      <p className='text-3xl font-semibold'>Create Plan</p>
      <form action="" onSubmit={(e)=>{
        handleSubmit(e)
      }} className='w-3/4 flex flex-col gap-1 items-center'>
        <input type="text" value={planName} placeholder='enter plan name' name="name" className='pl-2 md:w-[400px] h-[40px] rounded-lg outline-none' onChange={(e)=>setPlanName(e.target.value)} />
        <input type="text" value={planPrice} placeholder='enter plan price' name='price' className='pl-2 md:w-[400px] h-[40px] rounded-lg outline-none'  onChange={(e)=>setPlanPrice(e.target.value)} />
        <input type="text" value={planDuration} placeholder='enter plan duration' name='duration' className='pl-2 md:w-[400px] h-[40px] rounded-lg outline-none' onChange={(e)=>setPlanDuration(e.target.value)} />

        <button type='submit' className='rounded-lg bg-green-500 px-1 py-1 w-[100px] h-[40px] text-black '>Add</button>
      </form>
      </div>
      <div className='w-full '>
      {is_Loading?<div>loading..</div>:
      plan_data?plan_data.plans.map((plan)=>{
        return <div className='w-full border-b-2 pl-5 py-2' key={plan._id}>
          <p><strong>Plan Name :-</strong> {plan.name}</p>
          <p><strong>Plan Duration :-</strong> {plan.duration}</p>
          <p><strong>Plan Price :-</strong> {plan.price}</p>
          <button className='text-red-500 hover:underline' onClick={(e)=>{
            handleDelete(e,plan._id)
          }}>delete</button>
        </div>
      }):<div>No plans available</div>}
      </div>
  </div>
}

      </div>
      </div>
    </div>
  )
}

export default Adminlanding
