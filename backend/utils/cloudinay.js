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

    console.log("Uploading to Cloudinary:", localFilePath);

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "raw",      
    });

    console.log("Uploaded successfully:", response.secure_url);

    // delete temp file
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
    console.log(file);
    
    if (!file) return null;

    console.log("Uploading PDF to Cloudinary:", file);

    const response = await cloudinary.uploader.upload(file, {
      folder: "resumes",
      resource_type: "raw"   // ✅ VERY IMPORTANT FOR PDF
    });

    // delete temp file after upload
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    return response; // contains secure_url
  } catch (error) {
    console.error("PDF upload failed:", error);
    return null;
  }
};




export { uploadOnCloudinary , uploadPdfToCloudinary};
export default cloudinary;
