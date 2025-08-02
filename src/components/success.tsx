// src/components/Success.tsx
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Success = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get('session_id');
    if (!sessionId) return;

    const confirmBooking = async () => {
      try {
        await axios.post('http://localhost:5000/checkout/confirmbooking', {
          sessionId,
        });
        console.log('Booking confirmed');
      } catch (err) {
        console.error('Error confirming booking:', err);
      }
    };

    confirmBooking();
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-green-50 text-green-800">
      <CheckCircle className="w-16 h-16 mb-4 text-green-600" />
      <h1 className="text-3xl font-semibold mb-2">Payment Successful!</h1>
      <p className="text-lg max-w-md mb-6">
        Thank you for your purchase. Your order has been processed, and a confirmation email has been sent to you.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-5 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
      >
        Back to Home
      </button>
    </div>
  );
};

export default Success;
