// import React, { useEffect } from 'react'
// import Navbar from '../shared/Navbar.jsx'
// import { Label } from '../ui/label.jsx'
// import { Input } from '../ui/input.jsx'
// import { RadioGroup } from '../ui/radio-group.jsx'
// import { Button } from '../ui/button.jsx'
// import { Link, useNavigate } from 'react-router-dom'
// import { useState } from 'react'
// import axios from 'axios'
// import { USER_API_END_POINT } from '@/utils/constant.js'
// import { toast } from 'sonner'
// import { useDispatch, useSelector } from 'react-redux'
// import { setLoading, setUser } from '@/redux/authSlice.js'

// import { Loader2 } from 'lucide-react'

// const Login = () => {
//   const [input, setInput] = useState({
//     email: "",
//     password: '',
//     role: "",
//   })

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { loading, user } = useSelector(store => store.auth)


//   const ChangeEventHandler = (e) => {
//     setInput({
//       ...input,
//       [e.target.name]: e.target.value
//     })
//   }

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     // console.log(input)
//     try {
//       dispatch(setLoading(true));
//       const res = await axios.post(`${USER_API_END_POINT}/api/v1/user/login`, input, {
//         headers: {
//           "Content-Type": "application/json"
//         },
//         withCredentials: true
//       })

//       if (res.data.success) {
//         dispatch(setUser(res.data.user))
//         navigate('/')
//         toast.success(res.data.message)
//       }

//     } catch (error) {
//       console.log(error)
//     }
//     finally {
//       dispatch(setLoading(false))
//     }
//   }

//   useEffect(()=>{
//     if(user){
//       navigate('/')
//     }
//   },[])

//   return (
//     <div>
//       <Navbar />

//       <div className='flex items-center justify-center max-w-7xl mx-auto'>
//         <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
//           <h1 className='font-bold text-xl mb-5'>Login</h1>

//           <div className='my-4'>
//             <Label className="mb-2">Email</Label>
//             <Input
//               type="text"
//               name="email"
//               value={input.email}
//               onChange={ChangeEventHandler}
//               placeholder="example@gmail.com"></Input>
//           </div>

//           <div className='my-4'>
//             <Label className="mb-2">Password</Label>
//             <Input
//               type="password"
//               name="password"
//               value={input.password}
//               onChange={ChangeEventHandler}
//               placeholder="Password"></Input>
//           </div>

//           <div className='flex items-center justify-between'>
//             <RadioGroup className='flex items-center gap-4 my-4'>
//               <div className="flex items-center space-x-2">
//                 <Input
//                   type="radio"
//                   name="role"
//                   value="student"
//                   checked={input.role === 'student'}
//                   onChange={ChangeEventHandler}
//                   className="cursor-pointer" id="r1" />
//                 <Label htmlFor="r1">Student</Label>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Input
//                   type="radio"
//                   name="role"
//                   value="recruiter"
//                   checked={input.role === 'recruiter'}
//                   onChange={ChangeEventHandler}
//                   className="cursor-pointer"
//                   id="r2" />
//                 <Label htmlFor="r2">Recruiter</Label>
//               </div>
//             </RadioGroup>


//           </div>
//           {
//             loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Loading... </Button>
//               : <Button type="submit" className="w-full my-4">Login</Button>
//           }

//           <span>Don't have an account? <Link to="/signup" className='text-blue-600'>Signup</Link> </span>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Login


import React, { useEffect, useState, useCallback } from "react";
import Navbar from "../shared/Navbar.jsx";
import { Label } from "../ui/label.jsx";
import { Input } from "../ui/input.jsx";
import { RadioGroup } from "../ui/radio-group.jsx";
import { Button } from "../ui/button.jsx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant.js";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice.js";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Loader from "../Loader.jsx";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs.jsx";

const Login = () => {
  
  useGetAppliedJobs();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  // Optimized handler
  const changeEventHandler = useCallback((e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.role) {
      return toast.error("Please select a role");
    }

    try {
      dispatch(setLoading(true));

      const res = await axios.post(
        `${USER_API_END_POINT}/api/v1/user/login`,
        input,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Proper dependency
  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-10">
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={submitHandler}
          className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-xl border border-gray-200 rounded-2xl p-8"
        >
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Welcome Back 👋
          </h1>

          {/* Email */}
          <div className="mb-4">
            <Label className="mb-2">Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="example@gmail.com"
              required
              className="transition focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <Label className="mb-2">Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Enter your password"
              required
              className="transition focus:ring-2 focus:ring-indigo-400"
            />
{/* forgot password */}
            <p className="text-center text-sm mt-4">
            <Link to="/forgot-password"
              className="text-indigo-600 font-medium hover:underline"
            >
              forgot password
            </Link>
          </p>
          </div>

          {/* Role Selection */}
          <div className="mb-4">
            <RadioGroup className="flex gap-6">
              {["student", "recruiter"].map((role) => (
                <div key={role} className="flex items-center gap-2 ">
                  <Input
                  className={'cursor-pointer'}
                    type="radio"
                    name="role"
                    value={role}
                    checked={input.role === role}
                    onChange={changeEventHandler}
                  />
                  <Label  className="capitalize">{role}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-indigo-500 hover:bg-indigo-600 transition-all duration-300 hover:scale-105"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>

          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 font-medium hover:underline"
            >
              Signup
            </Link>
          </p>
        </motion.form>
      </div>
    </div>
  );
};

export default Login;