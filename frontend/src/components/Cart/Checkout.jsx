import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCheckout } from "../../redux/slices/checkoutSlice";
import RazorpayButton from "../Product/RazorpayButton";


const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {cart, loading, error} = useSelector((state) => state.cart);
  const {user} = useSelector((state) => state.auth);
  const today = new Date().toISOString().split("T")[0];

  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
    rentStartDate: "",
    rentEndDate: "",
  });

  //Ensure cart is loaded before proceeding
  useEffect(() => {
    if (!cart || !cart.products || cart.products.length ===0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const handleCreateCheckout = async(e) => {
    e.preventDefault();
    if (cart && cart.products.length > 0) {
      const res = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAddress,
          paymentMethod: "Razorpay",
          totalPrice: calculatedTotalPrice,
        })
      );
      if (res.payload && res.payload._id) {
        setCheckoutId(res.payload._id); //set checkout ID if checkout was successful
      }
    }
  };

  const handlePaymentSuccess = async (details) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        {paymentStatus: "paid", paymentDetails: details},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
        await handleFinalizeCheckout(checkoutId); //Finalize checkout if payment is successful
    } catch (error) {
      console.error(error);
    }
  };

  const handleFinalizeCheckout = async (checkoutId) => {
  try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      navigate("/order-confirmation");
    } catch (error) {
      console.error(error);
      alert("Failed to finalize order");
    }
  };

  if(loading) return <p>Loading cart ...</p>;
  if(error) return <p>Error: {error}</p>;
  if (!cart || !cart.products || cart.products.length === 0) {
    return <p>Your cart is empty</p>;
  }

  const calculateMonths = () => {
    if (
      !shippingAddress.rentStartDate ||
      !shippingAddress.rentEndDate
    ) {
      return 1;
    }

    const start = new Date(shippingAddress.rentStartDate);
    const end = new Date(shippingAddress.rentEndDate);

    const months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());

    return months > 0 ? months : 1;
  };

  const rentalMonths = calculateMonths();

  const calculatedTotalPrice = cart.products.reduce(
    (total, product) => {
      return (
        total +
        product.price *
          product.quantity *
          rentalMonths
      );
    },
    0
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {/* Left Section */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className="text-lg mb-4">Contact Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={user ? user.email : ""}
              className="w-full p-2 border rounded"
              disabled
            />
          </div>

          <h3 className="text-lg mb-4">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstName: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastName: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Postal Code</label>
              <input
                type="text"
                value={shippingAddress.postalCode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Country</label>
            <input
              type="text"
              value={shippingAddress.country}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  country: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="tel"
              value={shippingAddress.phone}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  phone: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">
                Rent Start Date
              </label>
              <input
                type="date"
                value={shippingAddress.rentStartDate}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    rentStartDate: e.target.value,
                  })
                }
                min={today}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">
                Rent End Date
              </label>
              <input
                type="date"
                value={shippingAddress.rentEndDate}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    rentEndDate: e.target.value,
                  })
                }
                min={shippingAddress.rentStartDate || today}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="mt-6">
            {!checkoutId ? (
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded"
              >
                Continue to payment
              </button>
            ) : (
              <div>
                <h3 className="text-lg mb-4">Pay with Razorpay</h3>
                <RazorpayButton
                  amount={calculatedTotalPrice}
                  onSuccess={handlePaymentSuccess}
                  onError={(err) => alert("Payment failed, Try again.")}
                />
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Right Section - Order Summary */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">Order Summary</h2>
        {cart.products.map((product, index) => (
          <div key={index} className="flex items-center mb-4 border-b pb-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-20 rounded mr-4"
            />
            <div>
              <p className="font-semibold">{product.name}</p>
              <p className="text-sm text-gray-600">
                {product.size} - {product.color}
              </p>
              <p className="text-sm font-medium">
                Rs {product.price?.toLocaleString()} ×
                {product.quantity} ×
                {rentalMonths} month(s)
              </p>

              <p className="font-semibold text-emerald-700">
                Rs {
                  (
                    product.price *
                    product.quantity *
                    rentalMonths
                  ).toLocaleString()
                }
              </p>
            </div>
          </div>
        ))}

        <div className="border-t pt-4 mt-4 flex justify-between font-bold">
          <span>Subtotal:</span>
          <span>Rs {calculatedTotalPrice?.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center text-lg">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className="border-t pt-4 mt-4 flex justify-between font-bold">
          <p>Total</p>
          <p>Rs {calculatedTotalPrice?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
