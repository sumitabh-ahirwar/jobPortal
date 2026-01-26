import React, { useEffect } from 'react'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import useGetSearchedQueryJobs from '@/hooks/useGetSearchedQueryJobs';
import { useSearchParams } from 'react-router-dom';

function Browse() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useGetSearchedQueryJobs(query);
  const { searchedQueryJobs } = useSelector(state => state.job);

  return (
    <div>
      <div className='max-w-7xl mx-auto my-10'>
        <h1 className='font-vold text-xl'>Search Results ({searchedQueryJobs.length})</h1>
        <div className='grid grid-cols-3 gap-4'>
          {
          searchedQueryJobs.map((job) => (
            <Job key = {job?._id} job = {job}/>
          )
        )
        }
        </div>
        
      </div>
    </div>
  )
}

export default Browse
