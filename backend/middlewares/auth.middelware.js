import jwt from 'jsonwebtoken'
import {User} from '../models/user.model.js'

const isAuthenticated = async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        if(!token)
        {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            })
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        if(!decoded)
        {
            return res.status(401).json({
                message: "Invalid Token",
                success: false
            })
        }

        req.id = decoded._id;
        const user = await User.findById(decoded._id).select("-password --refreshToken");
        if(user) {
            req.role = user.role
            req.user = user;
        }
        else req.role = "student"
        next();
    } catch (error) {
        console.log("Authentication error", error)
    }
}

export default isAuthenticated;