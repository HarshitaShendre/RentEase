import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cleancart } from "../redux/slices/cartSlices";

const OrderConfirmationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkout = useSelector((state) => state.checkout.checkout);

  // Clean cart after successful order
  useEffect(() => {
    if (checkout && checkout._id) {
      dispatch(cleancart());
      localStorage.removeItem("cart");
    } else {
      navigate("/my-orders");
    }
  }, [checkout, dispatch, navigate]);

  // Estimated delivery date
  const calculateEstimatedDelivery = (createdAt) => {
    if (!createdAt) return "";

    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10);

    return orderDate.toLocaleDateString();
  };

  // Prevent crash if checkout is null
  if (!checkout) {
    return (
      <div className="text-center mt-20 text-xl">
        No Order Found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
        Thank You For Your Order!
      </h1>

      <div className="p-6 rounded-lg border shadow-md">
        
        {/* Order Info */}
        <div className="flex justify-between mb-10 flex-col md:flex-row gap-4">
          
          <div>
            <h2 className="text-xl font-semibold">
              Order ID: {checkout._id}
            </h2>

            <p className="text-gray-500">
              Order Date:{" "}
              {checkout.createdAt
                ? new Date(checkout.createdAt).toLocaleDateString()
                : ""}
            </p>
          </div>

          <div>
            <p className="text-emerald-700 font-medium">
              Estimated Delivery:{" "}
              {calculateEstimatedDelivery(checkout.createdAt)}
            </p>
          </div>
        </div>

        {/* Ordered Items */}
        <div className="mb-10">
          {checkout.checkoutItems &&
            checkout.checkoutItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center mb-4 border-b pb-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md mr-4"
                />

                <div>
                  <h4 className="text-md font-semibold">
                    {item.name}
                  </h4>

                  <p className="text-sm text-gray-500">
                    {item.color} | {item.size}
                  </p>
                </div>

                <div className="ml-auto text-right">
                  <p className="text-md font-semibold">
                    ₹ {item.price}
                  </p>

                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>
              </div>
            ))}
        </div>

        {/* Payment & Delivery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Payment */}
          <div>
            <h4 className="text-lg font-semibold mb-2">
              Payment
            </h4>

            <p className="text-gray-600">
              Razorpay
            </p>
          </div>

          {/* Delivery */}
          <div>
            <h4 className="text-lg font-semibold mb-2">
              Delivery Address
            </h4>

            <p className="text-gray-600">
              {checkout.shippingAddress?.address}
            </p>

            <p className="text-gray-600">
              {checkout.shippingAddress?.city},{" "}
              {checkout.shippingAddress?.country}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;