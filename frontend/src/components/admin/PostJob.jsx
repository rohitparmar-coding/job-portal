// import React, { useState } from 'react'
// import Navbar from '../shared/Navbar.jsx'
// import { Label } from '../ui/label'
// import { Input } from '../ui/input'
// import { Button } from '../ui/button'
// import { useSelector } from 'react-redux'
// import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select.jsx'
// import axios from 'axios'
// import { JOB_API_END_POINT } from '@/utils/constant.js'
// import { toast } from 'sonner'
// import { useNavigate } from 'react-router-dom'
// import { Loader2 } from 'lucide-react'



// const PostJob = () => {

//     const [loading, setLoading] = useState(false)
//     const [input, setInput] = useState({
//         title: "",
//         description: "",
//         requirements: "",
//         location: "",
//         salary: "",
//         jobType: "",
//         experience: "",
//         position: 0,
//         companyId: ""
//     });

//     const { companies } = useSelector(store => store.company)
//     const navigate = useNavigate()

//     const chanageEventHandler = (e) => {
//         setInput({
//             ...input,
//             [e.target.name]: e.target.value
//         })
//     }

//     const selectChangeHandler = (value) =>{
//         const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
//         setInput({ ...input, companyId:selectedCompany._id})
//     }

//     const submitHandler = async (e) =>{
//         e.preventDefault()
//         // console.log(input);
//         try{
//             setLoading(true)
//             const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
//                 headers:{
//                     'Content-Type':'application/json'
//                 },
//                 withCredentials:true
//             } )
//             if(res.data.success){
//                 toast.success(res.data.message);
//                 navigate('/admin/jobs')
//             }
//         }catch(error){
//             console.log(error)
//             toast.error(error.response.data.message)
//         }
//         finally{
//             setLoading(false);
//         }
//     }

//     return (
//         <div>
//             <Navbar />
//             <div className='flex items-center justify-center w-screen my-5'>
//                 <form onSubmit={submitHandler} className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md'>
//                     <div className='grid grid-cols-2 gap-2'>
//                         <div>
//                             <Label>Title</Label>
//                             <Input
//                                 type='text'
//                                 name='title'
//                                 value={input.title}
//                                 onChange={chanageEventHandler}
//                                 className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
//                             />
//                         </div>
//                         <div>
//                             <Label>Description</Label>
//                             <Input
//                                 type='text'
//                                 name='description'
//                                 value={input.description}
//                                 onChange={chanageEventHandler}
//                                 className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
//                             />
//                         </div>
//                         <div>
//                             <Label>Requirements</Label>
//                             <Input
//                                 type='text'
//                                 name='requirements'
//                                 value={input.requirements}
//                                 onChange={chanageEventHandler}
//                                 className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
//                             />
//                         </div>
//                         <div>
//                             <Label>Salary</Label>
//                             <Input
//                                 type='text'
//                                 name='salary'
//                                 value={input.salary}
//                                 onChange={chanageEventHandler}
//                                 className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
//                             />
//                         </div>
//                         <div>
//                             <Label>Location</Label>
//                             <Input
//                                 type='text'
//                                 name='location'
//                                 value={input.location}
//                                 onChange={chanageEventHandler}
//                                 className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
//                             />
//                         </div>
//                         <div>
//                             <Label>Job Type</Label>
//                             <Input
//                                 type='text'
//                                 name='jobType'
//                                 value={input.jobType}
//                                 onChange={chanageEventHandler}
//                                 className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
//                             />
//                         </div>
//                         <div>
//                             <Label>Experience</Label>
//                             <Input
//                                 type='text'
//                                 name='experience'
//                                 value={input.experience}
//                                 onChange={chanageEventHandler}
//                                 className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
//                             />
//                         </div>
//                         <div>
//                             <Label>No of Position</Label>
//                             <Input
//                                 type='number'
//                                 name='position'
//                                 value={input.position}
//                                 onChange={chanageEventHandler}
//                                 className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
//                             />
//                         </div>
//                         {companies?.length > 0 && (
//                             <Select onValueChange={selectChangeHandler}>
//                                 <SelectTrigger className="w-64">
//                                     <SelectValue placeholder="Select a Company" />
//                                 </SelectTrigger>

