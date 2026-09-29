import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { API_URL } from "@/utils/api";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Phone field में सिर्फ digits allow करें
    if (name === "phone") {
      const onlyDigits = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, phone: onlyDigits }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const fullName = `${formData.firstName} ${formData.lastName}`.trim();

    // ✅ Field-by-field validation
    if (!formData.firstName.trim()) {
      return toast.error("Please enter your first name");
    }
    if (!formData.lastName.trim()) {
      return toast.error("Please enter your last name");
    }
    if (!formData.email.trim()) {
      return toast.error("Please enter your email");
    }
    if (!formData.phone.trim()) {
      return toast.error("Please enter your phone number");
    }
    if (!formData.password) {
      return toast.error("Please enter your password");
    }

    // ✅ Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return toast.error("Please enter a valid email address");
    }

    // ✅ Phone validation (Indian 10-digit number)
    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      return toast.error("Please enter a valid 10-digit phone number");
    }

    // ✅ Password validation (minimum 6 characters)
    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/api/v1/user/register`, {
         firstName: formData.firstName,
  lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phoneNo: formData.phone,
      });

      if (res.data.success) {
        toast.success("OTP sent to your mobile!");
        navigate("/verify-otp", {
          state: { phone: formData.phone },
        });
      }
    } catch (error) {
      console.log("Full error:", error);
      console.log("Response data:", error?.response?.data);
      const message =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-3">
            {/* First Name + Last Name */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="mb-2" htmlFor="firstName">
                  First Name
                </Label>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label className="mb-2" htmlFor="lastName">
                  Last Name
                </Label>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Doe"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Phone Number */}
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="9876543210"
                maxLength={10}
                required
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  placeholder="Create a password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
                {showPassword ? (
                  <EyeOff
                    onClick={() => setShowPassword(false)}
                    className="w-5 h-5 text-gray-700 absolute right-5 bottom-2 cursor-pointer"
                  />
                ) : (
                  <Eye
                    onClick={() => setShowPassword(true)}
                    className="w-5 h-5 text-gray-700 absolute right-5 bottom-2 cursor-pointer"
                  />
                )}
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Button
            onClick={submitHandler}
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer bg-pink-600 hover:bg-pink-400"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Please wait...
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
          <p className="text-gray-700 text-sm">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="hover:underline cursor-pointer text-pink-800"
            >
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;