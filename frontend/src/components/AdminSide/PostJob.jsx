import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { AI_API_ENDPOINT, JOB_API_ENDPOINT } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: 0,
    location: "",
    jobType: "",
    experience: 0,
    positions: 0,
    company: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { companies } = useSelector((state) => state.company);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const [aiLoading, setAiLoading] = useState(false);
  const generateAiDescription = async () => {
    if (
      !input.title ||
      !input.requirements ||
      !input.experience ||
      !input.jobType ||
      !input.location ||
      !input.positions ||
      !input.company
    ) {
      toast.error("Please fill all the details!");
      return;
    }

    try {
      setAiLoading(true);
      const res = await axios.post(
        `${AI_API_ENDPOINT}/generate-description`,
        {
          title: input.title,
          requirements: input.requirements,
          jobType: input.jobType,
          location: input.location,
          experience: input.experience,
          positions: input.positions,
        },
        {
          withCredentials: true,
        },
      );
      if (res.data.success) {
        setInput({ ...input, description: res.data.description.content });
        toast.success("Description generated!");
      }
    } catch (error) {
      toast.error("Failed to generate description");
    } finally {
      setAiLoading(false);
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_ENDPOINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(`Job Post error  : ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  const selectChangeHanlder = (id) => {
    setInput({ ...input, company: id });
  };
  return (
    <div>
      <div className="flex items-center justify-center w-screen  my-5">
        <form
          onSubmit={submitHandler}
          className="p-8 max-w-5xl border border-gray-200 shadow-lg rounded-md"
        >
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="number"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Experience</Label>
              <Input
                type="number"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Jobtype</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Postions</Label>
              <Input
                type="number"
                name="positions"
                value={input.positions}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label className={"mb-1"}>Company</Label>
              {
                <Select onValueChange={selectChangeHanlder}>
                  <SelectTrigger className="w-full max-w-48">
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => {
                        return (
                          <SelectItem key={company?._id} value={company?._id}>
                            {company?.name}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              }
            </div>
          </div>
          <div className="col-span-2">
            <Button
              type="button"
              variant="outline"
              onClick={generateAiDescription}
              disabled={aiLoading}
              className="w-full border-dashed border-blue-400 text-blue-600 hover:bg-blue-50"
            >
              {aiLoading ? (
                <Loader2 className="animate-spin mr-2" />
              ) : (
                "✨ Generate Description with Gemini AI"
              )}
            </Button>
          </div>
          <div className="col-span-2 mt-4">
            <Label>Job Description</Label>
            <textarea
              name="description"
              rows={10}
              value={input.description}
              onChange={changeEventHandler}
              placeholder="AI generated description will appear here..."
              className="mt-2 w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {loading ? (
            <Button className={"w-full mt-4"}>
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait...
            </Button>
          ) : (
            <Button type="submit" className="w-full mt-4">
              Post new Job
            </Button>
          )}
          {companies.length === 0 && (
            <p className="text-xs text-red-500 font-bold text-center my-3">
              Please register a company before posting a job.{" "}
              <span
                className=" font-normal text-blue-400 hover:underline cursor-pointer"
                onClick={() => navigate("/admin/companies/create")}
              >
                click here.
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
