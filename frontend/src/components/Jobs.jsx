// import React, { useEffect, useState } from 'react'
// import Navbar from './shared/Navbar.jsx'
// import FilterCard from './FilterCard.jsx'
// import Job from './Job.jsx'
// import { useSelector } from 'react-redux'
// import { motion } from 'framer-motion'

// // const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8]


// const Jobs = () => {
//     const { allJobs, searchedQuery } = useSelector(store => store.job)

//     const [filterJobs, setFilterJobs] = useState(allJobs);

//     useEffect(() => {
//         if (searchedQuery) {
//             const filteredJobs = allJobs.filter((job) => {
//                 return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
//                     job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
//                     job.location.toLowerCase().includes(searchedQuery.toLowerCase())
//             })
//             setFilterJobs(filteredJobs)
//         } else {
//             setFilterJobs(allJobs)
//         }
//     }, [allJobs, searchedQuery])
//     return (
//         <div>
//             <Navbar />
//             <div className='max-w-7xl mx-auto mt-5'>
//                 <div className='flex gap-5'>
//                     {/* Fillter page */}
//                     <div className='w-[20%]'>
//                         <FilterCard />
//                     </div>

//                     {/* job card */}
//                     {
//                         !filterJobs || filterJobs.length === 0 ? (
//                             <span>Job not found</span>
//                         ) : (
//                             <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
//                                 <div className='grid grid-cols-3 gap-4'>
//                                     {filterJobs.map((job) => (
//                                         <motion.div
//                                             initial={{ opacity: 0, x: 100 }}
//                                             animate={{ opacity: 1, x: 0 }}
//                                             exit={{ opacity: 0, x: -100 }}
//                                             transition={{ duration: 1 }}

//                                             key={job?._id}>
//                                             <Job job={job} />
//                                         </motion.div>
//                                     ))}
//                                 </div>
//                             </div>
//                         )
//                     }
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Jobs




import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar.jsx'
import FilterCard from './FilterCard.jsx'
import Job from './Job.jsx'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import Footer from './shared/Footer.jsx'

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job)
    const [filterJobs, setFilterJobs] = useState([])

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) =>
                job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            )
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery])

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />

            <div className="max-w-7xl mx-auto mt-6 px-4">
                <div className="flex flex-col lg:flex-row gap-6">

                    {/* 🔹 Filter Sidebar */}
                    <div className="w-full lg:w-[25%]">
                        <FilterCard />
                    </div>

                    {/* 🔹 Jobs Section */}
                    <div className="flex-1">

                        {filterJobs?.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-20"
                            >
                                <h2 className="text-2xl font-semibold text-gray-600">
                                    😔 No Jobs Found
                                </h2>
                                <p className="text-gray-500 mt-2">
                                    Try searching with a different keyword.
                                </p>
                            </motion.div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                                {filterJobs.map((job, index) => (
                                    <motion.div
                                        key={job?._id}
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: index * 0.1
                                        }}
                                    >
                                        <Job job={job} />
                                    </motion.div>
                                ))}

                            </div>
                        )}
                    </div>

                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Jobs