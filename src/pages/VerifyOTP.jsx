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
import { Loader2, ShieldCheck } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

const VerifyOTP = () => {
  const { email } = useParams();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!otp) {
      return toast.error("Please enter the OTP");
    }
    if (otp.length !== 6) {
      return toast.error("OTP must be 6 digits");
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `http://localhost:5555/api/v1/user/verify-otp/${email}`,
        { otp },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.success) {
        toast.success("OTP verified successfully");
        navigate(`/change-password/${email}`);
      }
    } catch (error) {
      console.log(error);
      const message =
        error?.response?.data?.message || "Invalid or expired OTP";
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
              <ShieldCheck className="w-8 h-8 text-pink-600" />
            </div>
          </div>
          <CardTitle className="text-center">Verify OTP</CardTitle>
          <CardDescription className="text-center">
            We've sent a 6-digit OTP to <strong>{email}</strong>. Enter it below
            to continue.
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
              onClick={() => navigate("/forgot-password")}
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