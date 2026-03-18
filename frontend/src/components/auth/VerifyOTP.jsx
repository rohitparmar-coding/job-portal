import React, { useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant.js";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

const handleVerify = async (e) => {
  e.preventDefault();

  const email = localStorage.getItem("resetEmail");

  try {
    const res = await axios.post(
      `${USER_API_END_POINT}/api/v1/user/verify-otp`,
      { email, otp },
       {withCredentials:true}
    );

    alert(res.data.message);
    navigate("/reset-password")
  } catch (error) {
    alert(error.response?.data?.message);
  }
};

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleVerify}
        className="border p-6 rounded-lg shadow-lg w-[350px]"
      >
        <h2 className="text-xl font-semibold mb-4">Verify OTP</h2>

        <input
          type="text"
          placeholder="Enter OTP"
          className="border p-2 w-full mb-4"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button className="bg-green-500 text-white px-4 py-2 w-full">
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;