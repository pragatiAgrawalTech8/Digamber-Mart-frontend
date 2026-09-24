import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import userLogo from "/user.png";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "@/redux/userSlice";
import MyOrder from './MyOrder';

const Profile = () => {
  const { user } = useSelector((store) => store.user);
  const params = useParams();
  const userId = params.userId;
  const [updateUser, setUpdateUser] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    phoneNo: user?.phoneNo,
    address: user?.address,
    city: user?.city,
    zipCode: user?.zipCode,
    profilePic: user?.profilePic,
    role: user?.role,
  });
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setUpdateUser({
      ...updateUser,
      profilePic: URL.createObjectURL(selectedFile),
    }); //profile only
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("accessToken");

    try {
      // use FormData for text + file
      const formData = new FormData();

      formData.append("firstName", updateUser.firstName);
      formData.append("lastName", updateUser.lastName);
      formData.append("email", updateUser.email);
      formData.append("phoneNo", updateUser.phoneNo);
      formData.append("address", updateUser.address);
      formData.append("city", updateUser.city);
      formData.append("zipCode", updateUser.zipCode);
      formData.append("role", updateUser.role);

      if (file) {
        formData.append("file", file); // image file for backend
      }

      const res = await axios.put(
        `http://localhost:5555/api/v1/user/update/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    }
  };
  return (
    <div className="pt-32 min-h-screen bg-gray-100 flex justify-center items-start px-4">
      <Tabs
        defaultValue="profile"
        className="max-w-7xl mx-auto items-center w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        {/* Account Tab */}
        <TabsContent value="profile">
          <div className="flex flex-col justify-center items-center bg-gray-100">
            <h1 className="font-bold text-xl md:text-2xl text-gray-800 mb-6 md:mb-8">
              Update Profile
            </h1>

            <div className="w-full flex flex-col md:flex-row gap-6 md:gap-10 justify-between items-center md:items-start px-2 md:px-7 max-w-2xl">
              {/* Profile Picture */}
              <div className="flex flex-col items-center">
                <img
                  src={updateUser?.profilePic || userLogo}
                  alt="profile"
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-pink-800"
                />

                <Label className="mt-4 cursor-pointer bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 text-sm">
                  Change Picture
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </Label>
              </div>

              {/* Profile Form */}
              <form
                onSubmit={handleSubmit}
                className="w-full space-y-4 shadow-lg p-4 md:p-5 rounded-lg bg-white flex-1"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="block text-sm font-medium">
                      First Name
                    </Label>
                    <Input
                      type="text"
                      name="firstName"
                      placeholder="John"
                      className="mt-1"
                      value={updateUser.firstName || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <Label className="block text-sm font-medium">
                      Last Name
                    </Label>
                    <Input
                      type="text"
                      name="lastName"
                      placeholder="Doe"
                      className="mt-1"
                      value={updateUser.lastName || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <Label className="block text-sm font-medium">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    disabled
                    value={updateUser.email || ""}
                    onChange={handleChange}
                    className="mt-1 bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div>
                  <Label className="block text-sm font-medium">
                    Phone Number
                  </Label>
                  <Input
                    type="text"
                    name="phoneNo"
                    placeholder="Enter your Contact No"
                    className="mt-1"
                    value={updateUser.phoneNo || ""}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label className="block text-sm font-medium">Address</Label>
                  <Input
                    type="text"
                    name="address"
                    placeholder="Enter your Address"
                    className="mt-1"
                    value={updateUser.address || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="block text-sm font-medium">City</Label>
                    <Input
                      type="text"
                      name="city"
                      placeholder="Enter your City"
                      className="mt-1"
                      value={updateUser.city || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium">
                      Zip Code
                    </Label>
                    <Input
                      type="text"
                      name="zipCode"
                      placeholder="Enter your Zip Code"
                      className="mt-1"
                      value={updateUser.zipCode || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-pink-600 hover:bg-pink-700"
                >
                  Update Profile
                </Button>
              </form>
            </div>
          </div>
        </TabsContent>

        {/* Password Tab */}
        <TabsContent value="orders">
          <MyOrder/>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
