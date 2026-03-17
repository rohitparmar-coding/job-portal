import { Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login.jsx";
import Signup from "./components/auth/Signup.jsx";
import Home from "./components/Home.jsx";
import Jobs from "./components/Jobs.jsx";
import Browse from "./components/Browse.jsx";
import Profile from "./components/Profile.jsx";
import JobDescription from "./components/JobDescription.jsx";
import Companies from "./components/admin/Companies.jsx";
import CompanyCreate from "./components/admin/CompanyCreate.jsx";
import CompanySetup from "./components/admin/CompanySetup.jsx";
import AdminJobs from './components/admin/AdminJobs.jsx'
import PostJob from "./components/admin/PostJob.jsx";
import Applicants from "./components/admin/Applicants.jsx";
import ProtectedRoute from "./components/admin/ProtectedRoute.jsx";
import UserSaveJob from "./components/UserSaveJob.jsx";
import NotificationPage from "./components/NotificationPage.jsx";
import AboutPage from "./components/AboutPage.jsx";
import ForgotPassword from "./components/auth/ForgotPassword.jsx";
import VerifyOTP from "./components/auth/VerifyOTP.jsx";
import ResetPassword from "./components/auth/ResetPassword.jsx";
import { useEffect, useState } from "react";
import  Loader  from './components/Loader.jsx'


export default function App() {

  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false)
    },2000)
  },[])

  if(loading){
    return <Loader/>
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/jobs" element={<Jobs />} />
        <Route path="/browse" element={<Browse />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/description/:id" element={<JobDescription />} />

        {/* admin route for company */}
        <Route path="/admin/companies" element={<ProtectedRoute> <Companies /> </ProtectedRoute>} />
        <Route path="/admin/companies/create" element={<ProtectedRoute> <CompanyCreate /> </ProtectedRoute>} />
        <Route path="/admin/companies/:id" element={<CompanySetup />} />
        {/* admin route for job */}
        <Route
          path="/admin/jobs"
          element={
            <ProtectedRoute>
              <AdminJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/jobs/create"
          element={
            <ProtectedRoute>
              <PostJob />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/jobs/:id/applicants" element={<Applicants />} />


        <Route path="/save" element={<UserSaveJob />} />

        <Route path="/notifications" element={<NotificationPage />} />

        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </>
  )
}
