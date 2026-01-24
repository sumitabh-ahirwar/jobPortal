import { setCompanies } from '@/redux/companySlice';
import { COMPANY_API_ENDPOINT} from '@/utils/constants'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
function useGetAllCompanies() {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllCompany = async () => {
            try {   
                const res = await axios.get(`${COMPANY_API_ENDPOINT}/get/`, {withCredentials:true})
                if(res.data.success)
                {
                    dispatch(setCompanies(res.data.companies))
                }
            } catch (error) {
                console.log("failed to single company by id")
            }
        }
        fetchAllCompany();
    }, [])
  return (
    <div>
      
    </div>
  )
}

export default useGetAllCompanies
