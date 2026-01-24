import {Application} from "../models/applications.model.js";
import {Job}  from "../models/job.model.js";


export const applyToJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId = req.id;
        const role = req.role
        if(!jobId)
        {
            return res.status(404).json({message: 'JobId is required', success: false});
        }

        if(role === "recruiter")
        {
            return res.status(403).json({message: 'Recruiters cannot apply to jobs', success: false});
        }

        const existingApplication = await Application.findOne({job: jobId, applicant: userId});
        if(existingApplication)
        {
            return res.status(400).json({message: 'You have already applied to this job', success: false});
        }

        const job = await Job.findById(jobId);
        if(!job)
        {
            return res.status(404).json({message: 'Job not found', success: false});
        }


        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        });

        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({message: 'Application submitted successfully', application: newApplication, success: true});


    } catch (error) {
        console.error('Error applying to job:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}

export const getApplications = async (req, res) => {
    try {
        const userId = req.id;
        const applications = await Application.find({applicant: userId}).populate(
            {path: 'job',
            populate: { path: 'company' }
            }
        ).sort({createdAt: -1});

        if(!applications)
        {
            return res.status(404).json({message: 'No applications found', success: false});
        }   

        return res.status(200).json({applications, success: true});
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}

export const getApplicationsForJob = async (req, res) => {
    try {
        const jobId = req.params.id;  
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            populate: { path: 'applicant' }
        });
        if(!job)
        {
            return res.status(404).json({message: 'Job not found', success: false});
        }
        const applications = job.applications;
        return res.status(200).json({applications, success: true});
        
    } catch (error) {
        console.error('Error fetching applications for job:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}

export const updateApplicationStatus = async (req, res) => {
    try {
        const applicationId = req.params.id;
        let {status} = req.body;
        
        if(!status)
        {
            return res.status(400).json({message: 'Status is required', success: false});
        }
        status = status.toLowerCase()
        status += 'ed'
        let application = await Application.findOne({_id: applicationId});
        if(!application)
        {
            return res.status(404).json({message: 'Application not found', success: false});
        }
        
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({message: 'Application status updated successfully', application, success: true});
    } catch (error) {
        console.error('Error updating application status:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}

