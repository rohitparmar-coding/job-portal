// import React, { useEffect, useState } from 'react'
// import Navbar from '../shared/Navbar.jsx'
// import { Input } from '../ui/input'
// import { Button } from '../ui/button'
// import { useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import AdminJobsTable from './AdminJobsTable.jsx'
// import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs.jsx'
// import { setSearchJobByText } from '@/redux/jobSlice.js'

// const AdminJobs = () => {
//   useGetAllAdminJobs()
//   const navigate = useNavigate()
//   const [input, setInput] = useState("");
//   const dispatch = useDispatch()

//   useEffect(() => {
//     dispatch(setSearchJobByText(input))
//   }, [input])
//   return (
//     <div>
//       <Navbar />
//       <div className='max-w-6xl mx-auto my-18'>
//         <div className='flex items-center justify-between my-5'>
//           <Input
//             className='w-fit'
//             placeholder="Filter by name"
//             onChange={(e) => setInput(e.target.value)}
//           />
//           <Button onClick={() => navigate('/admin/jobs/create')}>New Jobs</Button>
//         </div>
//         <AdminJobsTable />
//       </div>
//     </div>
//   )
// }

// export default AdminJobs



import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar.jsx";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable.jsx";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs.jsx";
import { setSearchJobByText } from "@/redux/jobSlice.js";
import { motion } from "framer-motion";
import { PlusCircle, Search } from "lucide-react";
import Footer from "../shared/Footer.jsx";

const AdminJobs = () => {
  useGetAllAdminJobs();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState("");

  // 🔎 Dispatch Search Filter
  useEffect(() => {
    const delay = setTimeout(() => {
      dispatch(setSearchJobByText(input));
    }, 300); // debounce for performance

    return () => clearTimeout(delay);
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Manage Jobs
            </h1>
            <p className="text-gray-500 mt-1 text-sm md:text-base">
              Create, edit and manage all job postings.
            </p>
          </div>

          {/* Search + Button */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            
            <div className="relative w-full sm:w-72">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <Input
                placeholder="Search by job title..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="pl-9 rounded-xl focus:ring-2 focus:ring-indigo-400 transition-all"
              />
            </div>

            <Button
              onClick={() => navigate("/admin/jobs/create")}
              className="rounded-xl hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
              <PlusCircle size={18} />
              New Job
            </Button>
          </div>
        </div>

        {/* Table Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-4 md:p-6"
        >
          <AdminJobsTable />
        </motion.div>
      </motion.div>
      <Footer/>
    </div>
  );
};

export default AdminJobs;