import React from "react";
import { FaLinkedin, FaTwitter, FaFacebookSquare, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative mt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-90 animate-gradient"></div>

      {/* Glass Container */}
      <div className="relative backdrop-blur-xl bg-white/10 border-t border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10 text-white">

          {/* Company Info */}
          <div>
            <h1 className="text-2xl font-bold tracking-wide">Job Hunt</h1>
            <p className="text-sm mt-3 text-gray-200">
              Connecting talent with opportunity. Build your career with the
              best companies worldwide.
            </p>
            <p className="mt-4 text-sm text-gray-300">
              📍 Bhopal, India  
              <br />
              📞 +91 9876543210  
              <br />
              ✉ support@jobhunt.com
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="font-semibold text-lg mb-4">Quick Links</h2>
            <ul className="space-y-2 text-gray-200">
              <li className="hover:text-white hover:translate-x-1 transition">Home</li>
              <li className="hover:text-white hover:translate-x-1 transition">Browse Jobs</li>
              <li className="hover:text-white hover:translate-x-1 transition">Post Job</li>
              <li className="hover:text-white hover:translate-x-1 transition">About Us</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h2 className="font-semibold text-lg mb-4">Subscribe</h2>
            <p className="text-sm text-gray-200 mb-3">
              Get latest job updates directly in your inbox.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter email"
                className="w-full px-4 py-2 rounded-l-md text-black focus:outline-none"
              />
              <button className="bg-black px-4 py-2 rounded-r-md hover:bg-gray-900 transition">
                Join
              </button>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h2 className="font-semibold text-lg mb-4">Follow Us</h2>
            <div className="flex gap-5 text-2xl">
              <a href="#" className="hover:scale-125 transition duration-300">
                <FaLinkedin />
              </a>
              <a href="#" className="hover:scale-125 transition duration-300">
                <FaTwitter />
              </a>
              <a href="#" className="hover:scale-125 transition duration-300">
                <FaFacebookSquare />
              </a>
              <a href="#" className="hover:scale-125 transition duration-300">
                <FaGithub />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="text-center text-gray-200 text-sm py-4 border-t border-white/20">
          © 2026 Job Hunt. All rights reserved.
        </div>
      </div>

      {/* Gradient Animation */}
      <style>
        {`
          .animate-gradient {
            background-size: 400% 400%;
            animation: gradient 10s ease infinite;
          }
          @keyframes gradient {
            0% {background-position: 0% 50%;}
            50% {background-position: 100% 50%;}
            100% {background-position: 0% 50%;}
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;