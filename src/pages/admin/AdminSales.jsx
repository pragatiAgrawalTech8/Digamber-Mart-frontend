import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const AdminSales = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalSales: 0,
    salesByDate: [],
  });

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(
        "http://localhost:5555/api/v1/orders/sales",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data.success) {
        setStats(res.data);
        // console.log(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
  <div className="min-h-screen bg-gray-100 px-4 py-6 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {/* Total Users */}
      <Card className="bg-pink-500 text-white shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle>Total Users</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">
          {stats.totalUsers}
        </CardContent>
      </Card>

      {/* Total Products */}
      <Card className="bg-pink-500 text-white shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle>Total Products</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">
          {stats.totalProducts}
        </CardContent>
      </Card>

      {/* Total Orders */}
      <Card className="bg-pink-500 text-white shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle>Total Orders</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">
          {stats.totalOrders}
        </CardContent>
      </Card>

      {/* Total Sales */}
      <Card className="bg-pink-500 text-white shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle>Total Sales</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">
          ₹{stats.totalSales.toLocaleString()}
        </CardContent>
      </Card>

      {/* Sales Chart */}
      <Card className="col-span-1 sm:col-span-2 xl:col-span-4 shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle>Sales (Last 30 Days)</CardTitle>
        </CardHeader>

        <CardContent className="h-[260px] sm:h-[320px] lg:h-[420px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stats.sales}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#ec4899"
                fill="#f9a8d4"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  </div>
);
}

export default AdminSales