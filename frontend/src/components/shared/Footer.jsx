// export default Footer
// import React from "react"
// import { FaLinkedin, FaTwitter, FaFacebookSquare } from "react-icons/fa"
// import { motion } from "framer-motion"

// const Footer = () => {
//   return (
//     <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-300 mt-16">

//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12"
//       >

//         {/* Top Section */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

//           {/* Brand */}
//           <div>
//             <h1 className="text-2xl font-bold text-white mb-4">
//               Job Hunt
//             </h1>
//             <p className="text-sm leading-relaxed text-gray-400">
//               Connecting talented professionals with top companies worldwide.
//               Build your future with the right opportunities.
//             </p>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h2 className="text-lg font-semibold text-white mb-4">
//               Quick Links
//             </h2>
//             <ul className="space-y-2 text-sm">
//               <li className="hover:text-white transition cursor-pointer">
//                 Find Jobs
//               </li>
//               <li className="hover:text-white transition cursor-pointer">
//                 Companies
//               </li>
//               <li className="hover:text-white transition cursor-pointer">
//                 Post a Job
//               </li>
//               <li className="hover:text-white transition cursor-pointer">
//                 Career Advice
//               </li>
//             </ul>
//           </div>

//           {/* Support */}
//           <div>
//             <h2 className="text-lg font-semibold text-white mb-4">
//               Support
//             </h2>
//             <ul className="space-y-2 text-sm">
//               <li className="hover:text-white transition cursor-pointer">
//                 Help Center
//               </li>
//               <li className="hover:text-white transition cursor-pointer">
//                 Privacy Policy
//               </li>
//               <li className="hover:text-white transition cursor-pointer">
//                 Terms & Conditions
//               </li>
//               <li className="hover:text-white transition cursor-pointer">
//                 Contact Us
//               </li>
//             </ul>
//           </div>

//           {/* Contact + Social */}
//           <div>
//             <h2 className="text-lg font-semibold text-white mb-4">
//               Connect With Us
//             </h2>

//             <p className="text-sm text-gray-400 mb-4">
//               support@jobhunt.com
//             </p>

//             <div className="flex gap-4 text-xl">

//               <motion.a
//                 whileHover={{ scale: 1.2 }}
//                 className="hover:text-blue-500 transition"
//                 href="#"
//               >
//                 <FaLinkedin />
//               </motion.a>

//               <motion.a
//                 whileHover={{ scale: 1.2 }}
//                 className="hover:text-sky-400 transition"
//                 href="#"
//               >
//                 <FaTwitter />
//               </motion.a>

//               <motion.a
//                 whileHover={{ scale: 1.2 }}
//                 className="hover:text-blue-600 transition"
//                 href="#"
//               >
//                 <FaFacebookSquare />
//               </motion.a>

//             </div>
//           </div>
//         </div>

//         {/* Divider */}
//         <div className="border-t border-gray-700 my-8"></div>

//         {/* Bottom Section */}
//         <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400 gap-4">

//           <p>
//             © {new Date().getFullYear()} Job Hunt. All rights reserved.
//           </p>

//           <div className="flex gap-6">
//             <span className="hover:text-white cursor-pointer transition">
//               Privacy
//             </span>
//             <span className="hover:text-white cursor-pointer transition">
//               Terms
//             </span>
//             <span className="hover:text-white cursor-pointer transition">
//               Sitemap
//             </span>
//           </div>

//         </div>

//       </motion.div>
//     </footer>
//   )
// }

// export default Footer


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