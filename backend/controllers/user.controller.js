import { User } from "../models/user.model.js";
import { uploadOnCloudinary, uploadPdfToCloudinary } from "../utils/cloudinay.js";
import cloudinary from "../utils/cloudinay.js";

export const register = async (req, res) => {
    try {
        // console.log("Request body ", req.body);
        const {username, email, phoneNumber, password, role} = req.body;
        if(!username || !email || !phoneNumber || !password || !role)
        {
            return res.status(400).json({
                message:"Something is missing",
                success:false
            })
        }

        const user = await User.findOne({email});
        if(user)
        {
            return res.status(400).json({
                message: "User already exists with thie email.",
                success :false
            })
        }


        await User.create({
            username,
            email, 
            phoneNumber,
            password,
            role

        })
        // console.log(user);
        
        return res.status(201).json({
            message: "User account created successully ",
            success: true
        })
    } catch (error) {
        console.log("Registration error ", error)
    }
}
const generateAccessAndRefreshTokens = async(userId) =>
{
    try{
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken;
        await user.save()

        return {accessToken, refreshToken}
    }
    catch(error)
    {
        console.log("Something went wrong while creating generating refresh and access tokens ", error)
    }
}
export const login = async (req, res) => {
    try {
        // console.log("Request body ", req.body);
        const {email, password, role} = req.body;
        if( !email || !password || !role)
        {
            return res.status(400).json({
                message:"Something is missing",
                success:false
            })
        }

        let user = await User.findOne({email});
        // console.log(user)
        if(!user)
        {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        }

        const isCorrectPassword = await user.isPasswordCorrect(password);
        if(!isCorrectPassword)
        {
            return res.status(400).json({
                message: "Incorrect password!. Please enter the correct password",
                success: false
            })
        }


        //check role is correct or not 

        if(role !== user.role)
        {
            return res.status(400).json({
                message: "Role does not match",
                success: false
            })
        }
        const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)
        user = {
            _id: user._id,
            username :user.username,
            phoneNumber : user.phoneNumber,
            email: user.email,
            profile: user.profile,
            role: user.role
        }
        const options = {
            httpOnly: true,
            secure: true
        }
        console.log("User logged in successfully")
        return res.status(200)
        .cookie("refreshToken", refreshToken, options)
        .cookie("accessToken", accessToken, options).
        json({
            message: "User logged in user successfully",
            user,
            success:true
        })

    } catch (error) {
        console.log("Login  error ", error)
    }
}
export const getMe = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user   
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

export const logout = async (req, res) => {
    try {
        await User.findByIdAndUpdate(
            req.id,
            {
                $set: {
                    refreshToken: undefined
                }
            },{
                new: true
            }
        )
    
        const options = {
            httpOnly: true,
            secure : true
        }
        console.log("User logged out successfully")
        return res.status(200).
        clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            {
                message: "User logged out sccessfully",
                success: true
            }
        )
    } catch (error) {
        console.log("log out error ", error)
    }
}
export const updateProfile = async (req, res) => {
  try {
    const { username, email, phoneNumber, skills, bio } = req.body;
    const userId = req.id;

    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false
      });
    }

    const resumeFile = req.files?.resume?.[0];
    const profileFile = req.files?.profilePhoto?.[0];
    console.log("Resume", resumeFile);
    console.log("profile", profileFile);
    
    const resumePath = resumeFile?.path;
    const profilePhotoPath = profileFile?.path;
    console.log(resumePath)
    let resumeUrl = null;
    if (resumePath) {

        const cloudRes = await uploadPdfToCloudinary(resumePath)
        if (cloudRes) resumeUrl = cloudRes.url;
    }
    console.log(resumeUrl)
    let profileUrl = null;
    if (profilePhotoPath) {
    const cloudRes = await uploadOnCloudinary(profilePhotoPath);
    if (cloudRes) profileUrl = cloudRes.url;
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;

    if (skills) {
      user.profile.skills = skills.split(",").map(s => s.trim());
    }

    if (resumeUrl && resumeFile) {
        user.profile.resume = resumeUrl;
        user.profile.resumeOriginalName = resumeFile.originalname;
    }


    if(profileUrl)
    {
        user.profile.profilePhoto = profileUrl;
    }


    await user.save();
    
    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        profile: user.profile
      }
    });

  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({
      message: "Server error while updating profile",
      success: false
    });
  }
};
