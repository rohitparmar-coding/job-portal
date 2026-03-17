// import React, { useEffect, useState } from 'react'
// import Navbar from '../shared/Navbar.jsx'
// import { Input } from '../ui/input'
// import { Button } from '../ui/button'
// import CompaniesTable from './CompaniesTable.jsx'
// import { useNavigate } from 'react-router-dom'
// import useGetAllCompanies from '@/hooks/useGetAllCompanies.jsx'
// import { useDispatch } from 'react-redux'
// import { setsearchCompanyByText } from '@/redux/companySlice.js'

// const Companies = () => {
//     useGetAllCompanies();
//     const navigate = useNavigate()
//     const [input, setInput] = useState("");
//     const dispatch = useDispatch()

//     useEffect(() =>{
//        dispatch(setsearchCompanyByText(input))
//     },[input])
//     return (
//         <div>
//             <Navbar />
//             <div className='max-w-6xl mx-auto my-18'>
//                 <div className='flex items-center justify-between my-5'>
//                     <Input
//                         className='w-fit'
//                         placeholder="Filter by name"
//                         onChange={(e) => setInput(e.target.value)}
//                     />
//                     <Button onClick={() => navigate('/admin/companies/create')}>New Company</Button>
//                 </div>
//                 <CompaniesTable/>
//             </div>
//         </div>
//     )
// }

// export default Companies


import React, { useEffect, useState, useMemo } from "react";
import Navbar from "../shared/Navbar.jsx";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable.jsx";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies.jsx";
import { useDispatch } from "react-redux";
import { setsearchCompanyByText } from "@/redux/companySlice.js";
import { motion } from "framer-motion";
import Footer from "../shared/Footer.jsx";

const Companies = () => {
  useGetAllCompanies();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState("");

  // ⭐ Debounce search (Performance Optimization)
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setsearchCompanyByText(input));
    }, 300);

    return () => clearTimeout(timer);
  }, [input]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-10"
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            🏢 Companies
          </h2>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Input
              className="w-full md:w-64 rounded-xl border-indigo-200 focus:ring-2 focus:ring-indigo-400"
              placeholder="Search company name..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <Button
              className="rounded-xl hover:scale-105 transition-all duration-200"
              onClick={() => navigate("/admin/companies/create")}
            >
              + New Company
            </Button>
          </div>
        </div>

        {/* Companies Table Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-4 md:p-6"
        >
          <CompaniesTable />
        </motion.div>
      </motion.div>

      <Footer/>
    </div>
  );
};

export default Companies;