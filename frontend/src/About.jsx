import { useGSAP } from '@gsap/react'
import React, { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger)
const About = () => {
const [value,setValue]=useState([])
useGSAP(()=>{
  const tl=gsap.timeline()
 
 tl.to('.val',{
     opacity:1,
    duration:2,
    //  repeat:-1,
    stagger:1,
     scrollTrigger:{
      trigger:'.val',
      // markers:true,
      start:'top 90%',
      end:'bottom 10%',
      scrub:1
     }
  })
   
},[value])
  useEffect(()=>{
    const para="Welcome to Gymmy – Redefine Your Fitness Journey!  At Gymmy, we go beyond building physical strength; we help you embark on a transformative journey toward a healthier, more confident, and balanced life. We believe that fitness is not just a goal but a lifestyle that empowers you to be the best version of yourself.Our world-class facility is designed to inspire and challenge you. Equipped with state-of-the-art machines, a wide array of fitness classes, and expert trainers, we’re here to guide and support you every step of the way. Whether you’re taking your first step into fitness or you’re an athlete pushing the limits, we offer a personalized approach tailored to your unique goals.What makes us stand out? Our dedication to holistic wellness. From dynamic weight training and high-energy cardio to rejuvenating yoga, Pilates, and specialized programs, we cater to every fitness level and interest. With flexible membership options and customized workout plans, we ensure your fitness experience is as convenient as it is effective.Step into a welcoming community where motivation thrives, and every milestone is celebrated.Let’s turn your aspirations into achievements.Join Gymmy today and take the first step toward a healthier, stronger, and more vibrant you.Your goals are our passion, and your success is our mission. Let’s make it happen together!"
     const arr=para.split(',');
     setValue(arr);
  },[])
  return (
    <div className='w-full min-h-screen md:h-full bg-main bg-left-bottom p-1'>
      <p className='text-5xl text-green-500 font-bold  text-center font-bigShoulder'>About</p>
    <div className='w-full h-full flex flex-col-reverse md:grid md:grid-cols-12   '>
      
      <div className='col-span-4 flex justify-center items-center'>
        <img src="gym.jpg" className=' w-[90%] min-w-[400px] h-[300px] rounded-lg' alt="" />
      </div>
      <div className='col-span-8 flex justify-center items-center'>
      <div className='p-3'>
      {value.map((p)=>{
       return <span className=' val opacity-0 text-xl font-semibold  text-green-600'>{p}</span>
      })}
      </div>
    </div>
    </div>
      
      
    </div>
  )
}

export default About
