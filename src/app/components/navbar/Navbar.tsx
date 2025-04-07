"use client"
import React,{useState} from 'react'
import Button from '../ui/button/button'
import { RiMenu3Fill } from "react-icons/ri";
import { IoClose, IoTrash } from 'react-icons/io5';


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='relative text-2xl flex items-center shadow-2xl rounded-2xl m-4 p-5 font-[family-name:var(--font-geist-sans)]'>
    {/* Logo */}
    <div className='text-3xl skew-[-6deg] font-black uppercase cursor-pointer transition-all duration-500 font-[family-name:var(--font-bungee)] '>
      <a href="/">
      Fiasco
      </a>
    </div>
  
    {/* Centered Nav */}
    <ul className='hidden md:flex absolute left-1/2 -translate-x-1/2  gap-5'>
      <li>
        <a href="#" className='hover:tracking-widest hover:font-black font-medium transition-all duration-500'>Teams</a>
      </li>
      <li>
        <a href="/Tournament" className='hover:tracking-widest hover:font-black font-medium transition-all duration-500'>Tournament</a>
      </li>
      <li>
        <a href="#" className='hover:tracking-widest hover:font-black font-medium transition-all duration-500'>Notifications</a>
      </li>
    </ul>
    {/* Right Nav */}
    <div className=' flex md:hidden gap-5 ml-auto transition-all duration-300 ease-in-out' onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? <IoClose className='cursor-pointer transform transition-transform duration-300 scale-100 opacity-100'/>:
      <RiMenu3Fill className='cursor-pointer transform transition-transform duration-300 scale-100 opacity-100' />
    }
          {isOpen && 
        <div className='absolute top-20 left-0 rounded-2xl shadow-2xl w-full h-fit bg-(--background)'>
        <ul className='flex flex-col md:hidden p-5 gap-5'>
      <li>
        <a href="#" className='hover:tracking-widest hover:font-black font-medium transition-all duration-500'>Teams</a>
      </li>
      <li>
        <a href="/Tournament" className='hover:tracking-widest hover:font-black font-medium transition-all duration-500'>Tournament</a>
      </li>
      <li>
        <a href="#" className='hover:tracking-widest hover:font-black font-medium transition-all duration-500'>Notifications</a>
      </li>
    </ul>
        </div>
          }
    </div>
  </div>  
  )
}

export default Navbar