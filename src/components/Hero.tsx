import hero from "../assets/hero_background.jpg";

export default function Hero() {
  return (
    <div className="w-full h-screen relative z-0">
      <img
        src={hero}
        alt="hero"
        className=" w-full h-full object-cover absolute z-0 top-0 left-0"
      />
      <div className="top-0 left-0 absolute w-full h-full flex flex-col gap-6 justify-center items-center z-10 max-md:px-3">
        <div>
          <h1 className="font-bree text-6xl max-md:text-5xl text-center text-white ">Where Stories</h1>
          <h1 className="font-bree text-6xl max-md:text-5xl text-center text-[#E7B008]">Come to Life</h1>
        </div>
        <p className="font-inter text-center text-xl max-md:text-lg max-w-[600px] text-white">Experience the magic of live theater in our historic venue. From timeless classics to groundbreaking new works.</p>
        <button className=" text-xl max-md:text-sm bg-gradient-to-r from-[#4A0813] to-[#cd0022] text-white transition-all duration-300 transform hover:scale-105 hover:rotate-1 hover:shadow-[0_0_20px_#000000] p-3 px-6 rounded-md font-semibold">View Current Shows</button>
      </div>
    </div>
  );
}
