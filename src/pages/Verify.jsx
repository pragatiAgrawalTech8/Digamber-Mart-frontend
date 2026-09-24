import React from "react";
import { CircleCheckBig } from "lucide-react";
const Verify = () => {
  return (
    <div className="relative w-full h-[760px] overflow-hidden">
      <div className="min-h-screen flex items-center justify-center bg-pink-100 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CircleCheckBig className="w-8 h-8 text-green-500" />

            <h2 className="text-2xl font-semibold text-green-500">
              Check your Email
            </h2>
          </div>
          <p className="text-gray-400 text-sm">
            we've sent you an email to verify your account. Please check your
            inbox and click the verification link
          </p>
        </div>
      </div>
    </div>
  );
};

export default Verify;
