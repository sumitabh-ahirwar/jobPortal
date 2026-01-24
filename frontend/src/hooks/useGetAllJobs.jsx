import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_ENDPOINT } from '@/utils/constants'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function useGetAllJobs() {
    const dispatch = useDispatch();
    const {searchQuery} = useSelector(state => state.job);
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {   
                const res = await axios.get(`${JOB_API_ENDPOINT}/get?keyword=${searchQuery}`, {withCredentials:true})

                if(res.data.success)
                {
                    dispatch(setAllJobs(res.data.jobs))
                }
            } catch (error) {
                console.log("failed to jetch all jobs")
            }
        }
        fetchAllJobs();
    }, [])
  return (
    <div>
      
    </div>
  )
}

export default useGetAllJobs
