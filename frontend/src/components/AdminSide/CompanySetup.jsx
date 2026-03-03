import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useSelector } from "react-redux";
import axios from "axios";
import { COMPANY_API_ENDPOINT } from "@/utils/constants";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetup = () => {
  const params = useParams();
  const companyId = params.id;
  useGetCompanyById(companyId)
  const navigate = useNavigate();
  const { singleCompany } = useSelector((state) => state.company);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    name: singleCompany?.name || "",
    description: singleCompany?.description || "",
    website: "",
    location: "",
    logo: singleCompany?.logo || null,
  });
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    const logo = e.target.files?.[0];
    setInput({ ...input, logo: logo });
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.logo) formData.append("logo", input.logo);
    try {
        setLoading(true)
      const res = await axios.put(
        `${COMPANY_API_ENDPOINT}/update/${companyId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(
        "Submitting the update of teh company error : ",
        error.message,
      );
    }
    finally{
        setLoading(false)
    }

    useEffect(() => {
      setInput({
        name: singleCompany?.name || "",
        description: singleCompany?.description || "",
        website: singleCompany?.website || "",
        location: singleCompany?.location || "",
        logo: singleCompany?.logo || null,
      });
    }, [singleCompany, companyId]);
  };
  return (
    <div>
      <div className="max-w-xl mx-auto my-10">
        <Button onClick={() => navigate("/admin/companies")}
            variant="outline"
            className={"flex items-center gap-2 text-gray-500 font-semibold"}
            >
            <ArrowLeft />
            <span>Back</span>
        </Button>
        <form onSubmit={submitHandler}>
         
            <h1 className="font-bold text-xl mt-5 mb-4">Company setup</h1>
          

          <div className="grid grid-cols-2 gap-4">
            <div className="">
              <Label className={"my-2"}>Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
              />
            </div>
            <div className="">
              <Label className={"my-2"}>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className={""}
              />
            </div>
            <div className="">
              <Label className={"my-2"}>Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
              />
            </div>
            <div className="">
              <Label className={"my-2"}>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
            <div className="">
              <Label className={"my-2"}>logo</Label>
              <Input
                type="file"
                name="logo"
                accept="image/*"
                onChange={changeFileHandler}
              />
            </div>
          </div>
          <div>
            {loading ? (
              <Button>
                {" "}
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4">
                Update
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
