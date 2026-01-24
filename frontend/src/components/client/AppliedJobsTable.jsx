import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge';

const applieJobs = [1,2,3];
function AppliedJobsTable() {
  return (
    <div>
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
            applieJobs.map((job, index) => (
              <TableRow key = {index}>
                <TableCell>17-07-2024</TableCell>
                <TableCell>Full Stack</TableCell>
                <TableCell>Google</TableCell>
                <TableCell className="text-right"><Badge>Selected</Badge></TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobsTable
