// import React, { useEffect, useState } from 'react'
// import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
// import { Avatar, AvatarImage } from '../ui/avatar'
// import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
// import { Edit2, MoreHorizontal } from 'lucide-react'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'

// const CompaniesTable = () => {

//     const companies = useSelector(store => store.company?.companies) || [];
//     const { searchCompanyByText } = useSelector(store => store.company)
//     const [filterCompany, setFilterCompany] = useState(companies)
//     const navigate = useNavigate()
//     useEffect(() => {
//         const filteredCompany = companies.length >= 0 && companies.filter((company) => {
//             if (!searchCompanyByText) {
//                 return true
//             }
//             return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
//         })
//         setFilterCompany(filteredCompany);
//     }, [companies, searchCompanyByText]);

//     return (
//         <div>
//             <Table>
//                 <TableCaption>A list of your registered Comapanies</TableCaption>
//                 <TableHeader>
//                     <TableRow>
//                         <TableHead>Logo</TableHead>
//                         <TableHead>Name</TableHead>
//                         <TableHead>Date</TableHead>
//                         <TableHead className='text-right'>Action</TableHead>
//                     </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                     {
//                         companies.length <= 0 ? (
//                             <TableRow>
//                                 <TableCell colSpan={4} className="text-center">
//                                     You haven't registered any company yet.
//                                 </TableCell>
//                             </TableRow>
//                         ) : (
//                             filterCompany?.map((company) => (
//                                 <TableRow key={company._id}>
//                                     <TableCell>
//                                         <Avatar className="h-12 w-12 rounded-lg border border-gray-200 shadow-sm hover:scale-105 transition duration-200">
//                                             <AvatarImage
//                                                 src={
//                                                     company?.logo ||
//                                                     "https://previews.123rf.com/images/creativepriyanka/creativepriyanka2304/creativepriyanka230401424/202639665-icon-for-corporation-company.jpg"
//                                                 }
//                                             />
//                                         </Avatar>
//                                     </TableCell>

//                                     <TableCell>{company?.name}</TableCell>

//                                     <TableCell>
//                                         {company?.createdAt?.split("T")[0]}
//                                     </TableCell>

//                                     <TableCell className="text-right cursor-pointer">
//                                         <Popover>
//                                             <PopoverTrigger>
//                                                 <MoreHorizontal />
//                                             </PopoverTrigger>

//                                             <PopoverContent className="w-32">
//                                                 <div onClick={() => navigate(`/admin/companies/${company._id}`)}
//                                                 className="flex items-center gap-2 w-fit cursor-pointer">
//                                                     <Edit2 className="w-4" />
//                                                     <span>Edit</span>
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

// export default CompaniesTable



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
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CompaniesTable = () => {
  const companies =
    useSelector((store) => store.company?.companies) || [];

  const { searchCompanyByText } = useSelector((store) => store.company);

  const [filterCompany, setFilterCompany] = useState([]);

  const navigate = useNavigate();

  // ⭐ Optimized Filtering
  useEffect(() => {
    const filtered = companies.filter((company) => {
      if (!searchCompanyByText) return true;

      return company?.name
        ?.toLowerCase()
        .includes(searchCompanyByText.toLowerCase());
    });

    setFilterCompany(filtered);
  }, [companies, searchCompanyByText]);

  // ⭐ Highlight Search Match Text
  const highlightText = (text, highlight) => {
    if (!highlight) return text;

    const parts = text.split(new RegExp(`(${highlight})`, "gi"));

    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className="bg-yellow-200 dark:bg-yellow-500/40">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="w-full overflow-x-auto rounded-xl border dark:border-gray-700">
      <Table className="min-w-[600px]">

        <TableCaption className="pb-3">
          Registered companies directory
        </TableCaption>

        <TableHeader className="bg-indigo-50 dark:bg-gray-800">
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {companies.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                You haven't registered any company yet.
              </TableCell>
            </TableRow>
          ) : (
            filterCompany?.map((company, index) => (
              <motion.tr
                key={company._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-indigo-50 dark:hover:bg-gray-800 transition duration-200"
              >
                {/* Logo */}
                <TableCell className="py-4">
                  <Avatar className="h-14 w-14 object-cover rounded-lg border shadow-sm hover:scale-110 transition">
                    <AvatarImage
                      src={
                        company?.logo ||
                        "https://previews.123rf.com/images/creativepriyanka/creativepriyanka2304/creativepriyanka230401424/202639665-icon-for-corporation-company.jpg"
                      }
                    />
                  </Avatar>
                </TableCell>

                {/* Name */}
                <TableCell className="font-medium">
                  {highlightText(
                    company?.name || "",
                    searchCompanyByText
                  )}
                </TableCell>

                {/* Date */}
                <TableCell className="text-gray-500">
                  {company?.createdAt?.split("T")[0]}
                </TableCell>

                {/* Action */}
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer hover:text-indigo-500 transition" />
                    </PopoverTrigger>

                    <PopoverContent className="w-32 p-2 rounded-xl shadow-lg">
                      <div
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`)
                        }
                        className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg transition"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
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

export default CompaniesTable;