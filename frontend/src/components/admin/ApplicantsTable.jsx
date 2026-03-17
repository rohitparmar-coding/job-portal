// import React from 'react'
// import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
// import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
// import { MoreHorizontal } from 'lucide-react'
// import { useSelector } from 'react-redux'
// import axios from 'axios'
// import { APPLICATION_API_END_POINT } from '@/utils/constant'
// import { toast } from 'sonner'


// const shortlistingstatus = ['accepted', 'rejected']
// const ApplicantsTable = () => {
//     const { applicants } = useSelector(store => store.application);

//     const statusHandler = async (status, id) =>{
//         try{
//            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, {status}, {withCredentials:true})
//            if(res.data.success){
//             toast.success(res.data.message)
//            }
//         }catch(error){
//             console.log(error)
//         }
//     }
//     return (
//         <div>
//             <Table>
//                 <TableCaption>A list of your recent applied user.</TableCaption>
//                 <TableHeader>
//                     <TableRow>
//                         <TableHead>FullName</TableHead>
//                         <TableHead>Email</TableHead>
//                         <TableHead>Contact</TableHead>
//                         <TableHead>Resume</TableHead>
//                         <TableHead>Date</TableHead>
//                         <TableHead className='text-right'>Action</TableHead>
//                     </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                     {
//                         applicants && applicants?.applications?.map((item) => (
//                             <TableRow key={item._id}>
//                                 <TableCell>{item?.applicant?.fullname}</TableCell>
//                                 <TableCell>{item?.applicant?.email}</TableCell>
//                                 <TableCell>{item?.applicant?.phoneNumber}</TableCell>
//                                 <TableCell >
//                                     <a className='text-blue-600 cursor-pointer' href={item?.applicant?.profile?.resume} target='_blank' >
//                                         {item?.applicant?.profile?.resumeOriginalName ? item?.applicant?.profile?.resumeOriginalName : 'No Resume Uploaded'}
//                                     </a></TableCell>
//                                 <TableCell>
//                                     {/* {item?.applicant?.updatedAt} */}
//                                     {new Date(item?.createdAt).toLocaleDateString()}
//                                 </TableCell>
//                                 <TableCell className='text-right cursor-pointer'>
//                                     <Popover>
//                                         <PopoverTrigger>
//                                             <MoreHorizontal />
//                                         </PopoverTrigger>
//                                         <PopoverContent className='w-32'>
//                                             {
//                                                 shortlistingstatus.map((status, index) => {
//                                                     return (
//                                                         <div onClick={() => statusHandler(status, item?._id)} key={index} className='flex w-fit items-center my-2 cursor-pointer'>
//                                                             <span>{status}</span>
//                                                         </div>
//                                                     )
//                                                 })
//                                             }
//                                         </PopoverContent>
//                                     </Popover>

//                                 </TableCell>
//                             </TableRow>
//                         ))
//                     }
//                 </TableBody>

//             </Table>
//         </div>
//     )
// }

// export default ApplicantsTable





import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal, CheckCircle, XCircle, Clock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { setAllApplicants } from "@/redux/applicationSlice.js";

const shortlistingstatus = ["accepted", "rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector((store) => store.application);
    const dispatch = useDispatch()

    const statusHandler = async (status, id) => {
    try {
        await axios.post(
            `${APPLICATION_API_END_POINT}/status/${id}/update`,
            { status },
            { withCredentials: true }
        );

        const updatedApplicants = {
            ...applicants,
            applications: applicants.applications.map((app) =>
                app._id === id ? { ...app, status: status } : app
            ),
        };

        dispatch(setAllApplicants(updatedApplicants));

        toast.success(`Application ${status}`);
    } catch (error) {
        toast.error("Failed to update status");
    }
};

    // 🎨 Status Badge UI
    const StatusBadge = ({ status }) => {
        if (status?.toLowerCase() === "accepted")
            return (
                <span className="flex items-center gap-1 text-green-600 bg-green-100 dark:bg-green-500/20 px-3 py-1 rounded-full text-xs font-medium">
                    <CheckCircle size={14} /> Accepted
                </span>
            );

        if (status?.toLowerCase() === "rejected")
            return (
                <span className="flex items-center gap-1 text-red-600 bg-red-100 dark:bg-red-500/20 px-3 py-1 rounded-full text-xs font-medium">
                    <XCircle size={14} /> Rejected
                </span>
            );

        return (
            <span className="flex items-center gap-1 text-yellow-600 bg-yellow-100 dark:bg-yellow-500/20 px-3 py-1 rounded-full text-xs font-medium">
                <Clock size={14} /> Pending
            </span>
        );
    };

    return (
        <div className="w-full overflow-x-auto rounded-2xl border border-gray-100 dark:border-gray-700">
            <Table className="min-w-[900px]">
                <TableCaption>A list of recent applicants.</TableCaption>

                <TableHeader className="bg-indigo-50 dark:bg-gray-800">
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {applicants?.applications?.map((item, index) => {
                        const currentStatus = item?.status || "pending";

                        return (
                            <motion.tr
                                key={item._id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.04 }}
                                className={`transition 
                ${currentStatus === "accepted"
                                        ? "bg-green-50/50 dark:bg-green-900/10"
                                        : currentStatus === "rejected"
                                            ? "bg-red-50/50 dark:bg-red-900/10"
                                            : "hover:bg-indigo-50 dark:hover:bg-gray-800"
                                    }`}
                            >
                                <TableCell className="font-medium">
                                    {item?.applicant?.fullname}
                                </TableCell>

                                <TableCell>{item?.applicant?.email}</TableCell>

                                <TableCell>{item?.applicant?.phoneNumber}</TableCell>

                                <TableCell>
                                    <a
                                        className="text-indigo-600 hover:underline"
                                        href={item?.applicant?.profile?.resume}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {item?.applicant?.profile?.resumeOriginalName ||
                                            "No Resume Uploaded"}
                                    </a>
                                </TableCell>

                                <TableCell>
                                    {new Date(item?.createdAt).toLocaleDateString()}
                                </TableCell>

                                {/* ⭐ STATUS BADGE COLUMN */}
                                <TableCell>
                                    <StatusBadge status={currentStatus} />
                                </TableCell>

                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="cursor-pointer hover:text-indigo-500 transition" />
                                        </PopoverTrigger>

                                        <PopoverContent className="w-36 rounded-xl shadow-lg p-2">
                                            {shortlistingstatus.map((status, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() =>
                                                        currentStatus !== status &&
                                                        statusHandler(status, item._id)
                                                    }
                                                    className={`p-2 rounded-lg cursor-pointer transition text-sm
                          ${currentStatus === status
                                                            ? "opacity-50 cursor-not-allowed"
                                                            : "hover:bg-gray-100 dark:hover:bg-gray-800"
                                                        }`}
                                                >
                                                    Mark as {status}
                                                </div>
                                            ))}
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </motion.tr>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

export default ApplicantsTable;