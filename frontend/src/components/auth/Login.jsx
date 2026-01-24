import React, { useState } from 'react' 
import { Label } from '../ui/label.jsx'
import { Input } from '../ui/input'
import { Button } from '../ui/button.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { RadioGroup } from '../ui/radio-group.jsx' 
import axios from 'axios'
import { USER_API_ENDPOINT } from '@/utils/constants.js'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading , setUser} from '@/redux/authSlice.js'
import { Loader2 } from 'lucide-react'
function Login() {

  const [input, setInput] = useState({
    email: '',
    password: '',
    role: ''
  });
  const dispatch = useDispatch();
  const {loading} = useSelector(state => state.auth);
  const navigate = useNavigate();
  const changeEventHandler = (e) => {
    setInput({...input, [e.target.name]: e.target.value});
  }

  const submitHandler = async(e) => {
    e.preventDefault();

    try {
        dispatch(setLoading(true))
        const res = await axios.post(`${USER_API_ENDPOINT}/login`, input,
            {
                headers:{
                    "Content-Type" : "application/json"
            },
            withCredentials: true
        }
        );

        if(res.data.success){
            // console.log(res.data.user)
            dispatch(setUser(res.data.user))
            navigate('/home');
            toast.success(res.data.message);
        }
    } catch (error) {
        console.log(error);
        toast.error(error.message || "Login failed. Please try again.");
    }
    finally{
        dispatch(setLoading(false))
    }
    setInput({
    email: '',
    password: '',
    role: ''
    })
  }
  return (
    <div>
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10 gap-2'>
            <h1 className='font-bold text-3xl mb-5'>Login</h1>
            <div className='my-2'>
                <Label>Email</Label>
                <Input
                    value={input.email}
                    name="email"
                    onChange={changeEventHandler}
                    type = 'email'
                    placeholder="enter your email"
                />
            </div>
            <div className='my-2'>
                <Label>Password</Label>
                <Input
                    value={input.password}
                    name="password"
                    onChange={changeEventHandler}
                    type = 'password'
                    placeholder="enter your password"
                />
            </div>
            <div className='flex items-center justify-between'>
                <RadioGroup className="flex items-center gap-4 my-5">
                    <div className="flex items-center space-x-2">
                        <Input 
                        type='radio'
                        name="role"
                        value='student'
                        checked={input.role === "student"}
                        onChange={changeEventHandler}
                        className="cursor-pointer"
                        />
                        <Label htmlFor="option-one">Student</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Input 
                        type='radio'
                        name="role"
                        value='recruiter'
                        checked={input.role === "recruiter"}
                        onChange={changeEventHandler}
                        className="cursor-pointer"
                        />
                        <Label htmlFor="option-two">Recruiter</Label>
                    </div>
                </RadioGroup>
            </div>
            {
                loading ? <Button > <Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please wait...</Button> : <Button type="submit" className="w-full my-4">Login</Button>
            }
           
            <span className='text-sm'>Don't have an account? <Link to='/signup' className="text-blue-400">create a new account</Link></span>
        </form>
      </div>
    </div>
  )
}

export default Login
