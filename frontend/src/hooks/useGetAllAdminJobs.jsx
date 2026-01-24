import { setAllAdminJobs } from '@/redux/jobSlice';
import { JOB_API_ENDPOINT } from '@/utils/constants'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function useGetAllAdminJobs() {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchllJobs = async () => {
            try {   
                const res = await axios.get(`${JOB_API_ENDPOINT}/getadminjobs`, {withCredentials:true})
                if(res.data.success)
                {
                    dispatch(setAllAdminJobs(res.data.jobs))
                }
            } catch (error) {
                console.log("failed to fetch all admin jobs")
            }
        }
        fetchllJobs();
    }, [])
}

export default useGetAllAdminJobs
