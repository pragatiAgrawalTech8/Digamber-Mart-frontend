import axios from "axios";
import dotenv from "dotenv";
dotenv.config();


const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY;
const MSG91_TEMPLATE_ID = process.env.MSG91_TEMPLATE_ID;
const MSG91_SENDER_ID = process.env.MSG91_SENDER_ID;

const sendOtp = async (mobile) => {
  try {
    // mobile में country code होना चाहिए (91XXXXXXXXXX)
    const formattedMobile = mobile.startsWith("91") ? mobile : `91${mobile}`;

    const response = await axios.post(
      "https://control.msg91.com/api/v5/otp",
      {
        template_id: MSG91_TEMPLATE_ID,
        mobile: formattedMobile,
        
        sender: MSG91_SENDER_ID,
      },
      {
        headers: {
          "Content-Type": "application/json",
          authkey: MSG91_AUTH_KEY,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("MSG91 Error:", error.response?.data || error.message);
    throw error;
  }
};

const verifyOtp = async (mobile, otp) => {
  try {
    const formattedMobile = mobile.startsWith("91") ? mobile : `91${mobile}`;

    const response = await axios.get(
      `https://control.msg91.com/api/v5/otp/verify?mobile=${formattedMobile}&otp=${otp}`,
      {
        headers: {
          authkey: MSG91_AUTH_KEY,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("MSG91 Verify Error:", error.response?.data || error.message);
    throw error;
  }
};

const retryOtp = async (mobile) => {
  try {
    const formattedMobile = mobile.startsWith("91") ? mobile : `91${mobile}`;

    const response = await axios.get(
      `https://control.msg91.com/api/v5/otp/retry?authkey=${MSG91_AUTH_KEY}&mobile=${formattedMobile}&retrytype=text`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("MSG91 Retry Error:", error.response?.data || error.message);
    throw error;
  }
};

export  { sendOtp, verifyOtp, retryOtp };