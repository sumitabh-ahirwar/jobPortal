import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv"
dotenv.config({})
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET
});


const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;


    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "raw",      
    });


    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return response;

  } catch (error) {
    console.error("Cloudinary upload failed:", error.message);
    return null;
  }
};

const uploadPdfToCloudinary = async (file) => {
  try {
    
    if (!file) return null;
    const response = await cloudinary.uploader.upload(file, {
      folder:"resumes",
      resource_type: "image",
      format:'pdf'
    });
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    return response; // contains secure_url
  } catch (error) {
     if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
    console.error("PDF upload failed:", error);
    return null;
  }
};




export { uploadOnCloudinary , uploadPdfToCloudinary};
export default cloudinary;
