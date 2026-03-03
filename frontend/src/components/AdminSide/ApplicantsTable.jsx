import React, { useState } from "react";
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
import { CheckCircle2, Info, MoreHorizontal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/utils/constants";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { setAllApplicants } from "@/redux/applicationSlice";
import { PopoverClose } from "@radix-ui/react-popover";

const ApplicantsTable = ({jobId}) => {
  const options = ["Accept", "Reject"];
  const dispatch = useDispatch();
  const [openPopoverId, setOpenPopoverId] = useState(null);
  const { applicantsForJob } = useSelector((state) => state.application);
  const applicants = applicantsForJob[jobId]

  const statusHandler = async (status, id) => {
    try {
        const res = await axios.post(`${APPLICATION_API_ENDPOINT}/status/${id}/update`, {status}, {withCredentials: true})
        if(res.data.success)
        {
            toast.success(res.data.message)
            setOpenPopoverId(null);
            const updatedApplicants = applicants.map((app) => 
                app._id === id ? { ...app, status: status } : app
            );
            dispatch(setAllApplicants({ jobId, data: updatedApplicants }));
            }
    } catch (error) {
        console.log(error);
        toast.error(error.message)
    }
  }
  return (
    <div className="min-h-screen">
      <Table>
        <TableCaption>List of recent applicants</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Match %</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.length >= 0 &&
            applicants.map((application, index) => {
            const isRanked = !!application?.score;
            const isTopCandidate = isRanked && application?.score > 75 ;

            const currentStatus = application?.status?.toLowerCase() || "pending";
            const isProcessed = currentStatus === "accepted" || currentStatus === "rejected";
             return  (
              <TableRow key={application._id}
              className={`${isTopCandidate ? "bg-green-50 hover:bg-green-100/80 border-l-4 border-l-green-500" : ""}`}
              >
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{application?.applicant?.username || application?.applicantName}</span>
                    {isTopCandidate && (
                      <span className="text-[10px] text-green-600 font-bold flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" /> BEST MATCH
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>{application?.applicant?.email}</TableCell>
                <TableCell>{application?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  {isRanked ? (
                    <span className={`font-bold ${application.score > 75 ? "text-green-600" : "text-yellow-600"}`}>
                      {application.score}%
                    </span>
                  ) : (
                    <span className="text-gray-400 text-xs">--</span>
                  )}
                </TableCell>
                <TableCell
                  className={
                    "text-blue-400 hover hover:underline-offset-4 cursor-pointer"
                  }
                >
                  <a target="blank" href={application?.applicant?.profile?.resume}>view resume</a>
                </TableCell>
                <TableCell>{application?.applicant?.createdAt.split('T')[0]}</TableCell>
                <TableCell>
                    <span className={`px-2 py-1 rounded text-xs font-semibold capitalize ${
                      currentStatus === 'accepted' ? 'bg-green-100 text-green-700' : 
                      currentStatus === 'rejected' ? 'bg-red-100 text-red-700' : 
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {currentStatus}
                    </span>
                  </TableCell>
                <TableCell className="text-right">
                    {isProcessed ? (
                      <span className="text-xs text-gray-400 font-medium">Decided</span>
                    ) : (
                      <Popover
                        open={openPopoverId === application._id}
                        onOpenChange={(open) => setOpenPopoverId(open ? application._id : null)}
                      >
                        <PopoverTrigger>
                          <MoreHorizontal className="cursor-pointer" />
                        </PopoverTrigger>
                        <PopoverContent className="w-64">
                          {isRanked && (
                            <div className="mb-3 p-2 bg-gray-50 rounded text-[11px] text-gray-600 italic border-b">
                              <p className="font-bold text-gray-800 mb-1 flex items-center gap-1">
                                <Info className="h-3 w-3" /> AI Summary:
                              </p>
                              {application.summary}
                            </div>
                          )}

                          <div className="flex flex-col gap-2">
                            {options.map((op, i) => (
                              <PopoverClose asChild key={i}>
                                <Button
                                variant="outline"
                                key={i}
                                onClick={() =>
                                  statusHandler(op, application._id || application.applicationId)
                                }
                                className="w-full text-xs h-8"
                              >
                                Mark as {op}
                              </Button>
                              </PopoverClose>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    )}
                  </TableCell>
              </TableRow>
            )
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