//                                 <SelectContent>
//                                     <SelectGroup>
//                                         {companies.map((company) => (
//                                             <SelectItem
//                                                 key={company?._id}
//                                                 value={company?.name?.toLowerCase()}   // ⚠️ Important
//                                             >
//                                                 {company?.name}
//                                             </SelectItem>
//                                         ))}
//                                     </SelectGroup>
//                                 </SelectContent>
//                             </Select>
//                         )}
//                     </div>
//                      {
//                         loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Loading... </Button>
//                             : <Button type="submit" className="w-full my-4">Post New Job</Button>
//                     }
//                     {
//                         companies.length === 0 && <p className='text-sm text-red-600 text-center'>Please register a company first, before posting job.</p>
//                     }
//                 </form>

//             </div>
//         </div>
//     )
// }

// export default PostJob





import React, { useState } from "react"
import Navbar from "../shared/Navbar.jsx"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useSelector } from "react-redux"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select.jsx"
import axios from "axios"
import { JOB_API_END_POINT } from "@/utils/constant.js"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"

const PostJob = () => {
  const [loading, setLoading] = useState(false)

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    salary: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  })

  const { companies } = useSelector((store) => store.company)
  const navigate = useNavigate()

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
  }

  // ✅ improved: use _id directly
  const selectChangeHandler = (value) => {
    setInput({ ...input, companyId: value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      const res = await axios.post(
        `${JOB_API_END_POINT}/post`,
        input,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )

      if (res.data.success) {
        toast.success(res.data.message)
        navigate("/admin/jobs")
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800">
            Create New Job
          </h1>
          <p className="text-gray-500 mt-2">
            Add job details and publish to attract candidates.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-2xl rounded-3xl p-6 sm:p-10 border border-gray-100"
        >
          <form onSubmit={submitHandler} className="space-y-8">

            {/* Responsive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Title */}
              <div className="space-y-2">
                <Label>Job Title</Label>
                <Input
                  name="title"
                  value={input.title}
                  onChange={changeEventHandler}
                  placeholder="Frontend Developer"
                  className="h-12 rounded-xl focus:ring-2 focus:ring-black"
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                  placeholder="Bangalore"
                  className="h-12 rounded-xl focus:ring-2 focus:ring-black"
                />
              </div>

              {/* Description */}
              <div className="space-y-2 md:col-span-2">
                <Label>Description</Label>
                <Input
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  placeholder="Brief job description"
                  className="h-12 rounded-xl focus:ring-2 focus:ring-black"
                />
              </div>

              {/* Requirements */}
              <div className="space-y-2 md:col-span-2">
                <Label>Requirements (comma separated)</Label>
                <Input
                  name="requirements"
                  value={input.requirements}
                  onChange={changeEventHandler}
                  placeholder="React, Node.js, MongoDB"
                  className="h-12 rounded-xl focus:ring-2 focus:ring-black"
                />
              </div>

              {/* Salary */}
              <div className="space-y-2">
                <Label>Salary</Label>
                <Input
                  name="salary"
                  value={input.salary}
                  onChange={changeEventHandler}
                  placeholder="600000"
                  className="h-12 rounded-xl focus:ring-2 focus:ring-black"
                />
              </div>

              {/* Job Type */}
              <div className="space-y-2">
                <Label>Job Type</Label>
                <Input
                  name="jobType"
                  value={input.jobType}
                  onChange={changeEventHandler}
                  placeholder="Full-time"
                  className="h-12 rounded-xl focus:ring-2 focus:ring-black"
                />
              </div>

              {/* Experience */}
              <div className="space-y-2">
                <Label>Experience</Label>
                <Input
                  name="experience"
                  value={input.experience}
                  onChange={changeEventHandler}
                  placeholder="2 Years"
                  className="h-12 rounded-xl focus:ring-2 focus:ring-black"
                />
              </div>

              {/* Positions */}
              <div className="space-y-2">
                <Label>No. of Positions</Label>
                <Input
                  type="number"
                  name="position"
                  value={input.position}
                  onChange={changeEventHandler}
                  className="h-12 rounded-xl focus:ring-2 focus:ring-black"
                />
              </div>

              {/* Company */}
              {companies?.length > 0 && (
                <div className="space-y-2 md:col-span-2">
                  <Label>Select Company</Label>
                  <Select onValueChange={selectChangeHandler}>
                    <SelectTrigger className="h-12 rounded-xl w-full">
                      <SelectValue placeholder="Choose company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {companies.map((company) => (
                          <SelectItem
                            key={company._id}
                            value={company._id}
                          >
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-14 rounded-2xl text-lg bg-black text-white hover:bg-gray-800 transition-all duration-300"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Posting Job...
                  </>
                ) : (
                  "Publish Job"
                )}
              </Button>
            </div>

            {companies?.length === 0 && (
              <p className="text-red-500 text-center text-sm">
                Please register a company first.
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default PostJob