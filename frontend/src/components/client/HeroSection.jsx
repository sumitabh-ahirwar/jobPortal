import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
function HeroSection() {
    const [searchQuery, setsearchQuery] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(setSearchQuery(searchQuery))
        navigate('/browse')
    }
  return (
    <div className='text-center'>
        <div className='flex flex-col gap-3 my-10'>
            <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-blue-400 font-medium'>Find your career with us</span>
            <h1 className='text-4xl font-bold'>Search, Apply & <br/> Get your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, illo!</p>
        </div>
        <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
            <input type="text"
                placeholder='Search your dream jobs'
                onChange = {(e) => setsearchQuery(e.target.value)}
                className='outline-none border-none w-full'
            />
            <Button 
            onClick = {handleClick}
            className="rounded-r-full">
                <Search className='h-5 w-5'/>
            </Button>

        </div>
    </div>
  )
}

export default HeroSection
