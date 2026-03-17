// import React, { useEffect, useState } from 'react'
// import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
// import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
// import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'

// const AdminJobsTable = () => {

//     const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
//     const [filterJobs, setFilterJobs] = useState(allAdminJobs)
//     const navigate = useNavigate()
//     useEffect(() => {
//         const filteredJob = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
//             if (!searchJobByText) {
//                 return true
//             }
//             return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
//         })
//         setFilterJobs(filteredJob);
//     }, [allAdminJobs, searchJobByText]);

//     return (
//         <div>
//             <Table>
//                 <TableCaption>A list of your posted jobs</TableCaption>
//                 <TableHeader>
//                     <TableRow>
//                         <TableHead>Company Name</TableHead>
//                         <TableHead>Role</TableHead>
//                         <TableHead>Date</TableHead>
//                         <TableHead className='text-right'>Action</TableHead>
//                     </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                     {
//                         filterJobs.length <= 0 ? (
//                             <TableRow>
//                                 <TableCell colSpan={4} className="text-center">
//                                     You haven't posted any job yet.
//                                 </TableCell>
//                             </TableRow>
//                         ) : (
//                             filterJobs?.map((job) => (
//                                 <TableRow key={job._id}>
//                                     <TableCell>{job?.company?.name}</TableCell>
//                                     <TableCell>{job?.title}</TableCell>
//                                     <TableCell>
//                                         {job?.createdAt?.split("T")[0]}
//                                     </TableCell>

//                                     <TableCell className="text-right cursor-pointer">
//                                         <Popover>
//                                             <PopoverTrigger>
//                                                 <MoreHorizontal />
//                                             </PopoverTrigger>

//                                             <PopoverContent className="w-32">
//                                                 <div onClick={() => navigate(`/admin/companies/${job._id}`)}
//                                                     className="flex items-center gap-2 w-fit cursor-pointer">
//                                                     <Edit2 className="w-4" />
//                                                     <span>Edit</span>
//                                                 </div>
//                                                 <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
//                                                     <Eye className='w-4'/>
//                                                     <span>Applicants</span>
//                                                 </div>
//                                             </PopoverContent>
//                                         </Popover>
//                                     </TableCell>
//                                 </TableRow>
//                             ))
//                         )
//                     }
//                 </TableBody>
//             </Table>
//         </div>
//     )
// }

// export default AdminJobsTable



import React, { useEffect, useState, useMemo } from "react";
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
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import deleteJob from "@/hooks/useDeleteJob.jsx";

const AdminJobsTable = () => {
  const { allAdminJobs = [], searchJobByText } = useSelector(
    (store) => store.job
  );

  const navigate = useNavigate();

  // 🔎 Optimized Filtering (useMemo prevents unnecessary recalculations)
  const filterJobs = useMemo(() => {
    if (!searchJobByText) return allAdminJobs;

    return allAdminJobs.filter((job) => {
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name
          ?.toLowerCase()
          .includes(searchJobByText.toLowerCase())
      );
    });
  }, [allAdminJobs, searchJobByText]);

  // ✨ Highlight search match
  const highlightText = (text) => {
    if (!searchJobByText) return text;

    const parts = text.split(
      new RegExp(`(${searchJobByText})`, "gi")
    );

    return parts.map((part, index) =>
      part.toLowerCase() === searchJobByText.toLowerCase() ? (
        <span
          key={index}
          className="bg-yellow-200 dark:bg-yellow-500/40 rounded px-1"
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-gray-100 dark:border-gray-700">
      <Table className="min-w-[650px]">
        <TableCaption className="py-4">
          A list of your posted jobs
        </TableCaption>

        <TableHeader className="bg-indigo-50 dark:bg-gray-800">
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterJobs.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center py-10 text-gray-500"
              >
                You haven't posted any job yet.
              </TableCell>
            </TableRow>
          ) : (
            filterJobs.map((job, index) => (
              <motion.tr
                key={job._id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.04 }}
                className="hover:bg-indigo-50 dark:hover:bg-gray-800 transition"
              >
                <TableCell className="font-medium">
                  {highlightText(job?.company?.name || "")}
                </TableCell>

                <TableCell>
                  {highlightText(job?.title || "")}
                </TableCell>

                <TableCell className="text-gray-500">
                  {job?.createdAt?.split("T")[0]}
                </TableCell>

                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer hover:text-indigo-500 transition" />
                    </PopoverTrigger>

                    <PopoverContent className="w-36 p-2 rounded-xl shadow-lg">
                      {/* panding  */}
                      <div
                        onClick={() => deleteJob(job._id)}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition"
                      >
                        <Edit2 className="w-4" />
                        <span>Delete</span>
                      </div>

                      <div
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                        className="flex items-center gap-2 p-2 mt-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition"
                      >
                        <Eye className="w-4" />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </motion.tr>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;