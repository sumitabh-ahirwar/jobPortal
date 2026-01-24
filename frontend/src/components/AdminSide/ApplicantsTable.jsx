import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/utils/constants";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";

const ApplicantsTable = () => {
  const options = ["Accept", "Reject"];
  const { applicants } = useSelector((state) => state.application);

  const statusHandler = async (status, id) => {
    try {
        const res = await axios.post(`${APPLICATION_API_ENDPOINT}/status/${id}/update`, {status}, {withCredentials: true})
        if(res.data.success)
        {
            toast.success(res.data.message)
        }
    } catch (error) {
        console.log(error);
        toast.error(error.message)
    }
  }
  return (
    <div>
      <Table>
        <TableCaption>A List of recent applicants</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.length >= 0 &&
            applicants.map((application) => (
              <TableRow key={application._id}>
                <TableCell>{application?.applicant?.username}</TableCell>
                <TableCell>{application?.applicant?.email}</TableCell>
                <TableCell>{application?.applicant?.phoneNumber}</TableCell>
                <TableCell
                  className={
                    "text-blue-400 hover hover:underline-offset-4 cursor-pointer"
                  }
                >
                  <a target="blank" href={application?.applicant?.profile?.resume}>{application?.applicant?.profile?.resumeOriginalName}</a>
                </TableCell>
                <TableCell>{application?.applicant?.createdAt.split('T')[0]}</TableCell>
                <TableCell className={"text-right"}>
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent className={"w-32 h-32"}>
                      {options.map((op, index) => (
                        <Button variant="outline"
                          key={index}
                           onClick={() => statusHandler(op, application._id)}
                          className="flex w-24 items-center my-2 cursor-pointer"
                        >
                          {op}
                        </Button>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
