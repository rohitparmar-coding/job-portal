// import React from 'react'
// import { Button } from './ui/button'
// import { Badge} from './ui/badge'
// import { Bookmark } from 'lucide-react'
// import { Avatar, AvatarImage } from './ui/avatar'
// import { useNavigate } from 'react-router-dom'


// const Job = ({job}) => {

//     const navigate = useNavigate();
//     // const jobId = 'AP001224645517'

//     const dayAgoFun = (mongodbTime)=>{
//         const createdAt = new Date(mongodbTime);
//         const currentTime = new Date();
//         const timeDiff = currentTime - createdAt;
//         return Math.floor(timeDiff / (1000*24*60*60))
//     }

//     return (
//         <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
//             <div className='flex items-center justify-between'>
//             <p className='text-sm text-gray-500'>{dayAgoFun(job?.createdAt) == 0 ? "Today" : `${dayAgoFun(job?.createdAt)} days ago`}</p>
//             <Button variant='outline' className="rounded-full" size='icon'> <Bookmark /></Button>
//             </div>

//             <div className='flex items-center gap-2 my-2'>
//                 <Button className='p-6' variant='outline' size='icon'>
//                     <Avatar>
//                         <AvatarImage src={ job?.company?.logo ? job?.company?.logo : "https://www.aabhishek.com/wp-content/uploads/2016/05/Real-Estate-Construction-Logo-Design.png"} alt='logo' />
//                     </Avatar>
//                 </Button>
//                 <div>
//                     <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
//                     <p className='text-sm text-gray-500'>{job?.location}</p>
//                 </div>
//             </div>

//             <div>
//                 <h1 className='font-bold text-blue-600 text-lg my-2 '>{job?.title}</h1>
//                 <p className='text-sm text-gray-600'>{job?.description}</p>
//             </div>
//             <div className='flex items-center gap-2 mt-4'>
//                 <Badge className={"text-blue-700 font-bold"} variant='ghost'>{job?.position} Position</Badge>
//                 <Badge className={"text-[#F83002] font-bold"} variant='ghost'>{job?.jobType}</Badge>
//                 <Badge className={"text-[#7209b7] font-bold"} variant='ghost'>{job?.salary}LPA</Badge>
//             </div>
//             <div className='flex items-center gap-4 mt-4'>
//                 <Button onClick={() => navigate(`/description/${job?._id}`)} variant='outline' >Details</Button>
//                 <Button className='bg-blue-600'>Save for later</Button>
//             </div>
//         </div>
//     )
// }

// export default Job


import React, { useState } from 'react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant.js'
import { useDispatch, useSelector } from 'react-redux'


const Job = ({ job }) => {
    const navigate = useNavigate()
    const { savedUserJob } = useSelector(store => store.job)
    const { user } = useSelector(store => store.auth)
    const isSaved = savedUserJob?.some(item => item._id === job?._id)

    const dayAgoFun = (mongodbTime) => {
        const createdAt = new Date(mongodbTime)
        const currentTime = new Date()
        const timeDiff = currentTime - createdAt
        return Math.floor(timeDiff / (1000 * 60 * 60 * 24))
    }

    const daysAgo = dayAgoFun(job?.createdAt)


    const handleSaveJob = async () => {
        try {
            const res = await axios.post(
                `${JOB_API_END_POINT}/save/${job?._id}`, {},
                { withCredentials: true }
            );
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error("Failed to save job");
        }
    }

    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 200 }}
            className='p-6 rounded-2xl shadow-md bg-white border border-gray-100 
                       hover:shadow-2xl hover:border-blue-300 transition-all duration-300'
        >
            {/* Top Section */}
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>
                    {daysAgo === 0 ? "Today" : `${daysAgo} days ago`}
                </p>

                <motion.div whileHover={{ scale: 1.2 }}>
                    {
                        user ? (
                            <Button
                                onClick={handleSaveJob}
                                variant='outline'
                                className={`rounded-full transition ${isSaved ? "bg-blue-100 text-blue-600 border-blue-400" : ""
                                    }`}
                                size='icon'
                            >
                                <Bookmark
                                    className={`h-4 w-4 transition ${isSaved ? "fill-blue-600 text-blue-600" : ""
                                        }`}
                                />
                            </Button>
                        ) : (<></>)
                    }
                </motion.div>
            </div>

            {/* Company Info */}
            <div className='flex items-center gap-3 my-4'>
                <Avatar className="h-12 w-12">
                    <AvatarImage
                        src={
                            job?.company?.logo
                                ? job?.company?.logo
                                : "https://www.aabhishek.com/wp-content/uploads/2016/05/Real-Estate-Construction-Logo-Design.png"
                        }
                        alt='logo'
                    />
                </Avatar>

                <div>
                    <h1 className='font-semibold text-lg text-gray-800'>
                        {job?.company?.name}
                    </h1>
                    <p className='text-sm text-gray-500'>
                        {job?.location}
                    </p>
                </div>
            </div>

            {/* Job Info */}
            <div>
                <h2 className='font-bold text-blue-600 text-xl mb-2'>
                    {job?.title}
                </h2>

                <p className='text-sm text-gray-600 line-clamp-2'>
                    {job?.description}
                </p>
            </div>

            {/* Badges */}
            <div className='flex flex-wrap items-center gap-2 mt-4'>
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

            {/* Buttons */}
            <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-6'>

                <Button
                    onClick={() => { user ? navigate(`/description/${job?._id}`) : navigate('/login') }}
                    variant='outline'
                    className="w-full sm:w-auto"
                >
                    Details
                </Button>

                {
                    user ? (<Button
                        onClick={handleSaveJob}
                        className={`w-full sm:w-auto transition ${isSaved
                            ? "bg-gray-400 hover:bg-gray-400"
                            : "bg-blue-600 hover:bg-blue-700"
                            }`}
                    >
                        {isSaved ? "Saved" : "Save for later"}
                    </Button>) : (<></>)
                }

            </div>
        </motion.div>
    )
}

export default Job