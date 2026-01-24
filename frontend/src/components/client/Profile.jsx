import React, { useState } from 'react'
import { Avatar } from '../ui/avatar'
import { AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Label } from '../ui/label'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import AppliedJobsTable from './AppliedJobsTable'
import useGetApplications from '@/hooks/useGetApplications'
function Profile() {
    useGetApplications();
    const haveResume= true;
    const {user} = useSelector(store => store.auth)
    
    const [open, setOpen] = useState(false)
    

  return (
    <div>
        <div className='max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'> 
            <div className='flex justify-between'>
                <div className='flex items-center gap-4'>
                    <Avatar className="h-24 w-24">
                        <AvatarImage src={user?.profile?.profilePhoto || ''} />
                    </Avatar>
                    <div>
                        <h1 className='font-medium text-xl'>{user?.username}</h1>
                        <p><span>{user?.profile?.bio}</span></p>
                    </div>
                </div>
                <Button onClick={() => setOpen(true)} className={'text-right'} variant='outline'>
                    <Pen/>
                </Button>
            </div>
            <div>
                <div className='flex items-center gap-3'>
                    <Mail/>
                    <span>{user?.email}</span>
                </div>
                <div className='flex items-center gap-3'>
                    <Contact/>
                    <span>{user?.phoneNumber}</span>
                </div>
            </div>
            <div className='flex items-center gap-2'>
                <h1 className='font-bold'>Skills : </h1>
                <div className='flex items-center gap-1'>
                    {
                        user?.profile?.skills.length !== 0 ?  user?.profile?.skills.map((item, index) => (
                                <Badge key={index}>{item}</Badge>
                        )) : <span>NA</span>
                    }
                </div>
            </div>
            <div className='grid w-2.5 max-w-sm items-center gap-1.5'>
                <Label className="text-md font-bold">Resume</Label>
                {
                    haveResume ? <a className='text-blue-500 w-full hover:underline' href={user?.profile?.resume} target='blank'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                }
            </div>
        </div>
        <div className='max-w-7xl mx-auto bg-white rounded-2xl'>
            <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
            <AppliedJobsTable />
        </div>
        <UpdateProfileDialog open={open} setOpen = {setOpen}/>
    </div>
  )
}

export default Profile
