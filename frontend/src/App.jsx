import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./components/auth/Home.jsx";
import Login from "./components/auth/Login.jsx";
import Signup from "./components/auth/Signup.jsx";
import Jobs from "./components/client/Jobs.jsx";
import Browse from "./components/client/Browse.jsx";
import Profile from "./components/client/Profile.jsx";
import JobDescription from "./components/client/JobDescription.jsx";
import Companies from "./components/AdminSide/Companies.jsx";
import AdminJobs from "./components/AdminSide/AdminJobs.jsx";
import CompanyCreate from "./components/AdminSide/CompanyCreate.jsx";
import CompanySetup from "./components/AdminSide/CompanySetup.jsx";
import EditCompany from "./components/AdminSide/EditCompany.jsx";
import PostJob from "./components/AdminSide/PostJob.jsx";
import Applicants from "./components/AdminSide/Applicants.jsx";
import UpdateJob from "./components/AdminSide/UpdateJob.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="jobs" element={<Jobs />} />
      <Route path="jobs/description/:id" element={<JobDescription />} />
      <Route path="browse" element={<Browse />} />
      <Route path="profile" element={<Profile />} />
      <Route path="admin/companies" element={<Companies/>}/>
      <Route path="admin/jobs" element={<AdminJobs/>}/>
      <Route path="admin/job/create" element={<PostJob/>}/>
      <Route path="admin/job/update/:id" element={<UpdateJob/>}/>
      <Route path="admin/companies/create" element={<CompanyCreate/>}/>
      <Route path="admin/companies/:id" element={<CompanySetup/>}/>
      <Route path="admin/jobs/:id/applicants" element={<Applicants/>}/>
      <Route path="admin/companies/update/:id" element={<EditCompany/>}/>
    </Route>,
  ),
);
function App() {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const res = await axios.get(`${USER_API_ENDPOINT}/me`, {
  //         withCredentials: true,
  //       });
  //       // console.log(res.data.user)
  //       dispatch(setUser(res.data.user));
  //     } catch (err) {
  //       dispatch(setUser(null));
  //     }
  //   };

  //   fetchUser();
  // }, []);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
