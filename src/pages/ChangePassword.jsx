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
import { Eye, EyeOff, Loader2, Lock } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

const ChangePassword = () => {
  const { email } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!formData.newPassword || !formData.confirmPassword) {
      return toast.error("All fields are required");
    }
    if (formData.newPassword !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }
    if (formData.newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `http://localhost:5555/api/v1/user/change-password/${email}`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.success) {
        toast.success("Password changed successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      const message =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <div className="flex justify-center mb-2">
            <div className="bg-pink-100 p-3 rounded-full">
              <Lock className="w-8 h-8 text-pink-600" />
            </div>
          </div>
          <CardTitle className="text-center">Set New Password</CardTitle>
          <CardDescription className="text-center">
            Choose a strong password to secure your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-3">
            <div className="grid gap-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  name="newPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={formData.newPassword}
                  onChange={handleChange}
                />
                {showPassword ? (
                  <EyeOff
                    onClick={() => setShowPassword(false)}
                    className="w-5 h-5 text-gray-700 absolute right-3 top-2.5 cursor-pointer"
                  />
                ) : (
                  <Eye
                    onClick={() => setShowPassword(true)}
                    className="w-5 h-5 text-gray-700 absolute right-3 top-2.5 cursor-pointer"
                  />
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {showConfirm ? (
                  <EyeOff
                    onClick={() => setShowConfirm(false)}
                    className="w-5 h-5 text-gray-700 absolute right-3 top-2.5 cursor-pointer"
                  />
                ) : (
                  <Eye
                    onClick={() => setShowConfirm(true)}
                    className="w-5 h-5 text-gray-700 absolute right-3 top-2.5 cursor-pointer"
                  />
                )}
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button
            onClick={submitHandler}
            disabled={loading}
            className="w-full bg-pink-600 hover:bg-pink-400"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Updating...
              </>
            ) : (
              "Change Password"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChangePassword;