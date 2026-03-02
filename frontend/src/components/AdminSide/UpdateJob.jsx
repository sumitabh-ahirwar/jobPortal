import { setSingleAdminJob } from "@/redux/jobSlice";
import { JOB_API_ENDPOINT } from "@/utils/constants";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import ReactQuill from "react-quill-new";
const UpdateJob = () => {
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleAdminJob(res.data.job));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [jobId]);
  const { singleAdminJob } = useSelector((state) => state.job);
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: 0,
    location: "",
    jobType: "",
    experience: 0,
    positions: 0,
  });

  useEffect(() => {
    if (singleAdminJob) {
      setInput({
        title: singleAdminJob?.title || "",
        description: singleAdminJob?.description || "",
        requirements: singleAdminJob?.requirements?.join(",") || "",
        salary: singleAdminJob?.salary || "",
        location: singleAdminJob?.location || "",
        jobType: singleAdminJob?.jobType || "",
        experience: singleAdminJob?.experience || 0,
        positions: singleAdminJob?.positions || 0,
      });
    }
  }, [user, singleAdminJob]);
  const handleEditorChange = (content) => {
    setInput({ ...input, description: content });
  };
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
      </div>
    );
  }

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put(
        `${JOB_API_ENDPOINT}/${jobId}/update`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(`Job Update error  : ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  if (singleAdminJob?.applications?.length > 0) {
    return (
      <div className="min-h-screen text-center">
        <h1 className="text-red-500">
          You cannot update the job. some one has registered for this job.
        </h1>
      </div>
    );
  } else
    return (
      <div>
        <div className="max-w-xl mx-auto my-10">
          <Button
            onClick={() => navigate("/admin/jobs")}
            variant="outline"
            className={"flex items-center gap-2 text-gray-500 font-semibold"}
          >
            <ArrowLeft />
            <span>Back</span>
          </Button>
          <form
            onSubmit={submitHandler}
            className="p-8 max-w-5xl border border-gray-200 shadow-lg rounded-md mt-2"
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
                <Label>Positions</Label>
                <Input
                  type="number"
                  name="positions"
                  value={input.positions}
                  onChange={changeEventHandler}
                  className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                />
              </div>
            </div>
            <div>
              <Label>Job description</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-2 mt-1">
                <div>
                  <Label className="mb-2 block font-bold">
                    Markdown (Editor)
                  </Label>
                  <textarea
                    name="description"
                    className="w-full h-96 p-4 border rounded-md font-mono text-sm bg-gray-900 text-green-400 focus:ring-2 focus:ring-blue-500"
                    value={input.description}
                    onChange={changeEventHandler}
                  />
                </div>

                <div>
                  <Label className="mb-2 block font-bold text-blue-600">
                    Live Preview
                  </Label>
                  <div className="h-96 p-4 border rounded-md overflow-y-auto bg-white prose prose-slate max-w-none">
                    <ReactMarkdown>{input.description}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
            {loading ? (
              <Button className={"w-full mt-4"}>
                {" "}
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </Button>
            ) : (
              <Button type="submit" className="w-full mt-4">
                Update Job
              </Button>
            )}
          </form>
        </div>
      </div>
    );
};
export default UpdateJob;
