import { setAllJobs, setSearchedQueryJobs } from '@/redux/jobSlice';
import { JOB_API_ENDPOINT } from '@/utils/constants'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function useGetSearchedQueryJobs(searchQuery) {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {   
                const res = await axios.get(`${JOB_API_ENDPOINT}/get?keyword=${searchQuery}`, {withCredentials:true})

                if(res.data.success)
                {
                    dispatch(setSearchedQueryJobs(res.data.jobs))
                }
            } catch (error) {
                console.log("failed to fetch searched jobs ", error.message)
            }
        }
        fetchAllJobs();
    }, [])
  return (
    <div>
      
    </div>
  )
}

export default useGetSearchedQueryJobs
