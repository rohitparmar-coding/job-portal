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
import Loader from './components/Loader.jsx'
import { useDispatch } from "react-redux";
import { USER_API_END_POINT } from "./utils/constant.js";
import axios from "axios";
import { setUser } from "./redux/authSlice.js";
import ApplyJob from "./components/ApplyJob.jsx";
import ApplicationSuccess from "./components/ApplicationSuccess.jsx";



export default function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${USER_API_END_POINT}/api/v1/user/me`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setUser(res.data.user));
        }
      } catch (error) {
        dispatch(setUser(null)); // important
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [dispatch]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false)
  //   }, 2000)
  // }, [])

  if (loading) {
    return <Loader />
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
        <Route path="/about" element={<AboutPage />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/save"
          element={
            <ProtectedRoute>
              <UserSaveJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <NotificationPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/description/:id"
          element={
            <ProtectedRoute>
              <JobDescription />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/companies"
          element={
            <ProtectedRoute role="recruiter">
              <Companies />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/companies/create"
          element={
            <ProtectedRoute role="recruiter">
              <CompanyCreate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/companies/:id"
          element={
            <ProtectedRoute role="recruiter">
              <CompanySetup />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/jobs"
          element={
            <ProtectedRoute role="recruiter">
              <AdminJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/jobs/create"
          element={
            <ProtectedRoute role="recruiter">
              <PostJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/jobs/:id/applicants"
          element={
            <ProtectedRoute role="recruiter">
              <Applicants />
            </ProtectedRoute>
          }
        />


        <Route path='/apply/:id' element={<ApplyJob/>}/>
        <Route path="/application-success" element={<ApplicationSuccess/>}/>
      </Routes>
    </>
  )
}
