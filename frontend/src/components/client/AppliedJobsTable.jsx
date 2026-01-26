import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge';
import { useSelector } from 'react-redux';

function AppliedJobsTable() {
  const {allApplications} = useSelector(store => store.application)
  return (
    <div className='max-w-7xl mx-auto bg-white border border-gray-100 rounded-2xl my-5 p-8 shadow-md'>
      <Table>
        <TableCaption>
          A list of your applied jobs
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            allApplications?.length > 0 ? allApplications.map((application) => (
              <TableRow key = {application?._id}>
                <TableCell>{application?.createdAt.split('T')[0]}</TableCell>
                <TableCell>{application?.job?.title}</TableCell>
                <TableCell>{application?.job?.company?.name}</TableCell>
                <TableCell className="text-right"><Badge className={`${application?.status === 'accepted' ?`bg-green-400` : application?.status === 'rejected' ? `bg-red-700` : `bg-amber-300`} `}>{application?.status}</Badge></TableCell>
              </TableRow>
            )) : <span>No applications</span>
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobsTable
