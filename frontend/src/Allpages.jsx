import React from 'react'
import Navbar from './Navbar'
import Landing from './Landing'
import Services from './Services'
import About from './About'
import Contact from './Contact'
import Mainstore from './Mainstore'
const Allpages = () => {
  return (
    <div className='w-screen min-h-screen  md:h-screen'>
        <div className='w-full h-[10%] fixed top-0 z-50'>
        <Navbar />
        </div>
      
      <div className='w-full h-[90%] '>
        <div className='w-full h-full' name='home'>
            <Landing />
        </div>

        <div className='w-full h-full ' name='services'>
            <Services />
        </div>
        <div className='w-full h-full' name='store'>
        <Mainstore />
</div>
        <div className='w-full h-full mt-[4.6%]' name='about' >
          <About />
        </div>
        <div className='w-full h-full' name='contact'>
          <Contact />
        </div>
      </div>
    </div>
  )
}

export default Allpages
