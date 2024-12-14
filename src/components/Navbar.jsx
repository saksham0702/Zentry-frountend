import React, { useEffect, useRef, useState } from 'react'
import Button from './Button'
import { TiLocationArrow } from 'react-icons/ti'
import { useWindowScroll } from 'react-use';

import gsap from 'gsap';

const navItems = [ 'Nexus' , 'Vault' , 'Prologue' ,
  'About' , 'Contact'];

const Navbar = () => {

  const [lastScrollY, setlastScrollY] = useState(0);
  const [isNavVIsible, setisNavVIsible] = useState(true);
  const [isAudioPLaying, setisAudioPLaying] = useState(false);
  const [isIndicatorActive ,setisIndicatorActive] = useState(false);
  const navContainerRef = useRef(null); 
  const audioElementRef = useRef(null);
  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {

    if(currentScrollY ===0 ){
      setisNavVIsible(true);
      navContainerRef.current.classList.remove('floating-nav');
    }
    else if (currentScrollY > lastScrollY) {
            setisNavVIsible(false);
            navContainerRef.current.classList.add('floating-nav')
          }
          else if (currentScrollY<lastScrollY){
            setisNavVIsible(true);
            navContainerRef.current.classList.add('floating-nav')
          }
   setlastScrollY(currentScrollY);
  } ,[currentScrollY ,setlastScrollY]);


  
  useEffect(()=>{
    gsap.to(navContainerRef.current , {
       y:  isNavVIsible ? 0 : -100,
       opacity : isNavVIsible ? 1 : 0,
       duration : 0.2
    })
  },[isNavVIsible]);



  const toggleAudioIndicator = () =>{
           setisAudioPLaying((prev)=> !prev);
           setisIndicatorActive((prev)=> !prev);
  }


  useEffect(()=>{
    if(isAudioPLaying) {
      audioElementRef.current.play();
    }
    else {
      audioElementRef.current.pause(); 
    }
  },[isAudioPLaying])



  return (
    <div ref={navContainerRef} className='fixed inset-x-0 top-4 z-50 h-16 border-none transition-all
      duration-700 sm:inset-x-6'>
      <header className='absolute top-1/2 w-full -translate-y-1/2'>
        <nav className="flex size-full items-center justify-between p-4">
          <div className='flex items-center gap-7'> 
             <img src="/img/logo.png" alt="logo" 
             className='w-10 '/>
             <Button
             id = "product-button"
             title ="Products"
             rightIcon = {<TiLocationArrow />} 
             containerClass = "bg-blue-50 md:flex flex hiddden items-center justify-center gap-1 "/>
          </div>
          <div className="flex h-full items-center">
            <div className="hidden md:block ">
           {navItems.map((item)=>(
               <a key={item} href={`#${item.toLowerCase()}`} className='nav-hover-btn'>
                {item}
               </a>
           ))}

            </div>
            <button className='ml-10 flex items-center space-x-0.5'
            onClick={toggleAudioIndicator}
            >
              <audio
              ref={audioElementRef}
              className='hidden'
              src="/audio/loop.mp3" loop ></audio>
                      {[1,2,3,4].map((bar)=>(
                       <div 
                       style={{animationDelay: `${bar *0.1}s`}}
                       key={bar}
                        className={`indicator-line ${isIndicatorActive ? 'active' : ''}`} />
                         
                      
                      )) }
            </button>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Navbar
