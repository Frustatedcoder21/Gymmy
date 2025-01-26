import React from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)
const Services = () => {
  useGSAP(()=>{
    gsap.from('.box',{
      opacity:0,
      scale:0,
      duration:0.8,
      stagger:0.5,
      scrollTrigger:{
        trigger:'box',
        markers:true,
        start:'top 0%',
        end:'bottom 10%',
        scrub:1

      }

    })
  },[])
  return (
    <div className='w-full sm:min-h-full md:h-full mt-0 md:mt-[4.5%] flex flex-col items-center gap-2 md:grid md:grid-cols-3 md:grid-rows-3 p-5 bg-main bg-center relative'>
      <div className=' box md:col-start-2 md:col-end-3 text-5xl font-bold font-bigShoulder text-green-500 md:flex md:justify-center  '>Services</div>
      <div className='box md:w-full w-[300px] h-[200px] md:h-full bg-green-400 md:col-start-1 md:col-end-2 md:row-start-1 rounded-lg relative'>
        <img src="cardio.jpg" className='rounded-lg w-full h-full' alt="" />
        <div className='w-full h-full absolute top-0 bg-black opacity-55'></div>
        <p className='text-green-500 text-2xl absolute top-[45%] left-[40%]'>Cardio</p>
      </div>
      <div className=' box md:w-full w-[300px] h-[200px] md:h-full bg-green-400 md:row-start-3 md:row-end-4 rounded-lg relative'>
        <img src="weightlifting.jpg"  className='rounded-lg w-full h-full' alt="" />
        <div className='w-full h-full absolute top-0 bg-black opacity-55'></div>
        <p className='text-green-500 text-2xl absolute top-[45%] left-[30%] md:left-[40%]'>Weight Lifting</p>
      </div>
      <div className=' box md:w-full w-[300px] h-[200px] md:h-full bg-green-400 md:col-start-3 md:col-end-4 rounded-lg relative'>
        <img src="powerlifting.jpg" className='rounded-lg w-full h-full' alt="" />
        <div className='w-full h-full absolute top-0 bg-black opacity-55'></div>
        <p className='text-green-500 text-2xl absolute top-[45%] left-[30%] md:left-[40%]'>Power Lifting</p>
      </div>
      <div className=' box md:w-full w-[300px] h-[200px] md:h-full bg-green-400 md:row-start-3 md:row-end-4 md:col-start-3 md:col-end-4 rounded-lg relative'>
        <img src="zumba.jpg" className='rounded-lg w-full h-full' alt="" />
        <div className='w-full h-full absolute top-0 bg-black opacity-65'></div>
        <p className='text-green-500 text-2xl absolute top-[45%] left-[40%] md:left-[45%]'>Zumba</p>
      </div>
      <div className=' box md:w-full w-[300px] h-[200px] md:h-full bg-green-400 md:row-start-2 md:row-end-3 md:col-start-2 md:col-end-3 rounded-lg relative'>
        <img src="yoga.jpg" className='rounded-lg w-full h-full' alt="" />
        <div className='w-full h-full absolute top-0 bg-black opacity-65'></div>
        <p className='text-green-500 text-2xl absolute top-[45%] left-[40%] md:left-[45%]'>Yoga</p>
      </div>
    </div>
  )
}

export default Services
