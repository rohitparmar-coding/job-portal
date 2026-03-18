import React, { useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant.js";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
const navigate = useNavigate()
  console.log(email)

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      `${USER_API_END_POINT}/api/v1/user/forgot-password`,
      { email },
      {withCredentials:true}
    );

    localStorage.setItem("resetEmail", email); // store email

    alert(res.data.message);
    navigate("/verify-otp")
  } catch (error) {
    alert(error.response?.data?.message);
  }
};

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="border p-6 rounded-lg shadow-lg w-[350px]"
      >
        <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter Email"
          className="border p-2 w-full mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="bg-blue-500 text-white px-4 py-2 w-full">
          Send OTP
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;