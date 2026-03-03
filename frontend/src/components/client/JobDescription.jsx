import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "@/utils/constants";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";
import ReactMarkdown from 'react-markdown'

function JobDescription() {
    const {user} = useSelector(state => state.auth)
    const {singleJob} = useSelector(state => state.job)
    const params = useParams();
    const jobId = params.id
    const dispatch = useDispatch();
    const isInititallyApplied = singleJob?.applications?.some(appl => appl?.applicant === user?._id) || false
    const [isApplied, setIsApplied] = useState(isInititallyApplied);
    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_ENDPOINT}/apply/${jobId}`, {withCredentials:true})
        
            if(res.data.success)
            {
                setIsApplied(true);
                const updateThisJob = {...singleJob, applications:[...singleJob.applications, {applicant: user?._id}]}
                dispatch(setSingleJob(updateThisJob))

                toast.success(res.data.message)
            }
        } catch (error) {
            console.log("Apply job error", error.message)
            toast.error(error.message)
        }
    }
    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {withCredentials:true})
                
                if(res.data.success) {
                    dispatch(setSingleJob(res.data.job))
                    setIsApplied(res.data.job?.applications?.some(appl => appl?.applicant === user?._id))
                }
            } catch (error) {
                console.log("Fetching a job by id failed", error)
            }
        }
        fetchSingleJob()
    }, [dispatch, jobId])
  return (
    <div className="min-h-screen max-w-7xl mx-auto my-10">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="font-bold text-xl">{singleJob?.title}</h1>
                <div className="flex items-center gap-1 mt-4">
                    <Badge className={"text-[#007BFF] font-bold"} variant="ghost">
                    {singleJob?.positions} Positions
                    </Badge>
                    <Badge className={"text-[#F83002] font-bold"} variant="ghost">
                    {singleJob?.jobType}
                    </Badge>
                    <Badge className={"text-[#7209B7] font-bold"} variant="ghost">
                    {singleJob?.salary/100000}LPA
                    </Badge>
                </div>
            </div>
            <Button 
            onClick={isApplied ? null : applyJobHandler }
            disabled={isApplied} className={`rounded-lg ${ isApplied ? `bg-gray-500 cursor-not-allowed ` : `bg-[#7209B7] hover:bg-[#5a0991]`} `}>
                {
                    isApplied ? "Already Applied" : "Apply Now"
                }
            </Button>
        </div>
        <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
        {/* Split by newline and take the first element, or show full if no newline exists */}
            {singleJob?.description?.split('\n')[0]} 
        </h1>
        <div className="my-4">
            <h1 className="font-bold my-1">Role: <span className="pl-4 font-normal text-gray-800">{singleJob?.title}</span></h1>
            {/* <h1 className="font-bold my-1">Description: <span className="pl-4 font-normal text-gray-800">{singleJob?.description}</span></h1> */}
            <div>
                <ReactMarkdown>{singleJob?.description}</ReactMarkdown>
            </div>
            <h1 className="font-bold my-1">Location: <span className="pl-4 font-normal text-gray-800">{singleJob?.location}</span></h1>
            <h1 className="font-bold my-1">Experience: <span className="pl-4 font-normal text-gray-800">{singleJob?.experience}</span></h1>
            <h1 className="font-bold my-1">Salary: <span className="pl-4 font-normal text-gray-800">{singleJob?.salary/100000} LPA</span></h1>
            <h1 className="font-bold my-1">Total Applicants: <span className="pl-4 font-normal text-gray-800">{singleJob?.applications?.length}</span></h1>
            <h1 className="font-bold my-1">Posted Date: <span className="pl-4 font-normal text-gray-800">{singleJob?.createdAt?.split('T')[0]}</span></h1>
        </div>
    </div>
  );
}

export default JobDescription;
