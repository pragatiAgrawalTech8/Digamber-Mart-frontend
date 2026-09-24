import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Edit, Eye, Search } from "lucide-react";
// import UserLogo from "../../user.png";
import { toast } from "sonner";
const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredUsers = users.filter(
    (user) =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getAllUsers = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const res = await axios.get(
        `http://localhost:5555/api/v1/user/all-user`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        setUsers(res.data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const makeAdmin = async (id) => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const res = await axios.put(
        `http://localhost:5555/api/v1/user/make-admin/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        getAllUsers(); // list refresh
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  // console.log(users);

  return (
  <div className="w-full px-4 sm:px-6 md:px-8 lg:pl-[100px] lg:pr-10 xl:pr-16 py-6 sm:py-8">
    {/* Header */}
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold">User Management</h1>
      <p className="text-sm sm:text-base text-gray-600 mt-1">
        View and manage registered users
      </p>
    </div>

    {/* Search */}
    <div className="relative w-full sm:max-w-sm mt-6">
      <Search className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
      <Input
        className="pl-10"
        placeholder="Search Users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>

    {/* Users */}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
      {filteredUsers?.map((user) => (
        <div
          key={user._id}
          className="bg-pink-100 rounded-xl p-5 shadow hover:shadow-lg transition"
        >
          {/* User Info */}
          <div className="flex items-center gap-4">
            <img
              src={user?.profilePic || "/user.png"}
              alt="User"
              className="w-16 h-16 rounded-full object-cover border-2 border-pink-600 flex-shrink-0"
            />

            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-semibold truncate">
                {user.firstName} {user.lastName}
              </h2>

              <p className="text-sm text-gray-600 break-all">
                {user.email}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-5 flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => navigate(`/dashboard/users/${user._id}`)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>

              <Button
                className="bg-pink-600 hover:bg-pink-700"
                onClick={() =>
                  navigate(`/dashboard/users/orders/${user._id}`)
                }
              >
                <Eye className="w-4 h-4 mr-2" />
                Orders
              </Button>
            </div>

            {user.role === "admin" ? (
              <span className="w-full text-center px-3 py-2 rounded-lg bg-green-100 text-green-700 font-semibold">
                Admin
              </span>
            ) : (
              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => makeAdmin(user._id)}
              >
                Make Admin
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);
};

export default AdminUsers;
