import { useEffect } from "react";
export default function Featured(){
    useEffect(()=>{
        async function getFeatured(){
        console.log("tried to send req")
        try{
            const response = await fetch('http://localhost:5000/movies/featured');
            if (!response.ok){
                throw new Error(`Response ${response.status}`)
            }
            const json = await response.json();
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
   
    return(
        <>
           <div className="bg-black">
             <div className="flex flex-col items-center gap-4">
                <h1 className="text-white font-bree text-center text-4xl font-semibold">Featured Productions</h1>
                <h3 className="font-inter text-gray-500 font-semibold text-center text-xl max-w-[650px] ">Discover our upcoming shows and secure your seats for an unforgettable experience</h3>
            </div>
            <div>
                
            </div>
           </div>
        </>
    );
}