import { useEffect, useState } from "react";
import{Calendar,Clock, Divide, MapPin, Star} from 'lucide-react'
type Play = {
  id: number;
  title: string;
  image:string;
  description: string;
  show_date: string;
  show_time: string;
  price: number;
  rating: number;
  available: boolean;
};

export default function Featured(){
    const [plays, setPlays] = useState<Play[]>([]);

    useEffect(()=>{
        async function getFeatured(){
        console.log("tried to send req")
        try{
            const response = await fetch('http://localhost:5000/movies/featured');
            if (!response.ok){
                throw new Error(`Response ${response.status}`)
            }
            const json = await response.json();
            setPlays(json);
            console.log(json)
        } catch (error) {
            let message
            if (error instanceof Error) message = error.message
            else message = String(error)
        
            reportError({ message })
        }
    }
    getFeatured();
    },[])
    function formatTime(timeStr: string) {
        const [hours, minutes] = timeStr.split(":").map(Number);
        const ampm = hours >= 12 ? "PM" : "AM";
        const adjustedHour = hours % 12 || 12;
        return `${adjustedHour}:${minutes.toString().padStart(2, "0")} ${ampm}`;
    }
   
    return(
        <>
           <div className="bg-black">
                <div className="bg-black px-4 md:px-10 py-10 max-w-[1500px] w-full mx-auto">
                <div className="flex flex-col items-center gap-4 pb-5">
                    <h1 className="text-white font-bree text-center text-4xl font-semibold">Featured Productions</h1>
                    <h3 className="font-inter text-gray-500 font-semibold text-center text-xl max-w-[650px] ">Discover our upcoming shows and secure your seats for an unforgettable experience</h3>
                </div>
                <div>
                    <div className="flex flex-wrap justify-around gap-6 ">
                        {plays.map((play) =>(
                        <div key={play.id} className=" overflow-hidden group hover:scale-101 hover:-translate-y-[4px] transition-all duration-300 hover:shadow-[0_0_50px_#cd002245]  bg-[#181310] max-w-[400px] pb-7 flex flex-col gap-3 border-2 border-[#312621] rounded-2xl not-only-of-type:relative ">
                            <img
                                src={`data:image/jpeg;base64,${play.image}`}
                                alt={play.title}
                                className="w-full h-48 object-cover rounded-t-md border-b-2 border-[#312621] mb-3 group-hover:scale-103  transition-all duration-300"
                            />
                            <div className="flex font-inter gap-1 font-semibold  px-1.5 py-0.5 rounded bg-[#E7B008] text-black absolute top-2 right-2">
                                <Star />
                                {play.rating}
                            </div>
                            <div className="flex flex-col gap-2 px-7 pb-10">
                                <div className="text-white font-bree text-2xl">{play.title}</div>
                                <div className=" text-gray-500 font-inter text-lg">{play.description}</div>
                                <div className="flex flex-col gap-3">
                                    
                                    <div className="flex gap-2 text-gray-500 items-center text-sm"><Calendar size={20}/> {new Date(play.show_date).toLocaleDateString("en-US", {weekday: "short", year: "numeric", month: "short", day: "numeric"})}</div>
                                    <div className="flex gap-2 text-gray-500 items-center text-sm"><Clock size={20}/>{formatTime(play.show_time)}</div>
                                    <div className="flex gap-2 text-gray-500 items-center text-sm"><MapPin size={20}/>Main Stage</div>
                                </div>
                            </div>
                            <div>
                                <div className="absolute bottom-4 left-7">
                                     {play.available? 
                                     <div className="flex justify-between w-auto">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                                            <p className="font-inter text-white text-sm">Tickets Available</p>
                                        </div>
                                     </div>
                                    
                                     
                                     :
                                      <div className="flex items-center gap-2">
                                         <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                                         <p className="font-inter text-white text-sm">Sold Out</p>
                                    </div>}
                                    
                                </div>
                                
                               <div className="absolute bottom-4 right-7">
                                     {play.available? 
                                     <button className=" text-sm bg-gradient-to-r from-[#4A0813] to-[#cd0022] text-white transition-all duration-300 transform hover:scale-105 p-1.5 px-4 rounded-md font-semibold">Book Now</button>
                                     :
                                     <button className=" border-1 border-[#312621] hover:bg-[#E7B008] text-sm text-white hover:text-black transition-all duration-300 p-1.5 px-4 rounded-md font-semibold">Join Waitlist</button>
                                     }
                                    
                                </div>  
                            </div>
                        </div>
                    ))}
                    
                    </div>
                    <div className="flex justify-center items-center mt-14">
                        <button className=" border-1 border-[#312621] hover:bg-[#E7B008] text-lg text-white hover:text-black transition-all duration-300 p-3 px-5 rounded-md font-semibold">View All Shows</button>
                    </div>
                
                </div>
                
                </div>
                
           </div>
        </>
    );
}