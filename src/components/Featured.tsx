import { useEffect, useState } from "react";
import{Calendar,Clock, MapPin, Star} from 'lucide-react'
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
                    <div className='flex justify-center items-center'>
                        <div className="flex flex-wrap justify-center gap-6 max-w-[1400px] w-full">
                        {plays.map((play) =>(
              <div key={play.id} className="bg-[#181310] border-2 border-[#312621] rounded-2xl overflow-hidden relative flex flex-col hover:scale-[1.01] hover:shadow-[0_0_50px_#cd002245] hover:-translate-y-1 transition-all">
                <img
                  src={`data:image/jpeg;base64,${play.image}`}
                  alt={play.title}
                  className="w-full h-48 object-cover border-b-2 border-[#312621]"
                />
                <div className="absolute top-2 right-2 flex gap-1 items-center bg-[#E7B008] text-black px-2 py-1 rounded font-inter font-semibold">
                  <Star size={16} />
                  {play.rating}
                </div>
                <div className="p-6 flex flex-col gap-3 flex-grow">
                  <h3 className="text-white font-bree text-xl">{play.title}</h3>
                  <p className="text-gray-400 font-inter text-sm line-clamp-3">{play.description}</p>
                  <div className="text-gray-400 text-sm flex flex-col gap-2">
                    <div className="flex items-center gap-2"><Calendar size={16} />{new Date(play.show_date).toLocaleDateString()}</div>
                    <div className="flex items-center gap-2"><Clock size={16} />{formatTime(play.show_time)}</div>
                    <div className="flex items-center gap-2"><MapPin size={16} />Main Stage</div>
                  </div>
                </div>
                <div className="flex justify-between items-center px-6 py-4 border-t border-[#312621]">
                  <div className="flex items-center gap-2 text-sm font-inter text-white">
                    <div className={`w-3 h-3 rounded-full ${play.available ? 'bg-green-600' : 'bg-red-600'}`} />
                    {play.available ? 'Tickets Available' : 'Sold Out'}
                  </div>
                  <button
                    disabled={!play.available}
                    className={`text-sm px-4 py-1.5 rounded-md font-semibold transition-all ${
                      play.available
                        ? 'bg-gradient-to-r from-[#4A0813] to-[#cd0022] text-white hover:scale-105'
                        : 'border border-[#312621] text-white hover:bg-[#E7B008] hover:text-black'
                    }`}
                  >
                    {play.available ? 'Book Now' : 'Join Waitlist'}
                  </button>
                </div>
              </div>
            ))}
                        </div>
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