import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_ENDPOINT } from "@/utils/constants";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import axios from "axios";
function Navbar() {
  const {user, authChecked} = useSelector(store => store.auth)
 
  // console.log(user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
   if(!authChecked) return  <div className="h-16" />
  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/logout`, {
        withCredentials:true
      });
      if(res.data.success)
      {
        dispatch(setUser(null));
        navigate("/home");
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(`logout error: ${error.message}`)
    }
  }
  return (
    <div className="h-21 bg-white mx-auto  border shadow-xs rounded-b-xs">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div className="mt-4">
          <h1 className=" text-3xl font-bold cursor-pointer" onClick={() => navigate("/home")}>
            Job<span className="text-[#6A38C2]">Portal</span>
          </h1>
        </div>
        <div className="mt-5 flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {
              user && user.role === "recruiter" ? (
                <>
                  <li><Link to="/admin/companies">Companies</Link></li>
                <li><Link to="/admin/jobs">Jobs</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/home">Home</Link></li>
                <li><Link to="/jobs">Jobs</Link></li>
                <li><Link to="/browse">Browse</Link></li>
                </>
              )
            }
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="bg-[#6A38C2] hover:bg-[#5324b3] text-white rounded-full"
                >
                  Login
                </Button>
              </Link>

              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5324b3] rounded-full ">
                    Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-80">
                <div className="flex gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium pt-1">Sumit</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col mt-4 gap-2">
                  {
                    user && user.role === "student" ? (
                      <div className="flex w-fit gap-2 items-center cursor-pointer">
                      <User2 />
                      <Button variant="link" className="bg-white h-7"><Link to="/profile">View Profile</Link></Button>
                    </div>
                    ) : null
                  }
                  <div className="flex w-fit gap-2 items-center cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} className="bg-white text-black h-7">Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
