import { XCircle } from "lucide-react";

const OrderNotProcessed = () => {
    const title = "Oops! Payment Cancelled"
    const message = "Your payment was cancelled or something went wrong. Need help? Contact support."
    const actionLabel = "Back to Home"
    const actionUrl = "/";
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md w-full space-y-4">
        <XCircle className="mx-auto text-red-500 w-16 h-16" />
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-600">{message}</p>
        <a
          href={actionUrl}
          className="inline-block mt-4 px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
        >
          {actionLabel}
        </a>
      </div>
    </div>
  );
};

export default OrderNotProcessed;
