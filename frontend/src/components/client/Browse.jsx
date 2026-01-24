import React from 'react'
import Job from './Job';

const randomJobs = [1,2,3,4,5,6,7,8,9,10];
function Browse() {
  return (
    <div>
      <div className='max-w-7xl mx-auto my-10'>
        <h1 className='font-vold text-xl'>Search Results ({randomJobs.length})</h1>
        <div className='grid grid-cols-3 gap-4'>
          {
          randomJobs.map((job) => (
            <Job/>
          )
        )
        }
        </div>
        
      </div>
    </div>
  )
}

export default Browse
