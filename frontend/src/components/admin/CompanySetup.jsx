// import React, { useEffect, useState } from 'react'
// import Navbar from '../shared/Navbar.jsx'
// import { Button } from '../ui/button'
// import { ArrowLeft, Loader2 } from 'lucide-react'
// import { Input } from '../ui/input'
// import { Label } from '../ui/label'
// import axios from 'axios'
// import { COMPANY_API_END_POINT } from '@/utils/constant.js'
// import { useNavigate, useParams } from 'react-router-dom'
// import { toast } from 'sonner'
// import { useSelector } from 'react-redux'
// import useGetCompanyById from '@/hooks/useGetCompanyById.jsx'

// const CompanySetup = () => {
//     const parmas = useParams(); // company Id
//     useGetCompanyById(parmas.id)

//     const [input, setInput] = useState({
//         name: '',
//         description: '',
//         website: '',
//         location: '',
//         file: null
//     })

//     const { singleCompany } = useSelector(store => store.company)
//     const [loading, setLoading] = useState(false)

//     const navigate = useNavigate()

//     const changeEventHandler = (e) => {
//         setInput({
//             ...input,
//             [e.target.name]: e.target.value
//         })
//     }

//     const changeFileHandler = (e) => {
//         const file = e.target.files?.[0];
//         setInput({ ...input, file })
//     }


//     //
//     const submitHandler = async (e) => {
//         e.preventDefault();
//         // console.log(input)
//         const formData = new FormData();
//         formData.append('name', input.name)
//         formData.append('description', input.description)
//         formData.append('website', input.website)
//         formData.append('location', input.location)
//         if (input.file) {
//             formData.append('file', input.file)
//         }

//         try {
//             setLoading(true)
//             const res = await axios.put(`${COMPANY_API_END_POINT}/update/${parmas.id}`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 },
//                 withCredentials: true
//             });

//             if (res.data.success) {
//                 toast.success(res.data.message);
//                 navigate('/admin/companies')
//             }
//         } catch (error) {
//             console.error(error)
//             toast.error(error.response.data.message)
//         }
//         finally {
//             setLoading(false)
//         }

//     }

//     useEffect(() => {
//         setInput({
//             name: singleCompany.name || '',
//             description: singleCompany.description || '',
//             website: singleCompany.website || '',
//             location: singleCompany.location || '',
//             file: singleCompany.file || null
//         })
//     }, [singleCompany])
//     return (
//         <div>
//             <Navbar />
//             <div className='max-w-xl mx-auto my-10'>
//                 <form onSubmit={submitHandler}>
//                     <div className='flex items-center gap-5 p-8'>
//                         <Button onClick={() => navigate('/admin/companies')} variant='outline' className='flex items-center gap-2 text-gray-500 font-medium'>
//                             <ArrowLeft />
//                             <span>Back</span>
//                         </Button>
//                         <h1 className='font-bold text-xl'>Company Setup</h1>
//                     </div>

//                     <div className='grid grid-cols-2 gap-8'>
//                         <div>
//                             <Label>Company Name</Label>
//                             <Input
//                                 type='text'
//                                 name="name"
//                                 value={input.name}
//                                 onChange={changeEventHandler}
//                             />
//                         </div>
//                         <div>
//                             <Label>Description</Label>
//                             <Input
//                                 type='text'
//                                 name="description"
//                                 value={input.description}
//                                 onChange={changeEventHandler}
//                             />
//                         </div>
//                         <div>
//                             <Label>Website</Label>
//                             <Input
//                                 type='text'
//                                 name="website"
//                                 value={input.website}
//                                 onChange={changeEventHandler}
//                             />
//                         </div>
//                         <div>
//                             <Label>Location</Label>
//                             <Input
//                                 type='text'
//                                 name="location"
//                                 value={input.location}
//                                 onChange={changeEventHandler}
//                             />
//                         </div>
//                         <div>
//                             <Label>Logo</Label>
//                             <Input
//                                 type='file'
//                                 accept='image/*'
//                                 onChange={changeFileHandler}
//                             />
//                         </div>
//                     </div>
//                     {
//                         loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Loading... </Button>
//                             : <Button type="submit" className="w-full my-4">Update</Button>
//                     }
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default CompanySetup




import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar.jsx";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2, Upload } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant.js";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById.jsx";
import { motion } from "framer-motion";

const CompanySetup = () => {
  const parmas = useParams();
  useGetCompanyById(parmas.id);

  const { singleCompany } = useSelector((store) => store.company);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ⭐ Input Change Handler
  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  // ⭐ File Handler + Preview
  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setInput({ ...input, file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // ⭐ Submit Form
  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);

    if (input.file) {
      formData.append("file", input.file);
    }
    
    console.log(input)



    try {
      setLoading(true);

      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${parmas.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log(res.data);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  // ⭐ Load Company Data
  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: null,
      });

      setPreview(singleCompany.logo || null);
    }
  }, [singleCompany]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl mx-auto my-12 p-6 md:p-10 bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700"
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={() => navigate("/admin/companies")}
            variant="outline"
            className="flex items-center gap-2 text-gray-500 hover:text-indigo-500 transition rounded-xl"
          >
            <ArrowLeft size={18} />
            Back
          </Button>

          <h1 className="font-bold text-2xl">Company Setup</h1>
        </div>

        <form onSubmit={submitHandler} className="space-y-6">
          {/* Logo Upload */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <img
                src={
                  preview ||
                  "https://thumbs.dreamstime.com/b/building-logo-icon-abstract-design-real-estate-property-housing-hotel-agency-isolated-black-background-building-logo-155063439.jpg"
                }
                className="h-28 w-28 rounded-2xl object-cover border shadow-lg group-hover:scale-105 transition"
                alt="logo"
              />

              <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition cursor-pointer rounded-2xl">
                <Upload className="text-white" />

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={changeFileHandler}
                />
              </label>
            </div>

            <p className="text-xs text-gray-500">
              Click logo to upload company image
            </p>
          </div>

          {/* Grid Inputs */}
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              ["Company Name", "name"],
              ["Description", "description"],
              ["Website", "website"],
              ["Location", "location"],
            ].map(([label, name]) => (
              <div key={name}>
                <Label>{label}</Label>
                <Input
                  name={name}
                  value={input[name]}
                  onChange={changeEventHandler}
                  className="rounded-xl focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            ))}
          </div>

          {/* Submit Button */}
          {loading ? (
            <Button className="w-full rounded-xl">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full rounded-xl hover:scale-105 transition-all duration-200"
            >
              Update Company
            </Button>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default CompanySetup;