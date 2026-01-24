import React, { useEffect } from 'react'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_ENDPOINT } from '@/utils/constants'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_ENDPOINT}/${params.id}/applicants`, {withCredentials:true})
        if(res.data.success){
            dispatch(setAllApplicants(res.data.applications))
        }
      } catch (error) {
        console.log("Applicants fetch error : ",error)
      }
    }
    fetchAllApplicants()
  }, [])
  
  const {applicants} = useSelector(state => state.application)
  return (
    <div>
        <div className='max-w-7xl mx-auto'>
            <h1 className='font-bold text-xl my-5'>Applicants ({applicants?.length})</h1>
            <ApplicantsTable/>
        </div>
    </div>
  )
}

export default Applicants