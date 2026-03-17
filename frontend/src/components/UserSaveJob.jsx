// import { setSavedUserJobs } from '@/redux/jobSlice'
// import { JOB_API_END_POINT } from '@/utils/constant.js'
// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import Job from './Job.jsx'
// import { motion } from 'framer-motion'


// const UserSaveJob = () => {

//     const dispatch = useDispatch()
//     const [loading, setLoading] = useState(true);
//     const { savedUserJob } = useSelector(store => store.job)

//     useEffect(() => {
//         const fetchSavedJob = async () => {
//             try {
//                 const res = await axios.get(`${JOB_API_END_POINT}/saved`, { withCredentials: true })
//                 if (res.data.success) {
//                     dispatch(setSavedUserJobs(res.data.savedJobs))
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//             finally {
//                 setLoading(false)
//             }
//         }
//         fetchSavedJob();
//     }, []);


//   if (loading) {
//     return (
//         <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-purple-900 to-indigo-900">
//             <div className="flex gap-3">
//                 <div className="w-4 h-4 bg-pink-400 rounded-full animate-bounce"></div>
//                 <div className="w-4 h-4 bg-purple-400 rounded-full animate-bounce delay-150"></div>
//                 <div className="w-4 h-4 bg-indigo-400 rounded-full animate-bounce delay-300"></div>
//             </div>
//             <p className="mt-6 text-white tracking-widest font-semibold">
//                 Loading your saved jobs...
//             </p>
//         </div>
//     );


// }
//     return (
//         <div className="max-w-6xl mx-auto px-4 py-8">
//             <h1 className="text-2xl font-bold mb-6">Saved Jobs</h1>

//             {savedUserJob.length === 0 ? (
//                 <div className="text-center text-gray-500">
//                     <p>No saved jobs found.</p>
//                 </div>
//             ) : (
//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {savedUserJob.map((job, index) => (
//                         <motion.div
//                             key={job?._id}
//                             initial={{ opacity: 0, y: 40 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{
//                                 duration: 0.5,
//                                 delay: index * 0.1
//                             }}
//                         >
//                             <Job job={job} />
//                         </motion.div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }

// export default UserSaveJob




import { setSavedUserJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant.js'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Job from './Job.jsx'
import { motion } from 'framer-motion'
import Navbar from './shared/Navbar'
import { Button } from './ui/button'
import { ArrowBigLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const UserSaveJob = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const { savedUserJob } = useSelector(store => store.job)

    useEffect(() => {
        const fetchSavedJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/saved`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setSavedUserJobs(res.data.savedJobs))
                }
            } catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false)
            }
        }
        fetchSavedJob();
    }, []);

    // 🔥 Anime Loading Screen
    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-black">
                <div className="flex gap-4">
                    <div className="w-5 h-5 bg-pink-400 rounded-full animate-bounce"></div>
                    <div className="w-5 h-5 bg-purple-400 rounded-full animate-bounce delay-150"></div>
                    <div className="w-5 h-5 bg-indigo-400 rounded-full animate-bounce delay-300"></div>
                </div>
                <p className="mt-8 text-white text-lg tracking-widest font-semibold animate-pulse">
                    Loading your saved jobs...
                </p>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black px-4 sm:px-6 lg:px-8 py-10">
                {/* Header Section */}
                <div className="max-w-7xl mx-auto mb-10">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white"
                    >
                        <Button
                            onClick={() => navigate("/")}
                            className="flex items-center gap-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md
                             border border-gray-300 dark:border-gray-700 hover:bg-indigo-600 hover:text-white text-blue-600 transition-all duration-300 shadow-md hover:shadow-xl px-3 sm:px-4"
                        >
                            <ArrowBigLeft className="w-5 h-5" />
                            {/* Hide text on small screen */}
                            <span className="hidden sm:inline font-medium">
                                Back
                            </span>
                        </Button>

                        Saved Jobs
                    </motion.h1>

                    <p className="mt-2 text-sm sm:text-base text-gray-500 dark:text-gray-400">
                        Manage and track the jobs you saved for later.
                    </p>

                    {/* Stats Card */}
                    <div className="mt-6 bg-white/70 dark:bg-gray-800/60 backdrop-blur-md shadow-lg rounded-2xl p-5 w-full sm:w-72">
                        <p className="text-gray-500 text-sm">Total Saved</p>
                        <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                            {savedUserJob.length}
                        </h2>
                    </div>
                </div>

                {/* Job Grid */}
                <div className="max-w-7xl mx-auto">
                    {savedUserJob.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                                No saved jobs found.
                            </h2>
                            <p className="mt-2 text-gray-500 dark:text-gray-400">
                                Start saving jobs to see them here.
                            </p>
                        </motion.div>
                    ) : (
                        <div className="
                        grid 
                        grid-cols-1 
                        sm:grid-cols-2 
                        lg:grid-cols-3 
                        xl:grid-cols-4 
                        gap-6
                    ">
                            {savedUserJob.map((job, index) => (
                                <motion.div
                                    key={job?._id}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.08
                                    }}
                                    className="hover:scale-[1.02] transition-transform duration-300"
                                >
                                    <Job job={job} />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>


    );
}

export default UserSaveJob