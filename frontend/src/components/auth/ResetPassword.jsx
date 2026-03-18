import React, { useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
const navigate = useNavigate()
 const handleReset = async (e) => {
  e.preventDefault();

  const email = localStorage.getItem("resetEmail");

  try {
    const res = await axios.post(
      `${USER_API_END_POINT}/api/v1/user/reset-password`,
      { email, password },
      {withCredentials:true}
    );

    localStorage.removeItem("resetEmail");

    alert(res.data.message);
    navigate("/login")
  } catch (error) {
    alert(error.response?.data?.message);
  }
};

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleReset}
        className="border p-6 rounded-lg shadow-lg w-[350px]"
      >
        <h2 className="text-xl font-semibold mb-4">Reset Password</h2>

        <input
          type="password"
          placeholder="New Password"
          className="border p-2 w-full mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-purple-500 text-white px-4 py-2 w-full">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;