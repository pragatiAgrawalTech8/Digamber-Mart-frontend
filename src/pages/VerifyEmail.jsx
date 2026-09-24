import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
const VerifyEmail = () => {
  const { token } = useParams()
  const [status, setStatus] = useState("Verifying...")
  const navigate = useNavigate()
  const verifyEmail = async () => {
    try {
      const res = await axios.post("http://localhost:5555/api/v1/user/verify", {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (res.data.success) {
        setStatus("✅ Email verified successfully")
        setTimeout(() => {
          navigate('/login')
        }, 2000);
      }

    } catch (error) {
      console.log(error)
      setStatus("❌ verification failed. Please try again")
    }
  }
  useEffect(() => {
    verifyEmail()
  }, [token])
  return (
    <div className="relative w-full h-[760px] overflow-hidden">
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-2xl shadow-md text-center w-[90%] max-w-md">
          <h2 className="text-xl font-semibold text-gray-800">{status}</h2>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
