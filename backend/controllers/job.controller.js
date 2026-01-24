import {Job} from '../models/job.model.js';

export const createJob = async (req, res) => {
    try {
        const {title, description, company, location, jobType, requirements, salary, positions, experience} = req.body;
        if (!title || !description || !company || !location || !jobType || !requirements || !salary || !positions) {
            return res.status(400).json({message: 'All required fields must be filled'});
        }

        const job = await Job.create({
            title,
            description,
            company,
            location,
            jobType,
            requirements : requirements.split(","),
            salary : Number(salary),
            positions: Number(positions),
            experience : Number(experience),
            created_by: req.id
        })

        return res.status(201).json({message: 'New Job created successfully', job, success: true});
    } catch (error) {
        console.error('Error creating job:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const query = keyword
      ? {
          $or: [
            { title: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } }
          ]
        }
      : {};

    const jobs = await Job.find(query)
      .populate("company")
      .sort({ createdAt: -1 });

    return res.status(200).json({ jobs, success: true });

  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "company"
        }).populate('created_by').populate('applications');
        if(!job)
        {
            return res.status(404).json({message: 'Job not found', success: false});
        }
        return res.status(200).json({job, success: true});
    } catch (error) {
        console.error('Error fetching job by ID:', error);
        res.status(500).json({message: 'Internal server error'});

    }
}

export const getAllJobsCreatedByAdmin = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({created_by: adminId}).populate({
            path:"company",
        }
        ).sort({createdAt: -1});
        if(!jobs)
        {
            return res.status(404).json({message: 'No jobs found for this admin', success: false});
        }
        return res.status(200).json({jobs, success: true});
    } catch (error) {
        console.error('Error fetching jobs created by admin:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}