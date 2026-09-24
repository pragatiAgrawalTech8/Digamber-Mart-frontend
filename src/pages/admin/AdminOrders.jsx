import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.getItem("accessToken");
  // console.log("orders", orders);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5555/api/v1/orders/all",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        );
        if (data.success) setOrders(data.orders);
      } catch (error) {
        console.error("❌ Failed to fetch admin orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [accessToken]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading all orders...
      </div>
    );
  }
  return (
    <div className=" pt-24 lg:pt-20 px-4 md:px-6 lg:pr-8 pb-10">
    <h1 className="text-2xl md:text-3xl font-bold mb-6">
      Admin - All Orders
    </h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden lg:block bg-white rounded-xl shadow border overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr className="text-left">
                  <th className="w-[220px] px-5 py-4 font-semibold">
                    Order ID
                  </th>
                  <th className="w-[220px] px-5 py-4 font-semibold">
                    Customer
                  </th>
                  <th className="w-[280px] px-5 py-4 font-semibold">
                    Products
                  </th>
                  <th className="w-[120px] px-5 py-4 font-semibold">Amount</th>
                  <th className="w-[120px] px-5 py-4 font-semibold">Status</th>
                  <th className="w-[140px] px-5 py-4 font-semibold">Date</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-t hover:bg-pink-50 transition-colors"
                  >
                    {/* Order ID */}
                    <td className="px-5 py-4">
                      <p className="font-medium text-gray-700 break-all">
                        {order._id}
                      </p>
                    </td>

                    {/* Customer */}
                    <td className="px-5 py-4">
                      <p className="font-semibold">
                        {order.user?.name || "Unknown User"}
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        {order.user?.email}
                      </p>
                    </td>

                    {/* Products */}
                    <td className="px-5 py-4">
                      <div className="space-y-1">
                        {order.products.map((p, idx) => (
                          <div key={idx} className="flex justify-between gap-3">
                            <span>{p.productName}</span>

                            <span className="font-medium">× {p.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="px-5 py-4 font-semibold text-pink-600">
                      ₹{order.amount.toLocaleString("en-IN")}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === "Paid"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      {new Date(order.createdAt).toLocaleDateString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile & Tablet Cards */}
          <div className="grid gap-4 lg:hidden">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white border rounded-xl p-4 shadow-sm"
              >
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Order ID</p>
                    <p className="font-medium break-all">{order._id}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Customer</p>
                    <p className="font-medium">
                      {order.user?.name || "Unknown User"}
                    </p>
                    <p className="text-sm text-gray-500">{order.user?.email}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-1">Products</p>

                    {order.products.map((p, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between text-sm py-1"
                      >
                        <span>{p.productName}</span>
                        <span>× {p.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Amount</span>
                    <span className="font-semibold">
                      ₹{order.amount.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Status</span>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Date</span>

                    <span>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminOrders;
