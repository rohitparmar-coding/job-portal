// import React from 'react'
// import { Badge } from './ui/badge'
// import { useNavigate } from 'react-router-dom'

// const LatestJobCards = ({job}) => {
//      const navigate = useNavigate()
//     return (
//         <div onClick={()=> navigate(`/description/${job._id}`) } className='p-5 rounded-md shadow-xl bg-white border-gray-100 cursor-pointer'>
//             <div>
//                 <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
//                 <p className='text-sm text-gray-500'>{job?.location}</p>
//             </div>
//             <div>
//                 <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
//                 <p className='text-sm text-gray-600'>{job?.description}</p>
//             </div>
//             <div className='flex items-center gap-2 mt-4'>
//                 <Badge className={"text-blue-700 font-bold"} variant='ghost'>{job?.position} Position</Badge>
//                 <Badge className={"text-[#F83002] font-bold"} variant='ghost'>{job?.jobType}</Badge>
//                 <Badge className={"text-[#7209b7] font-bold"} variant='ghost'>{job?.salary}LPA</Badge>
//             </div>

//         </div>
//     )
// }

// export default LatestJobCards

import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate()
    const { user } = useSelector(store=>store.auth)

    return (
        <motion.div
            whileHover={{ y: -8 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 200 }}
            onClick={() => { user ? navigate(`/description/${job._id}`) : navigate('/login')} }
            className='p-6 rounded-2xl shadow-md bg-white border border-gray-100 
                       cursor-pointer transition-all duration-300
                       hover:shadow-2xl hover:border-purple-300'
        >
            {/* Company & Location */}
            <div className='mb-3'>
                <h1 className='font-semibold text-lg text-gray-800'>
                    {job?.company?.name}
                </h1>
                <p className='text-sm text-gray-500'>
                    {job?.location}
                </p>
            </div>

            {/* Job Title & Description */}
            <div>
                <h2 className='font-bold text-xl text-gray-900 mb-2'>
                    {job?.title}
                </h2>

                <p className='text-sm text-gray-600 line-clamp-2'>
                    {job?.description}
                </p>
            </div>

            {/* Badges */}
            <div className='flex flex-wrap items-center gap-2 mt-5'>
                <Badge className="bg-blue-50 text-blue-700 font-semibold px-3 py-1 rounded-full">
                    {job?.position} Position
                </Badge>

                <Badge className="bg-red-50 text-[#F83002] font-semibold px-3 py-1 rounded-full">
                    {job?.jobType}
                </Badge>

                <Badge className="bg-purple-50 text-[#7209b7] font-semibold px-3 py-1 rounded-full">
                    ₹{job?.salary} LPA
                </Badge>
            </div>
        </motion.div>
    )
}

export default LatestJobCards