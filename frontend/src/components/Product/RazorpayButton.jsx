import React from "react";
import { useNavigate } from "react-router-dom";

const RazorpayButton = ({ amount, onSuccess, onError }) => {

  const navigate = useNavigate();

  const handlePayment = () => {
    try {

      // Fake payment success simulation
      const paymentDetails = {
        id: "PAY-" + Date.now(),
        status: "COMPLETED",
        amount,
      };

      alert("Payment Successful!");

      // Call success function
      onSuccess(paymentDetails);

      // Navigate to My Orders page
      navigate("/order-confirmation");

    } catch (error) {

      console.error(error);

      if (onError) {
        onError(error);
      }
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg mt-4"
    >
      Pay Rs {amount}
    </button>
  );
};

export default RazorpayButton;