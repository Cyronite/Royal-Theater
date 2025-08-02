import { Search, Calendar, Clock, MapPin, Star } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, type Selection } from "@heroui/react";

import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

type Play = {
  id: number;
  title: string;
  description: string;
  image: string;
  rating: number;
  show_date: string;
  show_time: string;
  numtickets: number;
  price:number;
};

export default function Shows({ uid }: { uid: string | null }) {
  const [query, setQuery] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set(["Sort By ..."]));
  const selectedValue = useMemo(() => Array.from(selectedKeys).join(", ").replace(/_/g, ""), [selectedKeys]);
  const [plays, setPlays] = useState<Play[]>([]);
 


  async function handleCheckout(playId: number, numtickets: number, price: number) {
    if (!uid) {
      alert("Please log in to book tickets");
      return;
    }else{
      const stripe = await stripePromise;
      if (!stripe) {
        console.error('Stripe failed to load.');
        return;
      }
      // Call your backend to create the checkout session
      const response = await fetch('http://localhost:5000/checkout/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ playId:playId, numtickets:numtickets, price:price,  uid:uid }),
      });

      const data = await response.json();
      if (data.sessionId) {
        // Redirect to Stripe Checkout page
        const { error } = await stripe.redirectToCheckout({
          sessionId: data.sessionId,
        });

        if (error) {
          console.error('Stripe redirect error:', error.message);
        }
      } else {
        console.error('Failed to get sessionId from backend');
      }
    }
  }

  useEffect(() => {
    async function getShows() {
      try {
        const response = await fetch('http://localhost:5000/movies/');
        if (!response.ok) throw new Error(`Response ${response.status}`);
        const json = await response.json();
        setPlays(json);
      } catch (error) {
        console.error("Error fetching plays:", error);
      }
    }
    getShows();
  }, []);

  function formatTime(timeStr: string) {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const ampm = hours >= 12 ? "PM" : "AM";
    const adjustedHour = hours % 12 || 12;
    return `${adjustedHour}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  }

  const upcomingPlays = [...plays]
    .filter(play => new Date(play.show_date) >= new Date())
    .sort((a, b) => new Date(a.show_date).getTime() - new Date(b.show_date).getTime())
    .slice(0, 3);

  return (
    <div className="bg-[#0C0A09] px-4 py-36 flex flex-col items-center">
      {/* Header */}
      <div className="text-center max-w-3xl mb-10">
        <h1 className="font-bree text-white text-4xl sm:text-5xl mb-4">Current & Upcoming Shows</h1>
        <p className="font-inter text-gray-400 text-lg sm:text-2xl">
          Discover our season's lineup of exceptional performances, from Broadway classics to innovative new works
        </p>
      </div>

      {/* Search and Filter */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-4 items-center justify-center bg-[#181310] px-6 py-5 rounded-lg mb-10">
        <div className="relative w-full md:w-[70%]">
          <input
            onChange={(e) => setQuery(e.target.value)}
            type="search"
            placeholder="Search shows..."
            className="w-full border-2 border-[#312621] bg-[#0C0A09] text-white py-3 pl-10 pr-4 rounded-md font-inter"
          />
          <Search color="white" className="absolute top-3 left-3" />
        </div>
        <Dropdown>
          <DropdownTrigger>
            <Button className="capitalize font-inter bg-[#0C0A09] text-white border-2 border-[#312621] rounded-md w-full md:w-auto">
              {selectedValue}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            aria-label="Sort options"
            selectedKeys={selectedKeys}
            selectionMode="single"
            variant="flat"
            onSelectionChange={setSelectedKeys}
            className="font-inter bg-[#181310] text-white border border-[#312621] rounded-lg"
            itemClasses={{
              base: "text-white hover:bg-[#312621] font-inter rounded-md px-3 py-2",
            }}
          >
            <DropdownItem key="Sort By Date">Sort By Date</DropdownItem>
            <DropdownItem key="Sort By Rating">Sort By Rating</DropdownItem>
            <DropdownItem key="Sort By Title">Sort By Title</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-10 w-full max-w-7xl">
        {/* Featured Plays */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...plays]
            .filter(play => play.title.toLowerCase().includes(query.toLowerCase()))
            .sort((a, b) => {
              if (selectedValue === "Sort By Title") return a.title.localeCompare(b.title);
              if (selectedValue === "Sort By Rating") return b.rating - a.rating;
              if (selectedValue === "Sort By Date") return new Date(a.show_date).getTime() - new Date(b.show_date).getTime();
              return 0;
            })
            .map((play) => (
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
                    <div className={`w-3 h-3 rounded-full ${(play.numtickets > 0) ? 'bg-green-600' : 'bg-red-600'}`} />
                    {(play.numtickets > 0) ? 'Tickets Available' : 'Sold Out'}
                  </div>
                  <button
                    onClick={() => handleCheckout(play.id, play.numtickets, play.price)} // Assuming priceId is play.id for simplicity
                    disabled={!(play.numtickets > 0)}
                    
                    className={`text-sm px-4 py-1.5 rounded-md font-semibold transition-all ${
                      (play.numtickets > 0)
                        ? 'bg-gradient-to-r from-[#4A0813] to-[#cd0022] text-white hover:scale-105'
                        : 'border border-[#312621] text-white hover:bg-[#E7B008] hover:text-black'
                    }`}
                  >
                    {(play.numtickets > 0) ? 'Book Now' : 'Out of Tickets'}
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* Upcoming Shows Sidebar */}
        <div className="w-full lg:w-[280px]">
          <h2 className="text-white font-bree text-2xl mb-4">Upcoming Shows</h2>
          <div className="space-y-4">
            {upcomingPlays.map((play) => (
              <div key={play.id} className="bg-[#181310] border border-[#312621] p-4 rounded-lg text-white">
                <h3 className="font-semibold">{play.title}</h3>
                <p className="text-gray-400 text-sm">{new Date(play.show_date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
