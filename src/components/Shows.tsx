import {Search} from 'lucide-react'
import { useState } from 'react';
import { Menu } from '@headlessui/react'
export default function Shows(){
    const [query, setQuery] = useState("")

    return(
        <div className="bg-[#0C0A09] flex justify-center flex-col items-center">
            <div className="mt-[64px] h-[30vh] bg-[#0C0A09] flex flex-col justify-center items-center max-w-[800px] mx-auto text-center px-4">
                <div className="flex flex-col gap-4">
                    <h1 className="font-bree text-white text-5xl">Current & Upcoming Shows</h1>
                    <p className="font-inter text-gray-400 text-2xl">Discover our season's lineup of exceptional performances, from Broadway classics to innovative new works</p>
                </div>
            </div>
            <div id='search bar' className=" w-[90vw] h-[100px] bg-[#181310] rounded-lg flex items-center justify-Around">
                <div className='relative'>
                    <input onChange={(e) => setQuery(e.target.value)} type="search" className="bg-[#0C0A09] rounded-md font-inter text-white h-[20px] py-5 pl-10 pr-5 w-[100%]"/>
                    <Search color='white'className='absolute top-2 left-2'/>
                </div>

                
                 <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="px-4 py-2 bg-gray-800 text-white rounded-md">
        Options
      </Menu.Button>
      <Menu.Items className="absolute mt-2 w-40 bg-white shadow-md rounded-md">
        <Menu.Item>
          {({ active }) => (
            <button className={`w-full px-4 py-2 text-left ${active ? 'bg-gray-100' : ''}`}>
              Edit
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button className={`w-full px-4 py-2 text-left ${active ? 'bg-gray-100' : ''}`}>
              Delete
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
            </div>
        </div>
           
    );
}