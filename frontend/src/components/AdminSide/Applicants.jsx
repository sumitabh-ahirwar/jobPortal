import React, { useEffect, useState } from 'react'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_ENDPOINT } from '@/utils/constants'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'
import { Button } from '../ui/button'
import { Loader2, Sparkles } from 'lucide-react'
import { toast } from 'sonner'

const Applicants = () => {
  const params = useParams();
  const jobId = params.id
  const dispatch = useDispatch()
  const [isRanking, setIsRanking] = useState(false);
  const {applicantsForJob} = useSelector(state => state.application)
  const applicants = applicantsForJob[params.id] || [];
  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_ENDPOINT}/${params.id}/applicants`, {withCredentials:true})
        if(res.data.success){
            dispatch(setAllApplicants({jobId, data:res.data.applications}))
        }
      } catch (error) {
        console.log("Applicants fetch error : ",error)
      }
    }
  fetchAllApplicants();
  }, [jobId, applicants.length])
  
  const handleRanking = async () => {
    try {
      setIsRanking(true);
      const res = await axios.get(`${APPLICATION_API_ENDPOINT}/get/rank/${params.id}`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setAllApplicants({jobId, data:res.data.ranking}));
        toast.success("AI Ranking applied successfully!");
      }
    } catch (error) {
      console.log("Ai ranking error", error);
      toast.error("Failed to rank applicants.");
    } finally {
      setIsRanking(false);
    }
  }
  return (
    <div>
        <div className='max-w-7xl mx-auto'>
            <div className='flex items-center justify-between'>
              <h1 className='font-bold text-xl my-5'>Applicants ({applicants?.length})</h1>
              <Button 
                disabled={isRanking} 
                onClick={handleRanking} 
                variant='outline' 
                className='text-sm flex gap-2 items-center border-purple-400 text-purple-700 hover:bg-purple-50'
              >
                {isRanking ? <Loader2 className='animate-spin h-4 w-4' /> : <Sparkles className='h-4 w-4' />}
                {isRanking ? "Analyzing..." : "AI Rank Applicants"}
              </Button>
            </div>
            <ApplicantsTable jobId = {jobId}/>
        </div>
    </div>
  )
}

export default Applicants