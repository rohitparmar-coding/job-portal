// import React, { useEffect } from 'react'

// import Navbar from './shared/Navbar.jsx'
// import Job from './Job.jsx';
// import { useDispatch, useSelector } from 'react-redux';
// import { setSearchedQuery } from '@/redux/jobSlice.js';
// import useGetAllJobs from '@/hooks/useGetAllJobs.jsx';

// // const randomJobs = [1, 2, 3, 4];
// const Browse = () => {
//   useGetAllJobs();
//   const { allJobs } = useSelector(store => store.job);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     return () => {
//       dispatch(setSearchedQuery(""))
//     }
//   }, [])

//   return (
//     <div>
//       <Navbar />
//       <div className='max-w-7xl mx-auto my-10'>
//         <h1 className='font-bold text-xl my-10'>Search Result ({allJobs.length})</h1>

//         <div className='grid grid-cols-3 gap-4 mt-5'>
//           {
//             allJobs.map((job) => (
//               <Job key={job._id} job={job} />
//             ))
//           }
//         </div>

//       </div>
//     </div>
//   )
// }

// export default Browse

import React, { useEffect } from 'react'
import Navbar from './shared/Navbar.jsx'
import Job from './Job.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice.js';
import useGetAllJobs from '@/hooks/useGetAllJobs.jsx';
import { motion } from 'framer-motion';
import Footer from './shared/Footer.jsx';

const Browse = () => {

  const { allJobs, loading } = useSelector(store => store.job);
  const dispatch = useDispatch();

  // Fetch jobs once
  useGetAllJobs();

  // Clear search query when leaving
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""))
    }
  }, [dispatch])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />

      <div className='max-w-7xl mx-auto my-10 px-4'>

        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className='font-bold text-2xl my-10'
        >
          Search Result ({allJobs?.length || 0})
        </motion.h1>

        {/* 🔄 Loading State */}
        {loading ? (
          <div className="text-center mt-20 text-gray-500 animate-pulse">
            Loading jobs...
          </div>
        ) : allJobs?.length === 0 ? (

          /* ❌ Empty State */
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center text-gray-500 mt-20"
          >
            <h2 className="text-2xl font-semibold">No Jobs Found 😔</h2>
            <p className="mt-2">Try searching with different keywords.</p>
          </motion.div>

        ) : (

          /* ✅ Jobs Grid */
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
          >
            {allJobs?.map((job) => (
              <motion.div
                key={job._id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.03 }}
              >
                <Job job={job} />
              </motion.div>
            ))}
          </motion.div>

        )}

  
      </div>
      <Footer/>
    </motion.div>
  )
}

export default Browse