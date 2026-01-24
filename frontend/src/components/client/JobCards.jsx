import React from 'react'
import { Badge } from '../ui/badge'
function JobCards({job}) {
  return (
    <div className='p-5 rounded-md shadow-xl bg-white boder border-gray-100 cursor-pointer'>
      <div>
        <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
        <p className='text-sm text-gray-500'>India</p>
      </div>
      <div>
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-600'>{job?.description}</p>
      </div>
      <div className='flex items-center gap-1 mt-4'>
        <Badge className={'text-blue-700 font-bold'} variant="ghost">
            {job?.positions}
        </Badge>
        <Badge className={'text-blue-700 font-bold'} variant="ghost">
            {job?.jobType}
        </Badge>
        <Badge className={'text-blue-700 font-bold'} variant="ghost">
            {job?.salary}
        </Badge>
      </div>
    </div>
  )
}

export default JobCards
