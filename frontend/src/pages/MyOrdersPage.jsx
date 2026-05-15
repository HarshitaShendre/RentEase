import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserOrders } from "../redux/slices/orderSlice";

const MyOrdersPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector(
    (state) => state.orders
  );

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  if (loading) return <p>Loading...</p>;

  if (error) {
    return <p>Error: {error?.message || error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">
        My Orders
      </h2>

      <div className="relative shadow-md sm:rounded-lg overflow-hidden">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-2 px-4">Image</th>
              <th className="py-2 px-4">Order Id</th>
              <th className="py-2 px-4">Created</th>
              <th className="py-2 px-4">Shipping Address</th>
              <th className="py-2 px-4">Items</th>
              <th className="py-2 px-4">Rent Start</th>
              <th className="py-2 px-4">Rent End</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(orders) && orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  onClick={() => handleRowClick(order._id)}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                >
                  <td className="py-2 px-4">
                    <img
                      src={
                        order.orderItems?.[0]?.image || "/placeholder.png"

                      }
                      alt="Product"
                      className="w-10 h-10 object-cover rounded-lg"
                    />
                  </td>

                  <td className="py-2 px-4 font-medium text-gray-900">
                    {order._id}
                  </td>

                  <td className="py-2 px-4">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td className="py-2 px-4">
                    {order.shippingAddress
                      ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                      : "N/A"}
                  </td>

                  <td className="py-2 px-4">
                    {order.orderItems?.length || 0}
                  </td>

                  <td className="py-2 px-4">
                    {order.rentStartDate
                      ? new Date(order.rentStartDate).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td className="py-2 px-4">
                    {order.rentEndDate
                      ? new Date(order.rentEndDate).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td className="py-2 px-4">
                    ₹{order.totalPrice}
                  </td>

                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.isPaid
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={9}
                  className="py-4 text-center text-gray-500"
                >
                  You have no Orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrdersPage;