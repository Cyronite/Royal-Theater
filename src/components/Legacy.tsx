import curtins from "../assets/curtins.jpg"
export default function Legacy(){
    return(
    <div className="w-full h-[55vh]  overflow-hidden relative">
        
        <img
            src={curtins}
            className="w-full h-full object-cover"
            alt="Curtins"
        />
        <div className="absolute inset-0 bg-black/70 " />
        <div className="py-7 top-0 left-0 absolute w-full h-full flex flex-col gap-6 justify-center items-center z-10 max-md:px-3">
        <div>
          <h1 className="font-bree text-6xl max-md:text-5xl text-center text-white ">A Legacy of Excellence</h1>
        </div>
        <p className="font-inter text-center text-xl max-md:text-lg max-w-[800px] text-white">For over 100 years, Royal Theater has been the cultural heart of our city, presenting world-class productions and nurturing new talent. Our historic venue combines timeless elegance with state-of-the-art technology.</p>
        <button className=" text-xl max-md:text-sm bg-amber-400 text-black transition-all duration-300 transform hover:scale-105  hover:shadow-[0_0_20px_#000000] p-3 px-6 rounded-md font-semibold">Learn Our Story</button>
      </div>
    </div>     
    );
}