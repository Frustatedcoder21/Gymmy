import { useGSAP } from '@gsap/react';
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';

const Mainstore = () => {
  const bagRef = useRef(null); 
  const timelineRef = useRef(null); // Reference for the GSAP timeline

  useGSAP(() => {
    // Create the GSAP timeline
    timelineRef.current = gsap.timeline({ repeat: -1 });
    timelineRef.current
      .to('.bag', {
        rotate: '360deg',
        duration: 1,
      })
      .to('.bag', {
        translateY: '-40%',
        ease: 'power4.in',
      })
      .to('.bag', {
        translateY: '0%',
        duration: 1,
        ease: 'elastic.out',
      });
  }, []);

  // Define the hover event handler outside the useGSAP callback
  const handleEnter = () => {
    if (timelineRef.current) {
      timelineRef.current.pause(); // Pause the timeline on hover
    }
  };

  const handleLeave = () => {
    if (timelineRef.current) {
      timelineRef.current.resume(); // Resume the timeline on mouse leave
    }
  };

  return (
    <div className="w-full min-h-screen h-full flex justify-center items-center bg-store bg-cover relative">
      <p className="absolute z-30 top-[5%] text-5xl font-bold font-bigShoulder text-green-500">Store</p>
      <div className="w-full h-full bg-black absolute opacity-55"></div>
      <div
        className="hover:bg-slate-400 hover:scale-110 inline-block rounded-3xl p-2 absolute z-40"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <img src="bag.svg" className="bag w-[200px] h-[200px]" alt="Bag" />
        <p className="text-4xl text-center font-semibold text-green-500">
          <Link to="">Click to visit</Link>
        </p>
      </div>
    </div>
  );
};

export default Mainstore;
