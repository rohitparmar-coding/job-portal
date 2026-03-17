// import React, { useState } from 'react'
// import Navbar from './shared/Navbar.jsx'
// import { Avatar, AvatarImage } from './ui/avatar'
// import { Button } from './ui/button.jsx'
// import { Contact, Mail, Pen } from 'lucide-react'
// import { Badge } from './ui/badge.jsx'
// import { Label } from './ui/label.jsx'
// import AppliedJobTable from './AppliedJobTable.jsx'
// import UpdateProfileDialog from './UpdateProfileDialog.jsx'
// import { useSelector } from 'react-redux'
// import useGetAppliedJobs from '@/hooks/useGetAppliedJobs.jsx'


// // const skills = ["HTML", "css", "JavaScript", "ReactJS"]
// const isResume = true;

// const Profile = () => {
//   useGetAppliedJobs()
//   const [open, setOpen] = useState(false);
//   const { user } = useSelector(store => store.auth)

//   return (
//     <div>
//       <Navbar />
//       <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
//         <div className='flex justify-between'>
//           <div className='flex items-center gap-4'>
//             <Avatar className='h-24 w-24'>
//               <AvatarImage src={user?.profile?.profilePhoto
//                 ? (user?.profile?.profilePhoto)
//                 : 'https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg'} alt="@shadcn" />
//             </Avatar>
//             <div>
//               <h1 className='font-medium text-xl'>{user?.fullname}</h1>
//               <p>{user?.profile?.bio}</p>
//             </div>
//           </div>
//           <Button
//             className='text-right'
//             variant='outline'
//             onClick={() => setOpen(true)}>
//             <Pen />
//           </Button>
//         </div>

//         <div className='my-5'>
//           <div className='flex items-center gap-3 my-2'>
//             <Mail />
//             <span>{user?.email}</span>
//           </div>
//           <div className='flex items-center gap-3 my-2'>
//             <Contact />
//             <span>{user?.phoneNumber}</span>
//           </div>
//         </div>

//         <div>
//           <h1>Skills</h1>
//           <div className='flex items-center gap-1'>
//             {
//               user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index} >{item}</Badge>)
//                 : <span className='text-red-600'>NA...</span>
//             }
//           </div>
//         </div>
//         <div className='grid w-full max-w-sm items-center gap-1.5'>
//           <Label className='text-md font-bold'>Resume</Label>
//           <div>
//             {
//               isResume ? <a href={user?.profile?.resume} target='blank' className='text-blue-600 w-full cursor-pointer hover:underline'>{user?.profile?.resumeOriginalName}</a>
//                 : <span>No Resume UpLoaded</span>
//             }
//           </div>
//         </div>
//       </div>
//       <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
//         <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
//         <AppliedJobTable />
//       </div>

//       <UpdateProfileDialog open={open} setOpen={setOpen} />
//     </div>
//   )
// }

// export default Profile




import React, { useState } from "react";
import Navbar from "./shared/Navbar.jsx";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button.jsx";
import { Contact, Mail, Pen, FileText } from "lucide-react";
import { Badge } from "./ui/badge.jsx";
import AppliedJobTable from "./AppliedJobTable.jsx";
import UpdateProfileDialog from "./UpdateProfileDialog.jsx";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs.jsx";
import { motion } from "framer-motion";
import Footer from "./shared/Footer.jsx";

const Profile = () => {
  useGetAppliedJobs();

  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const skills = user?.profile?.skills || [];
  const hasResume = !!user?.profile?.resume;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Cover Section */}
      <div className="relative">
        <div className="h-48 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl px-8 pb-8 relative -mt-16"
        >
          {/* Avatar */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
            {/*  */}
            <div className="flex flex-col items-center md:flex-row md:items-end gap-4 md:gap-6 text-center md:text-left">
              <Avatar className=" h-28 w-28 sm:h-32 sm:w-32  sm:items-center border-4 border-white shadow-lg -mt-16">
                <AvatarImage
                  className={'object-cover'}
                  src={
                    user?.profile?.profilePhoto ||
                    "https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg"
                  }
                />
              </Avatar>

              <div className="mt-6 md:mt-0">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                  {user?.fullname}
                </h1>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">
                  {user?.profile?.bio || "No bio added"}
                </p>
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <Button
                variant="outline"
                onClick={() => setOpen(true)}
                className="hover:scale-105 transition"
              >
                <Pen className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-6 grid md:grid-cols-2 gap-4 text-gray-700">
            <div className="flex items-center gap-3">
              <Mail className="text-indigo-500" />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Contact className="text-indigo-500" />
              <span>{user?.phoneNumber || "Not Provided"}</span>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.length > 0 ? (
                skills.map((skill, index) => (
                  <Badge
                    key={index}
                    className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition"
                  >
                    {skill}
                  </Badge>
                ))
              ) : (
                <span className="text-gray-500">No skills added</span>
              )}
            </div>
          </div>

          {/* Resume */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <FileText className="text-indigo-500" />
              Resume
            </h2>

            {hasResume ? (
              <a
                href={user?.profile?.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline font-medium"
              >
                {user?.profile?.resumeOriginalName}
              </a>
            ) : (
              <span className="text-gray-500">No Resume Uploaded</span>
            )}
          </div>
        </motion.div>
      </div>

      {/* Applied Jobs Section */}
      {
        user && user.role === 'recruiter' ? (<></>) : (
          <div className="max-w-5xl mx-auto mt-8 bg-white rounded-2xl shadow-lg p-6">
            <h1 className="text-xl font-bold mb-4">Applied Jobs</h1>
            <AppliedJobTable />
          </div>
        )
      }


      <UpdateProfileDialog open={open} setOpen={setOpen} />

      <Footer/>
    </div>
  );
};

export default Profile;