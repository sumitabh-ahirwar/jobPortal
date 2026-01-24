
import { setAllApplications } from '@/redux/applicationSlice';

import { APPLICATION_API_ENDPOINT } from '@/utils/constants'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function useGetApplications() {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllApplications = async () => {
            try {   
                const res = await axios.get(`${APPLICATION_API_ENDPOINT}/get`, {withCredentials:true})
                if(res.data.success)
                {
                    dispatch(setAllApplications(res.data.applications))
                }
            } catch (error) {
                console.log("failed to fetch all applications")
            }
        }
        fetchAllApplications();
    }, [])
}

export default useGetApplications
