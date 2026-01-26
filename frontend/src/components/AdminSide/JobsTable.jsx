import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge, Edit, Edit2, Eye, EyeIcon, MoreHorizontal, MoreVertical } from "lucide-react";
import { Popover } from "../ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function JobsTable() {
  const navigate = useNavigate();
  const { allAdminJobs, searchJobByText} = useSelector(
    (state) => state.job,
  );
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  useEffect(() => {
    const filteredJobs =
      allAdminJobs?.length >= 0 &&
      allAdminJobs.filter((job) => {
        if (!searchJobByText) return true;
        return job?.company?.name
          ?.toLowerCase()
          .includes(searchJobByText.toLowerCase()) || job?.title
          ?.toLowerCase()
          .includes(searchJobByText.toLowerCase());
      });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);
  return (
    <div>
      <div>
        <Table>
          <TableCaption>
            A list of your recent posted jobs
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className={"text-right"}>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterJobs?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  You haven't registered any job yet.
                </TableCell>
              </TableRow>
            ) : (
              <>
                {filterJobs?.map((job, index) => (
                  <TableRow key={index}>
                    <TableCell>{job?.company?.name}</TableCell>
                    <TableCell>{job?.title}</TableCell>
                    <TableCell>{job?.createdAt?.split("T")?.[0]}</TableCell>
                    <TableCell className="text-right cursor-pointer relative">
                      <Popover>
                        <PopoverTrigger asChild>
                          <div className="inline-flex justify-end w-full">
                            <MoreHorizontal className="" />
                          </div>
                        </PopoverTrigger>

                        <PopoverContent
                          align="end"
                          side="right"
                          sideOffset={15}
                          alignOffset={-15}
                          className="w-24 p-2"
                        >
                          <div
                            onClick={() =>  navigate(`/admin/job/update/${job?._id}`)}
                            className="flex items-center gap-2 cursor-pointer rounded-sm"
                          >
                            <Edit2 className="w-4" />
                            <span>Edit</span>
                          </div>
                          <div
                            onClick={() =>  navigate(`/admin/jobs/${job._id}/applicants`)}
                            className="flex items-center my-2 gap-2 cursor-pointer rounded-sm"
                          >
                            <Eye className="" />
                            <span>Applicants</span>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
            {}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default JobsTable;
