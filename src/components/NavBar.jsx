import React, { useState } from "react";
import Logo from "./Logo";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

const NavBar = () => {
  const { user } = useSelector((store) => store.user);
  const { cart } = useSelector((store) => store.product);
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      console.log("Logout Token:", token);

      const res = await axios.post(
        "http://localhost:5555/api/v1/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("Logout Success:", res.data);

      if (res.data.success) {
        localStorage.removeItem("accessToken");
        dispatch(setUser(null));
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log("Logout Error:", error.response?.data);
      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data);
    }
  };

  return (
    <header className="bg-pink-50 fixed w-full z-20 border-b border-pink-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-4">
        <Logo className="h-12 md:h-16 w-auto" />
        <nav className="hidden md:flex gap-10 justify-between items-center">
          <ul className="flex gap-7 items-center text-xl font-semibold">
            <Link to={"/"}>
              <li>Home</li>
            </Link>
            <Link to={"/products"}>
              <li>Products</li>
            </Link>
            {user && (
              <Link to={`/profile/${user._id}`}>
                <li>Hello, {user.firstName}</li>
              </Link>
            )}
            {user && user.role === "admin" && (
              <Link to={"/dashboard"}>
                <li>Dashboard</li>
              </Link>
            )}
          </ul>
          <Link to={"/cart"} className="relative">
            <ShoppingCart />
            <span className="bg-pink-500 rounded-full absolute text-white -top-3 -right-5 px-2">
              {cart?.items?.length || 0}
            </span>
          </Link>
          {user ? (
            <Button
              onClick={logoutHandler}
              className="bg-pink-600 text-white cursor-pointer"
            >
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button className="bg-gradient-to-tl from-blue-600 to-purple-600 text-white cursor-pointer">
                Login
              </Button>
            </Link>
          )}
        </nav>

        {/* Mobile/Tablet: Cart + Hamburger */}
        <div className="flex md:hidden items-center gap-5">
          <Link
            to={"/cart"}
            className="relative"
            onClick={() => setMenuOpen(false)}
          >
            <ShoppingCart />
            <span className="bg-pink-500 rounded-full absolute text-white -top-3 -right-5 px-2 text-xs">
              {cart?.items?.length || 0}
            </span>
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-pink-50 border-t border-pink-200 px-4 pb-4">
          <ul className="flex flex-col gap-4 text-lg font-semibold pt-4">
            <Link to={"/"} onClick={() => setMenuOpen(false)}>
              <li>Home</li>
            </Link>
            <Link to={"/products"} onClick={() => setMenuOpen(false)}>
              <li>Products</li>
            </Link>
            {user && (
              <Link
                to={`/profile/${user._id}`}
                onClick={() => setMenuOpen(false)}
              >
                <li>Hello, {user.firstName}</li>
              </Link>
            )}
            {user && user.role === "admin" && (
              <Link to={"/dashboard"} onClick={() => setMenuOpen(false)}>
                <li>Dashboard</li>
              </Link>
            )}
          </ul>
          <div className="mt-4">
            {user ? (
              <Button
                onClick={logoutHandler}
                className="bg-pink-600 text-white cursor-pointer w-full"
              >
                Logout
              </Button>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <Button className="bg-gradient-to-tl from-blue-600 to-purple-600 text-white cursor-pointer w-full">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
