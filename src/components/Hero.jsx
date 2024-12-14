import React, { useState,useRef ,useEffect} from 'react'
import Button from './Button';
import { TiLocationArrow } from 'react-icons/ti';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';


gsap.registerPlugin(ScrollTrigger);

const Hero = () => {

  const [currentIndex, setcurrentIndex] = useState(1);
  const [hasClicked, sethasClicked] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [loadedVideos, setloadedVideos] = useState(0)
  const totalVideos = 4;
  const nextVideoRef = useRef(null);

  const handelVideoLoad = () => {

    setloadedVideos((prev) => prev + 1 );
  
  }
   
  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;
  const upcommingVideoIndex = (currentIndex % totalVideos ) + 1 ;

  const handelMiniVdClick = () =>{

    sethasClicked(true);
    setcurrentIndex(upcommingVideoIndex)
  }

  useEffect(()=>{
    if(loadedVideos=== totalVideos-1)
    {
      setisLoading(false);
    }
  } ,[loadedVideos])
 useGSAP(() =>{

  if(hasClicked){
   gsap.set('#next-video', { visibility : 'visible'});
   
   gsap.to('#next-video' , {
        transformOrigin : 'center center',
        scale: 1,
        width: '100%',
        height: '100%',
        duration: 1,
        ease: 'power1.inOut',
        onStart: () => nextVideoRef.current.play(),
   })

  }

 },{ dependencies:[currentIndex] , revertOnUpdate: true}
)
useGSAP(()=>{
  gsap.set('#video-frame' , {
    clipPath: 'polygon(14% 0% , 72% 0% , 90% 90%, 0% 100%)',
    borderRadius: '0 0 40% 10%'

  })
  gsap.from('#video-frame' , {
    clipPath: 'polygon(0% 0% , 100% 0% , 100% 100%, 0% 100%)',
    borderRadius: ' 0 0 0 0',
    ease: 'power1.inOut',
    scrollTrigger: {
      trigger: '#video-frame',
      start: 'center center',
      end: 'bottom center',
      scrub: true,
  }
  })

}
)

  return (
    
    <div className='relative h-dvh  w-screen overflow-x-hidden'>
      {isLoading && (
        <div className='flex-center absolute z-[100] h-dvh
        w-screen overflow-hidden bg-violet-50 '>
        <div className="three-body">
          <div className="three-body__dot"></div>
          <div className="three-body__dot"></div>
          <div className="three-body__dot"></div>
        </div>
        </div>
      )}
      <div id='video-frame' className='relative z-10 h-dvh w-screen overflow-hidden
      rounded-lg bg-blue-75'>

        <div >

          <div className="max-clip-path absolute-center z-50 size-64 
          cursor-pointer overflow-hidden rounded-lg">
              
              <div onClick={handelMiniVdClick} className='origin-center
               scale-50 opacity-0 transition-all duration-500 ease-in
               hover:scale-100 hover:opacity-100 '>
                <p className='absolute text-violet-300 top-1/2 left-1/2 z-50
                 bg-yellow-300 p-1 
                rounded-full text-xs font-semibold 
                '> 
                  click
                </p>
                <video
                ref={nextVideoRef}
                src={getVideoSrc(upcommingVideoIndex)}
                loop
                muted
                id='current-video'
                className='size-64 origin-center scale-150 object-cover object-center'
                onLoadedData={handelVideoLoad}
                />
              </div>
          </div>
          <video 
          ref={nextVideoRef}
          src={getVideoSrc(currentIndex)}
          loop
          muted  
          id='next-video'   
          className=' absolute-center invisible absolute z-20 size-64
          object-cover object-center' 
          onLoadedData={handelVideoLoad}
          />
             <video
             src={getVideoSrc (currentIndex === totalVideos-1 ? 1 : currentIndex)} 
             autoPlay
             loop
             muted
             className='absolute left-0 top-0 size-full object-cover object-center'
             onLoadedData={handelVideoLoad}
             />

        </div>
        <h1 className='special-font hero-heading absolute
        bottom-5 right-5 z-40 text-blue-75'>
          G<b>a</b>ming
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">

          <div className='mt-24 px-5 sm:px-10'>
            <h1 className='special-font hero-heading text-blue-100'>
              redify<b>n</b>e
            </h1>
            <p className="mb-5 max-w-64 font-robert-regular
            text-blue-100">
                 Metagame layer <br /> Unleash the Play Economy
            </p>
            <Button id ="watch-trailer" title ="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              containerClass = "!bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>

      </div>
      <h1 className='special-font hero-heading absolute
        bottom-5 right-5  text-black'>
          G<b>a</b>ming
        </h1>

    </div>
  )
}

export default Hero
