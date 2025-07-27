import { Facebook, Twitter, Instagram, Linkedin, Theater } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#181310] text-white px-6 py-10 flex flex-col justify-center items-center">
      <div className="flex max-w-[1000px]  flex-wrap justify-center items-start gap-8">
        
        {/* Company Info */}
        <div className="flex flex-col max-w-[500px] gap-7 max-[900px]:items-center">
          <div className="flex flex-col max-[900px]:items-center">
                <div className="flex items-center gap-3 mb-4 ">
                <Theater color="#FFB900" className="w-10 h-10 object-contain" />
                <h2 className="text-xl font-bree font-bold text-[#4A0813] ">Royal Theater</h2>
            </div>
            <p className="text-md text-white max-[900px]:text-center">
                Experience the magic of live theater in our historic venue. From classic dramas to contemporary performances, we bring stories to life on stage.
            </p>
          </div>

            <div>
                <h3 className="text-lg font-semibold font-bree mb-3">Follow Us</h3>
                <div className="flex gap-4">
                    <a href="#" aria-label="Facebook" className="hover:text-blue-500">
                    <Facebook size={20} />
                    </a>
                    <a href="#" aria-label="Twitter" className="hover:text-sky-400">
                    <Twitter size={20} />
                    </a>
                    <a href="#" aria-label="Instagram" className="hover:text-pink-400">
                    <Instagram size={20} />
                    </a>
                    <a href="#" aria-label="LinkedIn" className="hover:text-blue-300">
                    <Linkedin size={20} />
                    </a>
            </div>
        </div>
  
        </div>

        <div className="flex gap-8 ">
          {/* Quick Links */}
        <div className="min-w-[100px]">
          <h3 className="text-lg font-semibold mb-3 font-bree">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="text-md hover:text-[#FFB900] font-inter">Current Shows</a></li>
            <li><a href="#" className="text-md hover:text-[#FFB900] font-inter">About</a></li>
            <li><a href="#" className="text-md hover:text-[#FFB900] font-inter">Services</a></li>
            <li><a href="#" className="text-md hover:text-[#FFB900] font-inter">Contact</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div className="min-w-[100px]">
          <h3 className="text-lg font-semibold mb-3 font-bree">Contact Info</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><div  className="text-md font-inter">123 Main Street</div></li>
            <li><div  className="text-md font-inter">Toronto, Ontario, M1M 2G1</div></li>
            <li><div  className="text-md font-inter"> Box Office:</div><div className="text-md text-[#FFB900] font-inter">(555) 123-SHOW</div></li>
            
          </ul>
        </div>
        </div>

       
      </div>

      {/* Bottom Bar */}
      <div className="text-sm text-gray-500 text-center mt-10 border-t border-gray-700 pt-6 w-[95vw]">
        © {new Date().getFullYear()} Royal Theater. All rights reserved.
      </div>
    </footer>
  );
}
