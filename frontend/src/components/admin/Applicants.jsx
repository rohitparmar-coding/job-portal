// import React, { useEffect } from 'react'
// import Navbar from '../shared/Navbar.jsx'
// import ApplicantsTable from './ApplicantsTable.jsx'
// import axios from 'axios'
// import { APPLICATION_API_END_POINT } from '@/utils/constant.js'
// import { useParams } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { setAllApplicants } from '@/redux/applicationSlice.js'


// const Applicants = () => {
//     const params = useParams();
//     const dispatch = useDispatch();
//     const { applicants } = useSelector(store => store.application);

//     useEffect(() => {
//         const fetchAllApplicants = async () => {
//             try {
//                 const res = await axios.get(
//                     `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
//                     { withCredentials: true }
//                 );
//                 // console.log(res.data);
//                 if (res.data.success) {
//                     dispatch(setAllApplicants(res.data.job));
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         };

//         if (params.id) fetchAllApplicants();

//     }, [params.id, dispatch]);

//     return (
//         <div>
//             <Navbar />
//             <div className='max-w-7xl mx-auto'>
//                 <h1 className='font-bold text-xl my-5'>
//                     Applicants ({applicants?.applications?.length || 0})
//                 </h1>
//                 <ApplicantsTable />
//             </div>
//         </div>
//     );
// };

// export default Applicants


import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar.jsx";
import ApplicantsTable from "./ApplicantsTable.jsx";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant.js";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice.js";
import { motion } from "framer-motion";
import { Loader2, Users } from "lucide-react";
import { toast } from "sonner";
import Footer from "../shared/Footer.jsx";

const Applicants = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { applicants } = useSelector((store) => store.application);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${id}/applicants`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setAllApplicants(res.data.job));
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Failed to fetch applicants"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchAllApplicants();
  }, [id, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 dark:bg-indigo-500/20 p-3 rounded-xl">
              <Users className="text-indigo-600 dark:text-indigo-400" size={22} />
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Applicants
              </h1>
              <p className="text-gray-500 text-sm">
                Total Applications:{" "}
                <span className="font-semibold">
                  {applicants?.applications?.length || 0}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-4 md:p-6">
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin h-6 w-6 text-indigo-600" />
            </div>
          ) : (
            <ApplicantsTable />
          )}
        </div>
      </motion.div>
      <Footer/>
    </div>
  );
};

export default Applicants;