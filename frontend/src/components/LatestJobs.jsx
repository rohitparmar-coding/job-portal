
// import React from 'react'
// import LatestJobCards from './LatestJobCards';
// import { useSelector } from 'react-redux';

// // const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

// const LatestJobs = () => {
//     const { allJobs } = useSelector(store => store.job);
  
//     return (
//         <div className='max-w-7xl mx-auto my-20'>
//             <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top </span> Job Openings</h1>
//             <div className='grid grid-cols-3 gap-4 my-5'>
//                 {
//                     allJobs.length <= 0 ?
//                         <span>No Job Available</span> :
//                         allJobs?.slice(0, 6).map((job) =>
//                             <LatestJobCards key={job._id} job={job}/>)
//                 }
//             </div>
//         </div>
//     )
// }

// export default LatestJobs


import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job)

    return (
        <div className='max-w-7xl mx-auto my-20 px-4'>

            {/* ✨ Animated Heading */}
            <motion.h1
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className='text-2xl sm:text-3xl md:text-4xl font-bold text-center md:text-left'
            >
                <span className='text-[#6A38C2]'>Latest & Top </span> Job Openings
            </motion.h1>

            {/* Jobs Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-10'>
                {
                    allJobs?.length <= 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className='col-span-full text-center py-10'
                        >
                            <p className='text-gray-500 text-lg'>
                                🚫 No Job Available Right Now
                            </p>
                        </motion.div>
                    ) : (
                        allJobs.slice(0, 6).map((job, index) => (
                            <motion.div
                                key={job._id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <LatestJobCards job={job} />
                            </motion.div>
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default LatestJobs