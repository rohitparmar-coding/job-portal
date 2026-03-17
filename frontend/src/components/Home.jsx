import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection.jsx'
import CategoryCarousel from './CategoryCarousel.jsx'
import LatestJobs from './LatestJobs.jsx'
import Footer from './shared/Footer.jsx'
import useGetAllJobs from '@/hooks/useGetAllJobs.jsx'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import InterviewFAQ from './InterviewFAQ.jsx'

const Home = () => {
  useGetAllJobs();

  const {user} = useSelector(store=>store.auth);
  const navigate = useNavigate();
  useEffect(()=> {
    if(user?.role === 'recruiter'){
       navigate('/admin/companies')
    }
  },[])
  
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <CategoryCarousel/>
        <LatestJobs/>
        <InterviewFAQ/>
        <Footer/>
    </div>
  )
}

export default Home