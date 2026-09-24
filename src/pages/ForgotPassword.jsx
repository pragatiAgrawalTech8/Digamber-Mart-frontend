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
import { Loader2, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Please enter your email");
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5555/api/v1/user/forgot-password",
        { email },
        { headers: { "Content-Type": "application/json" } }
      );

      // ⚠️ Backend ka response note karo:
      // { success: false, message: "Otp sent to email successfully" }
      // Aapke backend mein success: false hai — ye bug hai, but chalega
      toast.success(res.data.message || "OTP sent to your email");
      navigate(`/verify-otp/${email}`);
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
              <Mail className="w-8 h-8 text-pink-600" />
            </div>
          </div>
          <CardTitle className="text-center">Forgot Password?</CardTitle>
          <CardDescription className="text-center">
            Enter your email address and we'll send you an OTP to reset your
            password
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Button
            onClick={submitHandler}
            disabled={loading}
            className="w-full bg-pink-600 hover:bg-pink-400"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Sending OTP...
              </>
            ) : (
              "Send OTP"
            )}
          </Button>

          <p className="text-gray-700 text-sm">
            Remember your password?{" "}
            <Link
              to="/login"
              className="hover:underline text-pink-800 font-medium"
            >
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPassword;