
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
import { Loader2, Smartphone } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { API_URL } from "@/utils/api";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get phone from signup page
  const phoneNo = location.state?.phoneNo || "";

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!otp) return toast.error("Please enter the OTP");
    if (otp.length !== 6) return toast.error("OTP must be 6 digits");

    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/api/v1/user/verify-otp`, {
        phoneNo,
        otp,
      });

      if (res.data.success) {
        toast.success("Phone verified successfully!");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      await axios.post(`${API_URL}/api/v1/user/retry-otp`, { phoneNo: phone });
      toast.success("OTP resent successfully");
    } catch (error) {
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <div className="flex justify-center mb-2">
            <div className="bg-pink-100 p-3 rounded-full">
              <Smartphone className="w-8 h-8 text-pink-600" />
            </div>
          </div>
          <CardTitle className="text-center">Verify Phone Number</CardTitle>
          <CardDescription className="text-center">
            We've sent a 6-digit OTP to <strong>{String(phoneNo)}</strong>. Enter it below
            to verify your account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-2">
            <Label htmlFor="otp">Enter OTP</Label>
            <Input
              id="otp"
              type="text"
              placeholder="123456"
              maxLength={6}
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              className="text-center text-2xl tracking-[0.5em] font-bold"
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
                Verifying...
              </>
            ) : (
              "Verify OTP"
            )}
          </Button>

          <p className="text-gray-700 text-sm text-center">
            Didn't receive OTP?{" "}
            <button
              onClick={resendOtp}
              className="text-pink-800 hover:underline font-medium"
            >
              Resend
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyOTP;