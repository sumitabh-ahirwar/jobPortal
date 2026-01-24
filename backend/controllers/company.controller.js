import {Company} from '../models/company.model.js'
import { uploadOnCloudinary } from '../utils/cloudinay.js';

export const registerCompany = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Company name required", success: false });
    }
    if (!description) {
      return res.status(400).json({ message: "Decription required", success: false });
    }
    const existing = await Company.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "Company already exists", success: false });
    }

    const company = await Company.create({
      name,
      description,
      userId: req.id
    });

    res.status(201).json({
      message: "Company registered successfully",
      success: true,
      company
    });

  } catch (error) {
    console.error("Company registration error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getCompany = async (req, res) => {
  try {
    const companies = await Company.find({ userId: req.id });

    return res.status(200).json({
        success: true,
        companies
    })

  } catch (error) {
    console.error("getCompany error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({ message: "Company not found", success: false });
    }

    res.status(200).json({ success: true, company });

  } catch (error) {
    console.error("getCompanyById error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const updateCompany = async (req, res) => {
  try {

    const {name , description, website, location} = req.body;
    const logopath = req?.files?.logo?.[0]?.path;
    let logo = null;
    if(logopath)
    {
      const res = await uploadOnCloudinary(logopath)
      if(res) logo = res.secure_url
    }
    const updateData = {name, description, website, location, logo}
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!company) {
      return res.status(404).json({ message: "Company not found", success: false });
    }
    res.status(200).json({
      success: true,
      message: "Company updated",
      company
    });

  } catch (error) {
    console.error("updateCompany error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
