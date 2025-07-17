import {Theater, Calendar, Users, Phone   } from 'lucide-react'
import { useState } from 'react';
export default function Nav() {
    
    const [active, setActive] = useState("Home");
    return (
        <>
            <div className='bg-black'>
                <nav className=" flex justify-between items-center h-16 bg-black text-white px-6 max-w-[1200px] mx-auto">
                <div id="left" className='flex items-center gap-2 '>
                    <Theater color='#E7B008' size={30}/>
                    <h1 className="text-xl font-bree font-bold text-[#4A0813] ">Movie Booking</h1>
                </div>
                <div id="right">
                    <ul className="flex gap-4 font-inter font-semibold items-center">
                        <button onClick={()=>{setActive("Home")}} className={` ${active=="Home" ? "text-[#E7B008] bg-[#251D18]":"hover:text-[#E7B008] hover:bg-[#171210] text-white"} flex gap-2 transition-colors duration-300 cursor-pointer p-2 rounded-md`}><Theater />Home</button>
                        <button onClick={()=>{setActive("Shows")}} className={` ${active=="Shows" ? "text-[#E7B008] bg-[#251D18]":"hover:text-[#E7B008] hover:bg-[#171210] text-white"} flex gap-2 transition-colors duration-300 cursor-pointer p-2 rounded-md`}><Calendar />Shows</button>
                        <button onClick={()=>{setActive("About")}} className={` ${active=="About" ? "text-[#E7B008] bg-[#251D18]":"hover:text-[#E7B008] hover:bg-[#171210] text-white"} flex gap-2 transition-colors duration-300 cursor-pointer p-2 rounded-md`}><Users />About</button>
                        <button onClick={()=>{setActive("Contact")}} className={` ${active=="Contact" ? "text-[#E7B008] bg-[#251D18]":"hover:text-[#E7B008] hover:bg-[#171210] text-white"} flex gap-2 transition-colors duration-300 cursor-pointer p-2 rounded-md`}><Phone />Contact Us</button>
                        <button onClick={() => { setActive("Log In") }} className={`bg-gradient-to-r from-[#4A0813] to-[#cd0022] text-white transition-all duration-300 transform hover:scale-105 hover:rotate-1 p-2 px-4 rounded-md font-semibold ${active == "Log In" ? "" : ""}`}>Log In </button>
                        <button onClick={() => { setActive("Sign In") }} className={`transition-colors duration-300 p-2 px-4 rounded-md font-semibold ${active == "Sign In" ? "bg-[#cd0022] text-white" : "text-white border border-[#cd0022] bg-transparent hover:bg-[#cd0022] hover:text-white"}`}> Sign In</button>
                    </ul>
                </div>
            </nav>
            </div>
        </>
    );
}

