// import React from 'react'
// import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
// import { Badge } from './ui/badge'
// import { useSelector } from 'react-redux'

// const AppliedJobTable = () => {

//   const { allAppliedJobs } = useSelector((store) => store.job);

//   return (
//     <div>
//       <Table>
//         <TableCaption>A list of your applied jobs</TableCaption>

//         <TableHeader>
//           <TableRow>
//             <TableHead>Date</TableHead>
//             <TableHead>Job Role</TableHead>
//             <TableHead>Company</TableHead>
//             <TableHead className="text-right">Status</TableHead>
//           </TableRow>
//         </TableHeader>

//         <TableBody>
//           {allAppliedJobs?.length === 0 ? (
//             <TableRow>
//               <TableCell colSpan={4} className="text-center">
//                 No applied jobs found
//               </TableCell>
//             </TableRow>
//           ) : (
//             allAppliedJobs?.map((job) => (
//               <TableRow key={job?._id}>
//                 <TableCell>
//                   {new Date(job?.createdAt).toLocaleDateString()}
//                 </TableCell>
//                 <TableCell>{job?.job?.title}</TableCell>
//                 <TableCell>{job?.job?.company?.name}</TableCell>
//                 <TableCell className="text-right">
//                   <Badge>{job?.status}</Badge>
//                 </TableCell>
//               </TableRow>
//             ))
//           )}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default AppliedJobTable


import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const statusColor = {
  pending: "bg-blue-100 text-blue-600 border-blue-300",
  accepted: "bg-green-100 text-green-600 border-green-300",
  rejected: "bg-red-100 text-red-600 border-red-300",
};

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-gradient-to-br from-white/80 to-indigo-50/40 dark:from-gray-900 dark:to-gray-800 
      backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-4 md:p-6"
    >
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        📄 Applied Jobs
      </h2>

      {/* Responsive Table Wrapper */}
      <div className="w-full overflow-x-auto rounded-xl border dark:border-gray-700">
        <Table className="min-w-[600px]">
          <TableCaption className="pb-2">
            Your job application history
          </TableCaption>

          <TableHeader className="bg-indigo-50 dark:bg-gray-800">
            <TableRow>
              <TableHead className="font-semibold">Date</TableHead>
              <TableHead className="font-semibold">Job Role</TableHead>
              <TableHead className="font-semibold">Company</TableHead>
              <TableHead className="text-right font-semibold">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {allAppliedJobs?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-8 text-gray-500"
                >
                  No applied jobs found
                </TableCell>
              </TableRow>
            ) : (
              allAppliedJobs?.map((job, index) => (
                <motion.tr
                  key={job?._id || index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-indigo-50 dark:hover:bg-gray-800 transition-all duration-200"
                >
                  <TableCell className="py-4">
                    {new Date(job?.createdAt).toLocaleDateString()}
                  </TableCell>

                  <TableCell className="font-medium">
                    {job?.job?.title}
                  </TableCell>

                  <TableCell className="text-gray-600 dark:text-gray-300">
                    {job?.job?.company?.name}
                  </TableCell>

                  <TableCell className="text-right">
                    {(() => {
                      const status = job?.status?.toLowerCase() || "pending";
                      const color =
                        statusColor[status] ||
                        "bg-gray-100 text-gray-600 border-gray-300";

                      return (
                        <Badge
                          className={`capitalize border rounded-full px-3 py-1 text-xs md:text-sm ${color}`}
                        >
                          {status}
                        </Badge>
                      );
                    })()}
                  </TableCell>
                </motion.tr>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
};

export default AppliedJobTable;