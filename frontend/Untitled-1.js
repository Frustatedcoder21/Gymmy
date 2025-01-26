import { useGSAP } from '@gsap/react'
import React, { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const [para,setPara]=useState([])
    useGSAP(()=>{
    // gsap.from('.card',{
    //     rotateX:'90 deg',
    //     duration:'3',
        
    //     scrollTrigger:{
    //         trigger:'.card',
    //         start:'top 40%',
    //         end:'bottom 10%',
    //         // markers:'true',
    //         scrub:0.5
            

    //     }

    // })
    gsap.to('.para',{
      // scale:1,
      color:'green',
      duration:'2',
      stagger:0.4,
      scrollTrigger:{
        trigger:'.para',
        // markers:'true',
        start:'top 20%',
        end:'bottom 40%',
        scrub:1
      }
    })
    },[para])
    useEffect(()=>{
      const para="Our gym offers a diverse range of fitness services designed to cater to all levels of fitness enthusiasts. For those looking to build strength and enhance endurance, we provide specialized weightlifting and powerlifting programs, equipped with state-of-the-art facilities and expert trainers to guide you. If you prefer a holistic approach to health, our yoga classes focus on flexibility, mindfulness, and overall well-being, while our high-energy Zumba sessions combine fitness with fun, offering a dynamic way to burn calories and boost cardiovascular health. Whether your goal is to lift heavy, find inner peace, or dance your way to fitness, our gym has something for everyone."
      const arr=para.split('');
      setPara(arr)

    },[])
  return (
    <div className='w-full h-full bg-main bg-center overflow-y-hidden  flex flex-col justify-start items-center gap-3 '>
      <div className='w-full h-full opacity-50  '></div>
      <p className='text-5xl text-green-500'>Services</p>
      <div className='w-[80%] h-1/2'>
      <p>
            {para.map((l)=>{
                return <span className='para text-xl m-1 rotate text-white'>{l}</span>
            })}
        </p>
      </div>
      <div className='w-1/2 min-w-[400px] h-1/2 flex justify-center'>
       <Carousel className='w-[400px] h-[280px] pb-1  ' autoPlay infiniteLoop showThumbs={false} >
         <div className='w-full h-full flex justify-center items-center rounded-lg bg-green-500 relative'>
          <div className='w-full h-full bg-black opacity-50 absolute text-green-600 flex justify-center items-center text-xl font-bold'>Power Lifting</div>
          <img src="powerlifting.jpg" className='w-full h-full rounded-lg' alt="" />
         </div>
         <div className=' w-full h-full flex justify-center items-center rounded-lg bg-green-500 relative'>
         <div className='w-full h-full bg-black opacity-50 absolute text-green-600 flex justify-center items-center text-xl font-bold'>Weight Lifting</div>

          <img src="weightlifting.jpg" className='w-full h-full rounded-lg' alt="" />
         </div>
         <div className='w-full h-full flex justify-center items-center rounded-lg bg-green-500 relative'>
         <div className='w-full h-full bg-black opacity-50 absolute text-green-600 flex justify-center items-center text-xl font-bold'>Yoga</div>

          <img src="yoga.jpg" className='w-full h-full rounded-lg' alt="" />
         </div>
         <div className='w-full h-full  flex justify-center items-center rounded-lg bg-green-500 relative'>
         <div className='w-full h-full bg-black opacity-50 absolute text-green-600 flex justify-center items-center text-xl font-bold'>Zumba</div>

          <img src="zumba.jpg" className='w-full h-full rounded-lg' alt="" />
         </div>
      
       </Carousel>
      </div>
      
    </div>
  )
}

export default Services
