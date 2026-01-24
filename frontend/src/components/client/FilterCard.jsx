import React from 'react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'

function FilterCard() {

    const filterData = [
        {
            filterType: 'Location',
            options: ['Delhi', 'Bangalore', 'Hyderabad', 'Pune', "Mumbai", "Chennai", "Kolkata", "Remote"]
        },
        {
            filterType: 'Industry',
            options: ["Frontend", "Backend", "Full Stack", "Data Science", "DevOps", "Mobile Development", "Game Development", "AI/ML"]
        },
        {
            filterType: 'Salary',
            options: ['0-5 LPA', '5-10 LPA', '10-15 LPA', '15-20 LPA', '20+ LPA']
        },

]

  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold txet-lg'>Filter Jobs</h1>
      <hr className='mt-3'/>
      <RadioGroup>
        {
            filterData.map((filter, index) => (
                <div key={index} className='my-2'>
                    <h2 className='font-semibold mb-2'>{filter.filterType}</h2> 
                    <div className='flex flex-col gap-1'>
                        {
                            filter.options.map((option, idx) => (
                                <div key={idx} className='flex items-center space-x-2 my-1'>
                                    <RadioGroupItem value={option} />
                                    <Label>{option}</Label>
                                </div>
                        ))}
                    </div>
                </div>
            ))
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCard
