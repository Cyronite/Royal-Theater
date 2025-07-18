import { Calendar, Users, Star, Award  } from "lucide-react";
export default function stats(){

    return(
        <>
            <div className="w-full overflow-x-hidden">
            <div className="flex justify-evenly py-12 bg-[#251D18]">
                {([[Calendar, "25+", "Shows This Season"], [Users, "150K+", "Audience Members"], [Star, "4.8/5", "Average Rating"], [Award, "12", "Awards Won"]] as [React.ElementType, string, string][]).map(([Icon, number, text], index) => (
                   <div className="flex flex-col justify-center items-center">
                        <div className="bg-amber-400 p-3 rounded-sm mb-4">
                            <Icon size="40px"/>
                        </div>
                        <h4 className="text-white font-inter text-center text-xl font-semibold">{number}</h4>
                        <p className="font-inter text-gray-500 font-semibold text-center">{text}</p>
                   </div>
                ))} 
            </div>
            </div>
        </>
    );
}