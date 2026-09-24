import { Button } from "@/components/ui/button";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ShowUserOrders = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [userOrder, setUserOrder] = useState(null);

  const getUserOrders = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const res = await axios.get(
      `http://localhost:5555/api/v1/orders/user-order/${params.userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    if (res.data.success) {
      setUserOrder(res.data.orders);
    }
  };

  useEffect(() => {
    getUserOrders();
  }, []);

  console.log(userOrder);

 return (
  <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
    {/* Header */}
    <div className="flex items-center gap-3 mb-6">
      <Button
        size="icon"
        variant="outline"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-5 h-5" />
      </Button>

      <h1 className="text-2xl md:text-3xl font-bold">
        Orders
      </h1>
    </div>

    {userOrder?.length === 0 ? (
      <div className="flex justify-center items-center h-60">
        <p className="text-lg md:text-2xl text-gray-600">
          No orders found for this user.
        </p>
      </div>
    ) : (
      <div className="space-y-6">
        {userOrder?.map((order) => (
          <div
            key={order._id}
            className="rounded-2xl border bg-white shadow-md p-4 md:p-6"
          >
            {/* Order Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
              <div>
                <h2 className="font-semibold text-lg">
                  Order ID
                </h2>

                <p className="text-sm text-gray-500 break-all">
                  {order._id}
                </p>
              </div>

              <div className="flex flex-col md:items-end gap-2">
                <p className="font-bold text-lg">
                  ₹{order.amount.toFixed(2)}
                </p>

                <span
                  className={`px-3 py-1 rounded-full text-white text-sm w-fit ${
                    order.status === "Paid"
                      ? "bg-green-500"
                      : order.status === "Failed"
                      ? "bg-red-500"
                      : "bg-orange-400"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>

            {/* User Info */}
            <div className="mt-5 border-t pt-4">
              <h3 className="font-semibold mb-2">
                Customer Details
              </h3>

              <p className="text-gray-700">
                {order.user?.firstName} {order.user?.lastName}
              </p>

              <p className="text-gray-500 break-all">
                {order.user?.email}
              </p>
            </div>

            {/* Products */}
            <div className="mt-6">
              <h3 className="font-semibold mb-4">
                Products
              </h3>

              <div className="space-y-4">
                {order.products.map((product, index) => (
                  <div
                    key={index}
                    className="border rounded-xl p-4 flex flex-col sm:flex-row gap-4 sm:items-center"
                  >
                    <img
                      src={product.productId?.productImg?.[0]?.url}
                      alt=""
                      onClick={() =>
                        navigate(
                          `/products/${product.productId?._id}`
                        )
                      }
                      className="w-24 h-24 rounded-lg object-cover cursor-pointer mx-auto sm:mx-0"
                    />

                    <div className="flex-1">
                      <h4 className="font-semibold text-lg line-clamp-2">
                        {product.productId?.productName}
                      </h4>

                      <p className="text-gray-500 text-sm break-all mt-1">
                        {product.productId?._id}
                      </p>

                      <p className="mt-2 font-medium">
                        ₹{product.productId?.productPrice} ×{" "}
                        {product.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);
};

export default ShowUserOrders;
