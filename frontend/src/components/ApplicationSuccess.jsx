import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./shared/Navbar";
import { Button } from "./ui/button";
import { CheckCircle } from "lucide-react";
import { useSelector } from "react-redux";

const ApplicationSuccess = () => {
  const navigate = useNavigate();
  const { user } = useSelector(store => store.auth);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-xl border border-gray-200 rounded-2xl p-6 sm:p-10 max-w-xl w-full text-center"
        >

          {/* ICON */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            <div className="bg-green-100 p-5 rounded-full">
              <CheckCircle className="text-green-600 w-12 h-12" />
            </div>
          </motion.div>

          {/* TITLE */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Your application has been submitted!
          </h1>

          {/* EMAIL BOX */}
          <div className="flex items-center gap-3 bg-gray-50 border rounded-lg p-4 justify-center mb-6">
            <CheckCircle className="text-green-600 w-5 h-5" />
            <p className="text-sm text-gray-700">
              You will get an email confirmation at{" "}
              <span className="font-semibold">
                {user?.email || "your email"}
              </span>
            </p>
          </div>

          {/* BUTTON */}
          <Button
            onClick={() => navigate("/jobs")}
            className="w-full py-5 text-lg rounded-xl bg-blue-600 hover:bg-blue-500 transition"
          >
            Return to job search
          </Button>

          {/* FOOTER */}
          <p className="text-sm text-gray-500 mt-6">
            Having an issue with this application?{" "}
            <span className="text-blue-600 cursor-pointer hover:underline">
              Tell us more
            </span>
          </p>

          <p className="text-xs text-gray-400 mt-3">
            This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
          </p>

        </motion.div>
      </div>
    </div>
  );
};

export default ApplicationSuccess;