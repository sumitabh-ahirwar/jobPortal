import React, { useEffect } from "react";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setAllJobs} from "@/redux/jobSlice"
import useGetAllJobs from "@/hooks/useGetAllJobs";
function Jobs() {
  useGetAllJobs()
  const { allJobs } = useSelector(state => state.job);
  return (
    <div>
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-[20%]">
            <FilterCard />
          </div>

          {!allJobs || allJobs?.length === 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {allJobs?.map((job, index) => (
                  <div key={index}>
                    <Job job={job} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Jobs;
