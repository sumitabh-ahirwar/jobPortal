import React, { useEffect } from 'react'
import HeroSection from '../client/HeroSection'
import CategoryCarousel from '../client/CategoryCarousel'
import LatestJobs from "../client/LatestJobs"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useGetAllJobs from '@/hooks/useGetAllJobs'
function Home() {
  useGetAllJobs();
  const {user} = useSelector(state => state.auth)
  const navigate = useNavigate();
  useEffect(() => {
  if(user && user.role === "recruiter") navigate("/admin/companies")
  })
  return (
    <div>
      <HeroSection/>
      <CategoryCarousel/>
      <LatestJobs />

    </div>
  )
}

export default Home
