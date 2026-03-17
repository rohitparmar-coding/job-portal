// import React, { useState } from 'react'
// import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
// import { Label } from './ui/label'
// import { Input } from './ui/input'
// import { Button } from './ui/button'
// import { useDispatch, useSelector } from 'react-redux'
// import axios from 'axios'
// import { USER_API_END_POINT } from '@/utils/constant.js'
// import { toast } from 'sonner'
// import { setUser } from '@/redux/authSlice.js'
// import { Loader2 } from 'lucide-react'

// const UpdateProfileDialog = ({ open, setOpen }) => {

//     const [loading, setLoading] = useState(false)
//     const { user } = useSelector(store => store.auth)
//     const dispatch = useDispatch()

//     const [input, setInput] = useState({
//         fullname: user?.fullname || "",
//         email: user?.email || "",
//         phoneNumber: user?.phoneNumber || "",
//         bio: user?.profile?.bio || "",
//         skills: user?.profile?.skills?.join(", ") || "",
//         file: "",
//         file1: ""
//     });

//     const changeEventHandler = (e) => {
//         setInput({
//             ...input,
//             [e.target.name]: e.target.value
//         })
//     }

//     // for file 
//     const fileChangeHandler = (e) => {
//         const file = e.target.files?.[0];

//         setInput({
//             ...input,
//             [e.target.name]: file   // ✅ dynamic
//         });
//     };


//     const submitHandler = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append("fullname", input.fullname);
//         formData.append("email", input.email);
//         formData.append("phoneNumber", input.phoneNumber);
//         formData.append("bio", input.bio);
//         formData.append("skills", input.skills);

//         if (input.file) {
//             formData.append("file", input.file);
//         }
//         if(input.file1){
//             formData.append('file1', input.file1)
//         }

//         try {
//             setLoading(true);
//             const res = await axios.post(
//                 `${USER_API_END_POINT}/api/v1/user/profile/update`,
//                 formData, {
//                 headers: {
//                     "Content-Type": "multipart/form-data"
//                 },
//                 withCredentials: true
//             }
//             );

//             if (res.data.success) {
//                 dispatch(setUser(res.data.user))
//                 toast.success(res.data.message);
//             }
//         } catch (error) {
//             console.log(error)
//             toast.error(error.response?.data?.message);
//         }
//         finally {
//             setLoading(false);
//             setOpen(false)
//         }

//         console.log(input)
//     }

//     return (
//         <div>
//             <Dialog open={open}>
//                 <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
//                     <DialogHeader>
//                         <DialogTitle>Update Profile</DialogTitle>
//                     </DialogHeader>
//                     <form onSubmit={submitHandler}>
//                         <div className='grid gap-4 py-4'>
//                             <div className='grid grid-cols-4 items-center gap-4'>
//                                 <Label htmlFor="fullname" className="text-right">Name</Label>
//                                 <Input
//                                     id="fullname"
//                                     name="fullname"
//                                     type="text"
//                                     value={input.fullname}
//                                     onChange={changeEventHandler}
//                                     className="col-span-3"
//                                 />
//                             </div>
//                             <div className='grid grid-cols-4 items-center gap-4'>
//                                 <Label htmlFor="email" className="text-right">Email</Label>
//                                 <Input
//                                     id="email"
//                                     name="email"
//                                     type="email"
//                                     value={input.email}
//                                     onChange={changeEventHandler}
//                                     className="col-span-3"
//                                 />
//                             </div>
//                             <div className='grid grid-cols-4 items-center gap-4'>
//                                 <Label htmlFor="phoneNumber" className="text-right">Number</Label>
//                                 <Input
//                                     id="phoneNumber"
//                                     name="phoneNumber"
//                                     value={input.phoneNumber}
//                                     onChange={changeEventHandler}
//                                     className="col-span-3"
//                                 />
//                             </div>
//                             <div className='grid grid-cols-4 items-center gap-4'>
//                                 <Label htmlFor="bio" className="text-right">Bio</Label>
//                                 <Input
//                                     id="bio"
//                                     name="bio"
//                                     value={input.bio}
//                                     onChange={changeEventHandler}
//                                     className="col-span-3"
//                                 />
//                             </div>
//                             <div className='grid grid-cols-4 items-center gap-4'>
//                                 <Label htmlFor="skills" className="text-right">Skills</Label>
//                                 <Input
//                                     id="skills"
//                                     name="skills"
//                                     value={input.skills}
//                                     onChange={changeEventHandler}
//                                     className="col-span-3"
//                                 />
//                             </div>
//                             <div className='grid grid-cols-4 items-center gap-4'>
//                                 <Label htmlFor="file" className="text-right">Resume</Label>
//                                 <Input
//                                     id="file"
//                                     name="file"
//                                     type="file"
//                                     accept="application/pdf"
//                                     onChange={fileChangeHandler}
//                                     className="col-span-3"
//                                 />
//                             </div>
//                             <div className='grid grid-cols-4 items-center gap-4'>
//                                 <Label htmlFor="file1" className="text-right">Profile Image</Label>
//                                 <Input
//                                     id="file1"
//                                     name="file1"
//                                     type="file"
//                                     accept="image/*"
//                                     onChange={fileChangeHandler}
//                                     className="col-span-3"
//                                 />
//                             </div>
//                         </div>
//                         <DialogFooter>
//                             {
//                                 loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Update</Button>
//                             }
//                         </DialogFooter>
//                     </form>
//                 </DialogContent>
//             </Dialog>
//         </div>
//     )
// }
// export default UpdateProfileDialog




