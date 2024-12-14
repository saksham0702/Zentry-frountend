import React from 'react'
import { FaDiscord, FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa'
const links = [
  {href:"https://discord.com" , icon: <FaDiscord />},
  {href:"https://instagram.com" , icon: <FaInstagram />},
  {href:"https://twitter.com" , icon: <FaTwitter />},
  {href:"https://github.com" , icon: <FaGithub />},
]

const Footer = () => {
  return (
   <footer className='w-screen bg-violet-300 py-4 text-black'>
    <div className="container mx-auto flex flex-col items-center
    justify-between gap-4 md:flex-row">
     <p className='text-center text-sm md:text-left'>
      &copy; Nova 2024 , All rights reserved.
     </p>
     <div className="flex justify-center gap-4 md:justify-start">
       {links.map((link) =>(
        <a key={link} 
        target='_blank'
        rel='noopener noreferrer'
        className='cursor-pointer text-black transition duration-500 ease-in-out hover:text-white'>
          {link.icon}
        </a>
       ))}
     </div>
     <a href="#privact-policy"
     className='text-center text-sm hover:underline md:text-right capitalize'>
      privacy policy
     </a>
    </div>
   </footer>
  )
}

export default Footer
