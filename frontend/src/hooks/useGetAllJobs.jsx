import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_ENDPOINT } from '@/utils/constants'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function useGetAllJobs() {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchllJobs = async () => {
            try {   
                const res = await axios.get(`${JOB_API_ENDPOINT}/get`, {withCredentials:true})

                if(res.data.success)
                {
                    dispatch(setAllJobs(res.data.jobs))
                }
            } catch (error) {
                console.log("failed to jetch all jobs")
            }
        }
        fetchllJobs();
    }, [])
  return (
    <div>
      
    </div>
  )
}

export default useGetAllJobs
