import React, { useEffect } from "react";
import { Dialog, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/constants";

function UpdateProfileDialog({ open, setOpen }) {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    username: user?.username,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills.map((skill) => skill),
    resume: user?.profile?.resume,
    profilePhoto: user?.profile?.profilePhoto
  });
  useEffect(() => {
    if (user) {
      setInput({
        username: user.username || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        bio: user.profile?.bio || "",
        skills: user.profile?.skills?.join(",") || "",
        resume: user.profile?.resume || null,
        profilePhoto: user?.profile?.profilePhoto || null
      });
    }
  }, [user]);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("username", input.username);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.resume) {
      formData.append("resume", input.resume);
    }
    if (input.profilePhoto) {
      formData.append("profilePhoto", input.profilePhoto);
    }
    try {
      setLoading(true)
      const res = await axios.post(
        `${USER_API_ENDPOINT}/profile/updateProfile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("handleSubmit error : ", error.message);
    }
    finally{
      setLoading(false)
    }
    setOpen(false);
  };

  const changeFileHandler = (e) => {
    const resume = e.target.files?.[0];
    setInput({ ...input, resume: resume });
  };
  const changeProfileImageHandler = (e) => {
    const profilePhoto = e.target.files?.[0];
    console.log(profilePhoto)
    setInput({ ...input, profilePhoto: profilePhoto });
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="sm:max-w-106.25"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className={"text-right"}>
                  Name
                </Label>
                <Input
                  id="name"
                  name="username"
                  type="text"
                  onChange={changeEventHandler}
                  value={input.username}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className={"text-right"}>
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="number" className={"text-right"}>
                  Number
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="number"
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className={"text-right"}>
                  Bio
                </Label>
                <Input
                  id="bio"
                  name="bio"
                  value={input.bio}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" className={"text-right"}>
                  Skills
                </Label>
                <Input
                  id="skills"
                  name="skills"
                  value={input.skills}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className={"text-right"}>
                  Resume
                </Label>
                <Input
                  id="file"
                  name="resume"
                  type="file"
                  onChange={changeFileHandler}
                  accept="application/pdf"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className={"text-right"}>
                  Photo
                </Label>
                <Input
                  id="file"
                  name="profilePhoto"
                  type="file"
                  onChange={changeProfileImageHandler}
                  accept="image/*"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
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
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UpdateProfileDialog;
