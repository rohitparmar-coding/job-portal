// import React, { useState } from 'react'
// import Navbar from '../shared/Navbar'
// import { Label } from '../ui/label'
// import { Input } from '../ui/input'
// import { Button } from '../ui/button'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { COMPANY_API_END_POINT } from '@/utils/constant.js'
// import { toast } from 'sonner'
// import { useDispatch } from 'react-redux'
// import { setSingleCompany } from '@/redux/companySlice.js'

// const CompanyCreate = () => {
//     const navigate = useNavigate();
//     const [companyName, setCompanyName] = useState();
//     const dispatch = useDispatch()

//     const registerNewCompany = async () =>{
//         try{
//             const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName},{
//                 headers:{
//                     'Content-Type':'application/json'
//                 },
//                 withCredentials:true
//             } );
//             //   console.log(res.data)
//             if(res?.data?.success){
//                 dispatch(setSingleCompany(res.data.company));
//                 toast.success(res.data.message);
//                 const companyId = res?.data?.company?._id;
//                 navigate(`/admin/companies/${companyId}`)
//             }
//         }catch(error){
//             console.error(error)
           
//         }
//     }
//     return (
//         <div>
//             <Navbar />
//             <div className='max-w-4xl mx-auto'>
//                 <div className='my-10'>
//                     <h1 className='font-bold text-2xl'>Your Company Name</h1>
//                     <p className='text-gray-500'>what would you like to give your company name? you can change later.</p>

//                 </div>
//                 <Label>Company Name</Label>
//                 <Input
//                     type="text"
//                     className="my-2"
//                     placeholder="Enter your company name"
//                     onChange={(e) => setCompanyName(e.target.value)}
//                     />

//                 <div className='flex items-center gap-2 my-10'>
//                     <Button variant='outline' onClick={() => navigate('/admin/companies')}>Cencel</Button>
//                     <Button onClick={registerNewCompany}>Continue</Button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default CompanyCreate





import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant.js";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice.js";
import { motion } from "framer-motion";
import { Loader2, Building2 } from "lucide-react";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);

  const registerNewCompany = async (e) => {
    e.preventDefault();

    if (!companyName?.trim()) {
      toast.error("Company name is required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);

        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 p-8 md:p-10"
        >
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="bg-indigo-100 dark:bg-indigo-500/20 p-4 rounded-2xl mb-4">
              <Building2 className="text-indigo-600 dark:text-indigo-400" size={28} />
            </div>

            <h1 className="text-2xl md:text-3xl font-bold">
              Create Your Company
            </h1>

            <p className="text-gray-500 mt-2 text-sm md:text-base">
              What would you like to name your company?
              <br />
              You can change it later.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={registerNewCompany} className="space-y-6">
            <div>
              <Label className="text-sm font-medium">
                Company Name
              </Label>

              <Input
                type="text"
                placeholder="Enter your company name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="mt-2 rounded-xl focus:ring-2 focus:ring-indigo-400 transition-all"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto rounded-xl"
                onClick={() => navigate("/admin/companies")}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto rounded-xl hover:scale-105 transition-all duration-200"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CompanyCreate;