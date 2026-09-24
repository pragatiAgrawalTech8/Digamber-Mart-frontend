import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
const OrderCard = ({userOrder}) => {
     const navigate = useNavigate()
  return (
  <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Button onClick={() => navigate(-1)}>
          <ArrowLeft />
        </Button>

        <h1 className="text-2xl md:text-3xl font-bold">
          Orders
        </h1>
      </div>

      {userOrder?.length === 0 ? (
        <p className="text-center text-xl text-gray-600 py-20">
          No orders found for this user.
        </p>
      ) : (
        <div className="space-y-6">
          {userOrder?.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-md border p-5"
            >
              {/* Order Header */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-5">
                <div>
                  <h2 className="font-semibold text-lg break-all">
                    Order ID:
                  </h2>

                  <p className="text-gray-500 text-sm break-all">
                    {order._id}
                  </p>
                </div>

                <div className="flex flex-col md:items-end gap-2">
                  <p className="font-semibold">
                    {order.currency} {order.amount.toFixed(2)}
                  </p>

                  <span
                    className={`w-fit px-3 py-1 rounded-lg text-white ${
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
              <div className="mb-6">
                <p className="font-medium">
                  {order.user?.firstName} {order.user?.lastName}
                </p>

                <p className="text-gray-500 break-all">
                  {order.user?.email}
                </p>
              </div>

              {/* Products */}
              <div>
                <h3 className="font-semibold mb-4">
                  Products
                </h3>

                <div className="space-y-4">
                  {order.products.map((product, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-gray-50 rounded-xl p-4"
                    >
                      <img
                        onClick={() =>
                          navigate(`/products/${product?.productId?._id}`)
                        }
                        src={product.productId?.productImg?.[0]?.url}
                        alt=""
                        className="w-24 h-24 object-cover rounded-lg cursor-pointer mx-auto sm:mx-0"
                      />

                      <div className="flex-1 w-full">
                        <h4 className="font-semibold line-clamp-2">
                          {product.productId?.productName}
                        </h4>

                        <p className="text-sm text-gray-500 break-all mt-1">
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
  </div>
);
}

export default OrderCard