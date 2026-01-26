import React from 'react'
import { Button } from '../ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
  const navigate = useNavigate();

  const dayAgoFunction = (time) =>
  {
    const createdAt = new Date(time);
    const currtime = new Date();
    const timeDiff = currtime - createdAt;

    return Math.floor(timeDiff/(1000*24*3600))

  }
  return (
    <div
      className="
        relative
        p-5
        rounded-md
        shadow-md
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
      <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-500'>{dayAgoFunction(job?.createdAt)} days ago</p>
        <Button variant='outline' size='icon' className="rounded-full"> <Bookmark/> </Button> 
      </div>

      <div className='flex items-center gap-2 my-2'>
        <Button className={'p-6'} variant='outline' size='icon'>
            <Avatar>
                <AvatarImage src={job?.company?.logo} className={''}/>
            </Avatar>
        </Button>
        <div>
            <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
            <p className='text-sm text-gray-600'>India</p>
        </div>
      </div>
      <div>
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-600'>{job?.description}</p>
      </div>
      <div className='flex items-center gap-1 mt-4'>
        <Badge className={'text-[#007BFF] font-bold'} variant="ghost">
            {job?.positions} Positions
        </Badge>
        <Badge className={'text-[#F83002] font-bold'} variant="ghost">
            {job?.jobType} 
        </Badge>
        <Badge className={'text-[#7209B7] font-bold'} variant="ghost">
            {job?.salary/100000}LPA
        </Badge>
      </div>
      <div className='flex items-center gap-4 mt-4'>
        <Button onClick={() => navigate(`/jobs/description/${job?._id}`)} variant='outline'>Details</Button>
        <Button className="bg-[#7209B7]">Save for later</Button>
      </div>
    </div>
  )
}

export default Job
