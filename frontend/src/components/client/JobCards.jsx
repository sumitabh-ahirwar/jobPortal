import React from 'react'
import { Badge } from '../ui/badge'
import { useNavigate } from 'react-router-dom'
function JobCards({job}) {
  const navigate = useNavigate();
  return (
    <div onClick={() =>  navigate(`/jobs/description/${job?._id}`)}
    className="
        relative
        p-5
        shadow-md
        rounded-md
        bg-white
        border border-gray-100
        cursor-pointer
        transform
        transition-all
        duration-300
        ease-out
        hover:scale-[1.05]
        hover:-translate-y-2
        hover:shadow-2xl
        z-10
      ">
      <div>
        <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
        <p className='text-sm text-gray-500'>India</p>
      </div>
      <div>
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className=" text-sm text-gray-600 ">
          {job?.description?.split('\n')[0]}
        </p>
      </div>
      <div className='flex items-center gap-1 mt-4'>
        <Badge className={'text-blue-700 font-bold'} variant="ghost">
            {job?.positions} Position
        </Badge>
        <Badge className={'text-blue-700 font-bold'} variant="ghost">
            {job?.jobType}
        </Badge>
        <Badge className={'text-blue-700 font-bold'} variant="ghost">
            {job?.salary/100000}LPA
        </Badge>
      </div>
    </div>
  )
}

export default JobCards
