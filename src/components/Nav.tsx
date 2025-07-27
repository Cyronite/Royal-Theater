import { NavLink } from "react-router-dom";
import {Theater, Calendar, Users, Phone, Menu } from 'lucide-react'
import { useState, useEffect } from 'react';
export default function Nav() {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
    const [active, setActive] = useState("Home");
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
        setIsDesktop(window.innerWidth >= 768);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <div className="fixed top-0 left-0 w-full bg-[#000000ee] z-50">
            <nav className="flex justify-between items-center h-16 text-white px-6 max-w-[1200px] mx-auto">
                <div id="left" className='flex items-center gap-2 '>
                    <Theater color='#E7B008' size={30}/>
                    <h1 className="text-xl font-bree font-bold text-[#4A0813] ">Royal Theater</h1>
                </div>
                {isDesktop ? 
                
                <div id="right">
                    <div className="flex gap-4 font-inter font-semibold items-center">
                        <NavLink onClick={()=>{setActive("Home")}} to="/" end className={` ${active=="Home" ? "text-[#E7B008] bg-[#251D18]":"hover:text-[#E7B008] hover:bg-[#171210] text-white"} flex gap-2 transition-colors duration-300 cursor-pointer p-2 rounded-md`}>
                            <Theater /> Home
                        </NavLink>

                        <NavLink onClick={()=>{setActive("Shows")}} to="/shows" className={` ${active=="Shows" ? "text-[#E7B008] bg-[#251D18]":"hover:text-[#E7B008] hover:bg-[#171210] text-white"} flex gap-2 transition-colors duration-300 cursor-pointer p-2 rounded-md`}>
                            <Calendar /> Shows
                        </NavLink>

                        <NavLink  onClick={()=>{setActive("About")}} to="/about" className={` ${active=="About" ? "text-[#E7B008] bg-[#251D18]":"hover:text-[#E7B008] hover:bg-[#171210] text-white"} flex gap-2 transition-colors duration-300 cursor-pointer p-2 rounded-md`}>
                            <Users /> About
                        </NavLink>

                        <NavLink onClick={()=>{setActive("Contact")}} to="/contact" className={` ${active=="Contact" ? "text-[#E7B008] bg-[#251D18]":"hover:text-[#E7B008] hover:bg-[#171210] text-white"} flex gap-2 transition-colors duration-300 cursor-pointer p-2 rounded-md`}>
                            <Phone /> Contact Us
                        </NavLink>

                        <NavLink onClick={() => { setActive("Log In") }} to="/login" className="bg-gradient-to-r from-[#4A0813] to-[#cd0022] text-white transition-all duration-300 transform hover:scale-105 hover:rotate-1 p-2 px-4 rounded-md font-semibold">
                            Log In
                        </NavLink>

                        <NavLink onClick={() => { setActive("Sign In") }} to="/signin" className={({ isActive }) =>
                            `transition-colors duration-300 p-2 px-4 rounded-md font-semibold border border-[#cd0022] ${
                            isActive ? "bg-[#cd0022] text-white" : "text-white  bg-transparent hover:bg-[#cd0022] hover:text-white"
                            }`
                        }>
                            Sign In
                        </NavLink>
                    </div>
                </div>
                :
                <div id="right">
                    <button className={`transition-transform duration-300 ease-out origin-center ${ menuOpen ? "rotate-90 scale-105" : ""}`}>
                        <Menu color='#E7B008' size={30} onClick={() => setMenuOpen(!menuOpen)} />
                    </button>
                    <div className={`absolute top-full left-0 w-full bg-[#0F0D0A] z-50 transition-all duration-300 ease-in-out transform ${
                            menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6 pointer-events-none"
                        }`}>
                            <div className="flex gap-2 flex-col font-inter font-semibold py-2">
                                <button onClick={() => { setActive("Home"); setMenuOpen(false); }} className={`rounded-2xl text-left px-4 mx-2 py-4 flex gap-2 items-center transition-colors duration-300 ${
                                    active === "Home" ? "text-[#E7B008] bg-[#251D18]" : "hover:text-[#E7B008] hover:bg-[#171210] text-white"
                                }`}>
                                    <Theater /> Home
                                </button>
                                <button onClick={() => { setActive("Shows"); setMenuOpen(false); }} className={`rounded-2xl text-left px-4 mx-2 py-4 flex gap-2 items-center transition-colors duration-300 ${
                                    active === "Shows" ? "text-[#E7B008] bg-[#251D18]" : "hover:text-[#E7B008] hover:bg-[#171210] text-white"
                                }`}>
                                    <Calendar /> Shows
                                </button>
                                <button onClick={() => { setActive("About"); setMenuOpen(false); }} className={`rounded-2xl text-left px-4 mx-2 py-4 flex gap-2 items-center transition-colors duration-300 ${
                                    active === "About" ? "text-[#E7B008] bg-[#251D18]" : "hover:text-[#E7B008] hover:bg-[#171210] text-white"
                                }`}>
                                    <Users /> About
                                </button>
                                <button onClick={() => { setActive("Contact"); setMenuOpen(false); }} className={`rounded-2xl text-left px-4 mx-2 py-4 flex gap-2 items-center transition-colors duration-300 ${
                                    active === "Contact" ? "text-[#E7B008] bg-[#251D18]" : "hover:text-[#E7B008] hover:bg-[#171210] text-white"
                                }`}>
                                    <Phone /> Contact Us
                                </button>
                                <button onClick={() => { setActive("Log In"); setMenuOpen(false); }} className=" rounded-2xl mx-2 px-6 py-4 bg-gradient-to-r from-[#4A0813] to-[#cd0022] text-white font-semibold">
                                    Log In
                                </button>
                                <button onClick={() => { setActive("Sign In"); setMenuOpen(false); }} className={` px-6 py-4 border-2 border-[#cd0022] rounded-2xl mx-2 ${
                                    active === "Sign In" ? "bg-[#cd0022] text-white" : "text-white  bg-transparent hover:bg-[#cd0022] hover:text-white"
                                }`}>
                                    Sign In
                                </button>
                            </div>
                        </div>

                </div>
                }
                
            </nav>
            </div>
        </>
    );
}