import React, { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant.js";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice.js";
import { Loader2, Upload, Camera } from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  fullname: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  phoneNumber: z.string().min(10, "Invalid phone number"),
  bio: z.string().optional(),
  skills: z.string().optional(),
});

const UpdateProfileDialog = ({ open, setOpen }) => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [resume, setResumeFile] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(user?.profile?.profilePhoto);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullname: user?.fullname || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      bio: user?.profile?.bio || "",
      skills: user?.profile?.skills?.join(", ") || "",
    },
  });

  // Profile Completion %
  const fields = watch();

  const completion = useMemo(() => {
    const total = Object.keys(fields).length;
    const filled = Object.values(fields).filter((v) => v).length;
    return Math.round((filled / total) * 100);
  }, [fields]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));

    if (resume) formData.append("resume", resume);
    if (profileImage) formData.append("profileImage", profileImage);

    try {
      setLoading(true);

      const res = await axios.post(
        `${USER_API_END_POINT}/api/v1/user/profile/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success("Profile Updated Successfully 🚀");
        setOpen(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  // return (
  //   <Dialog open={open} onOpenChange={setOpen}>
  //     <DialogContent className="sm:max-w-[650px] bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-0 shadow-2xl rounded-3xl">
  //       <DialogHeader>
  //         <DialogTitle className="text-2xl font-bold">
  //           Edit Profile
  //         </DialogTitle>
  //       </DialogHeader>

  //       <motion.form
  //         onSubmit={handleSubmit(onSubmit)}
  //         initial={{ opacity: 0, y: 20 }}
  //         animate={{ opacity: 1, y: 0 }}
  //         className="space-y-6"
  //       >
  //         {/* Profile Completion */}
  //         <div>
  //           <div className="flex justify-between text-sm mb-1">
  //             <span>Profile Completion</span>
  //             <span>{completion}%</span>
  //           </div>
  //           <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
  //             <div
  //               className="bg-indigo-500 h-2 rounded-full transition-all"
  //               style={{ width: `${completion}%` }}
  //             />
  //           </div>
  //         </div>

  //         {/* Avatar with Hover Edit */}
  //         <div className="flex justify-center">
  //           <div className="relative group">
  //             <img
  //               src={
  //                 preview ||
  //                 "https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg"
  //               }
  //               className="h-28 w-28 rounded-full object-cover border-4 border-indigo-300 shadow-lg"
  //               alt="profile"
  //             />
  //             <label className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer">
  //               <Camera className="text-white" />
  //               <input
  //                 type="file"
  //                 accept="image/*"
  //                 hidden
  //                 onChange={(e) => {
  //                   const file = e.target.files[0];
  //                   setProfileImage(file);
  //                   setPreview(URL.createObjectURL(file));
  //                 }}
  //               />
  //             </label>
  //           </div>
  //         </div>

  //         {/* Inputs */}
  //         <div className="grid md:grid-cols-2 gap-4">
  //           <div>
  //             <Label>Full Name</Label>
  //             <Input {...register("fullname")} />
  //             {errors.fullname && (
  //               <p className="text-red-500 text-xs">
  //                 {errors.fullname.message}
  //               </p>
  //             )}
  //           </div>

  //           <div>
  //             <Label>Email</Label>
  //             <Input {...register("email")} />
  //             {errors.email && (
  //               <p className="text-red-500 text-xs">
  //                 {errors.email.message}
  //               </p>
  //             )}
  //           </div>

  //           <div>
  //             <Label>Phone</Label>
  //             <Input {...register("phoneNumber")} />
  //             {errors.phoneNumber && (
  //               <p className="text-red-500 text-xs">
  //                 {errors.phoneNumber.message}
  //               </p>
  //             )}
  //           </div>

  //           <div>
  //             <Label>Skills</Label>
  //             <Input {...register("skills")} />
  //           </div>
  //         </div>

  //         <div>
  //           <Label>Bio</Label>
  //           <Input {...register("bio")} />
  //         </div>

  //         {/* Drag & Drop Resume */}
  //         <div
  //           onDragOver={(e) => e.preventDefault()}
  //           onDrop={(e) => {
  //             e.preventDefault();
  //             setResumeFile(e.dataTransfer.files[0]);
  //           }}
  //           className="border-2 border-dashed border-indigo-400 rounded-xl p-6 text-center cursor-pointer hover:bg-indigo-50 dark:hover:bg-gray-800 transition"
  //         >
  //           <Upload className="mx-auto mb-2 text-indigo-500" />
  //           <p className="text-sm">
  //             Drag & drop resume here or click to upload
  //           </p>
  //           <input
  //             type="file"
  //             accept="application/pdf"
  //             hidden
  //             onChange={(e) => setResumeFile(e.target.files[0])}
  //           />
  //           {resume && (
  //             <p className="text-xs mt-2 text-green-600">
  //               {resume.name}
  //             </p>
  //           )}
  //         </div>

  //         <Button
  //           type="submit"
  //           disabled={loading}
  //           className="w-full rounded-xl hover:scale-105 transition-all"
  //         >
  //           {loading ? (
  //             <>
  //               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  //               Updating...
  //             </>
  //           ) : (
  //             "Update Profile"
  //           )}
  //         </Button>
  //       </motion.form>
  //     </DialogContent>
  //   </Dialog>
  // );

return (
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent
      className="
        w-[95%] 
        max-w-[95%] 
        sm:max-w-[500px] 
        md:max-w-[650px] 
        lg:max-w-[750px]
        max-h-[90vh]
        overflow-y-auto
        bg-white/70 
        dark:bg-gray-900/70 
        backdrop-blur-xl 
        border-0 
        shadow-2xl 
        rounded-2xl 
        sm:rounded-3xl
        p-4 
        sm:p-6 
        md:p-8
      "
    >
      <DialogHeader>
        <DialogTitle className="text-xl sm:text-2xl font-bold text-center sm:text-left">
          Edit Profile
        </DialogTitle>
      </DialogHeader>

      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-5 sm:space-y-6"
      >
        {/* Profile Completion */}
        <div>
          <div className="flex justify-between text-xs sm:text-sm mb-1">
            <span>Profile Completion</span>
            <span>{completion}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
            <div
              className="bg-indigo-500 h-2 rounded-full transition-all"
              style={{ width: `${completion}%` }}
            />
          </div>
        </div>

        {/* Avatar */}
        <div className="flex justify-center">
          <div className="relative group">
            <img
              src={
                preview ||
                "https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg"
              }
              className="
                h-20 w-20 
                sm:h-24 sm:w-24 
                md:h-28 md:w-28
                rounded-full 
                object-cover 
                border-4 
                border-indigo-300 
                shadow-lg
              "
              alt="profile"
            />
            <label className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer">
              <Camera className="text-white w-5 h-5 sm:w-6 sm:h-6" />
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  setProfileImage(file);
                  setPreview(URL.createObjectURL(file));
                }}
              />
            </label>
          </div>
        </div>

        {/* Inputs */}
        <div
          className="
            grid 
            grid-cols-1 
            sm:grid-cols-1 
            md:grid-cols-2 
            gap-4
          "
        >
          <div>
            <Label className="text-sm">Full Name</Label>
            <Input {...register("fullname")} />
            {errors.fullname && (
              <p className="text-red-500 text-xs">
                {errors.fullname.message}
              </p>
            )}
          </div>

          <div>
            <Label className="text-sm">Email</Label>
            <Input {...register("email")} />
            {errors.email && (
              <p className="text-red-500 text-xs">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label className="text-sm">Phone</Label>
            <Input {...register("phoneNumber")} />
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          <div>
            <Label className="text-sm">Skills</Label>
            <Input {...register("skills")} />
          </div>
        </div>

        {/* Bio */}
        <div>
          <Label className="text-sm">Bio</Label>
          <Input {...register("bio")} />
        </div>

        {/* Resume Upload */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            setResumeFile(e.dataTransfer.files[0]);
          }}
          className="
            border-2 
            border-dashed 
            border-indigo-400 
            rounded-xl 
            p-4 
            sm:p-6 
            text-center 
            cursor-pointer 
            hover:bg-indigo-50 
            dark:hover:bg-gray-800 
            transition
          "
        >
          <Upload className="mx-auto mb-2 text-indigo-500 w-5 h-5 sm:w-6 sm:h-6" />
          <p className="text-xs sm:text-sm">
            Drag & drop resume here or click to upload
          </p>

          <input
            type="file"
            accept="application/pdf"
            hidden
            onChange={(e) => setResumeFile(e.target.files[0])}
          />

          {resume && (
            <p className="text-xs mt-2 text-green-600 break-all">
              {resume.name}
            </p>
          )}
        </div>

        {/* Button */}
        <Button
          type="submit"
          disabled={loading}
          className="
            w-full 
            rounded-xl 
            py-2 
            sm:py-3 
            text-sm 
            sm:text-base
            hover:scale-105 
            transition-all
          "
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            "Update Profile"
          )}
        </Button>
      </motion.form>
    </DialogContent>
  </Dialog>
);
};

export default UpdateProfileDialog;