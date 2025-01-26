import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
const Carouselp = () => {
  return (
    <div className=''>
     <Carousel autoPlay showThumbs={false} infiniteLoop className='w-[500px] h-[400px]'  >
        <div className=' '>
           <div className='w-full h-full justify-center items-center relative'>
            <img src="powerlifting.jpg" className='w-full h-full' alt="" />
             <div className='absolute top-0 w-full h-full bg-black opacity-50 flex justify-center items-center'> <p className='text-green-400 text-4xl absolute z-30'>Power lifting</p></div>
           </div>
        </div>
        <div className=' '>
           <div className='w-full h-full justify-center items-center relative'>
            <img src="weightlifting.jpg" className='w-full h-full' alt="" />
             <div className='absolute top-0 w-full h-full bg-black opacity-50 flex justify-center items-center'> <p className='text-green-400 text-4xl absolute z-30'>Weight lifting</p></div>
           </div>
        </div>
        <div className=' '>
           <div className='w-full h-full justify-center items-center relative'>
            <img src="functional.jpg" className='w-full h-full' alt="" />
             <div className='absolute top-0 w-full h-full bg-black opacity-50 flex justify-center items-center'> <p className='text-green-400 text-4xl absolute z-30'>Functional training</p></div>
           </div>
        </div>
        <div className=' '>
           <div className='w-full h-full justify-center items-center relative'>
            <img src="yoga.jpg" className='w-full h-full' alt="" />
             <div className='absolute top-0 w-full h-full bg-black opacity-50 flex justify-center items-center'> <p className='text-green-400 text-4xl absolute z-30'>Yoga</p></div>
           </div>
        </div>
        <div className=' '>
           <div className='w-full h-full justify-center items-center relative'>
            <img src="zumba.jpg" className='w-full h-full' alt="" />
             <div className='absolute top-0 w-full h-full bg-black opacity-50 flex justify-center items-center'> <p className='text-green-400 text-4xl absolute z-30'>Zumba</p></div>
           </div>
        </div>
       
     </Carousel>
      
    </div>
  )
}

export default Carouselp
