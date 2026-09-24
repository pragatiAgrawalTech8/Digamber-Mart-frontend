
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import OrderCard from "@/components/OrderCard"

const MyOrder = () => {
 
  const [userOrder, setUserOrder] = useState(null)

  const getUserOrders = async () => {
    const accessToken = localStorage.getItem('accessToken')
    const res = await axios.get(`http://localhost:5555/api/v1/orders/myorder`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    if (res.data.success) {
      setUserOrder(res.data.orders)
    }
  }

  useEffect(() => {
    getUserOrders()
  }, [])

  // console.log(userOrder);

  return (
  <div className="min-h-screen bg-gray-100 pt-24 pb-8 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        My Orders
      </h1>

      {userOrder?.length > 0 ? (
        <OrderCard userOrder={userOrder} />
      ) : (
        <div className="flex items-center justify-center h-60">
          <p className="text-gray-500 text-lg">
            No orders found.
          </p>
        </div>
      )}
    </div>
  </div>
);
}

export default MyOrder