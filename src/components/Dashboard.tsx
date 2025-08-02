import { useEffect, useState } from "react";
import { Calendar, Clock, MapPin, Star, Ticket } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Play = {
  id: number;
  title: string;
  image: string; // base64 string
  description: string;
  show_date: string;
  show_time: string;
  price: number;
  rating: number;
  numtickets: number;
};

type BookingWithMovie = {
  bookingId: string;
  movie: Play;
  date: string;
  time: string;
  numTickets: number;
};
type NavProps = {
  uid: string | null;
};
export default function Dashboard({uid}: NavProps) {
  const navigate = useNavigate();
  const [plays, setPlays] = useState<BookingWithMovie[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<BookingWithMovie | null>(null);

  function formatTime(timeStr: string) {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const ampm = hours >= 12 ? "PM" : "AM";
    const adjustedHour = hours % 12 || 12;
    return `${adjustedHour}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  }

  
  useEffect(() => {
    async function getBookedShows() {
      try {
        const response = await fetch(`http://localhost:5000/movies/bookings/${uid}`);
        if (!response.ok) throw new Error("Failed to fetch bookings");
        const data: BookingWithMovie[] = await response.json();
        setPlays(data);
      } catch (error) {
        console.error(error);
      }
    }

    if (!uid) {
      console.error("User not logged in");
      navigate("/login");
      return;
    }
    getBookedShows();
  }, []);

  return (
    <div className="min-h-screen bg-[#0C0A09] flex flex-col items-center px-4 py-20">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-bree text-white mb-4 text-center">My Tickets</h1>

        <p className="text-gray-400 text-center mb-8 font-inter">
          Here are your upcoming movie bookings. Enjoy the show!
        </p>
        {plays.length === 0 ? (
          <div className="text-gray-400 text-center font-inter mt-20">
            You have no tickets yet. Book your first movie!
          </div>        
        ) : (
          <div className="flex justify-center items-center">
            <div className="flex flex-wrap justify-center gap-6 max-w-[1400px] w-full">
              {plays.map((play) => {
                const { bookingId, movie, numTickets } = play;
                return (
                  <div
                    key={movie.id}
                    onClick={() =>
                      setSelectedTicket({
                        bookingId,
                        movie,
                        date: movie.show_date,
                        time: movie.show_time,
                        numTickets,
                      })
                    }
                    className="cursor-pointer bg-[#181310] border-2 border-[#312621] rounded-2xl overflow-hidden relative flex flex-col hover:scale-[1.01] hover:shadow-[0_0_50px_#cd002245] hover:-translate-y-1 transition-all"
                  >
                    <img
                      src={`data:image/jpeg;base64,${movie.image}`}
                      alt={movie.title}
                      className="w-full h-48 object-cover border-b-2 border-[#312621]"
                    />
                    <div className="absolute top-2 right-2 flex gap-1 items-center bg-[#E7B008] text-black px-2 py-1 rounded font-inter font-semibold">
                      <Star size={16} />
                      {movie.rating}
                    </div>
                    <div className="p-6 flex flex-col gap-3 flex-grow">
                      <h3 className="text-white font-bree text-xl">{movie.title}</h3>
                      <p className="text-gray-400 font-inter text-sm line-clamp-3">{movie.description}</p>
                      <div className="text-gray-400 text-sm flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          {new Date(movie.show_date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} />
                          {formatTime(movie.show_time)}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={16} />
                          Main Stage
                        </div>
                        <div className="flex items-center gap-2">
                          <Ticket size={16} />
                            {numTickets} ticket{numTickets > 1 ? "s" : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Fullscreen Modal for QR Code */}
        {selectedTicket && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50 p-6"
            onClick={() => setSelectedTicket(null)}
          >
            <div
              className="bg-[#181310] rounded-3xl p-8 max-w-sm w-full text-center relative"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-3xl text-yellow-400 font-bold mb-4">{selectedTicket.movie.title}</h2>
              <p className="text-gray-300 mb-6">
  Booking for{" "}
  <strong>{new Date(selectedTicket.date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })}</strong>{" "}
  at{" "}
  <strong>{formatTime(selectedTicket.time)}</strong>
</p>

              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${selectedTicket.bookingId}`}
                alt="QR code"
                className="mx-auto mb-6"
              />
              <button
                onClick={() => setSelectedTicket(null)}
                className="absolute top-4 right-4 text-yellow-400 font-bold text-xl hover:text-yellow-600"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

