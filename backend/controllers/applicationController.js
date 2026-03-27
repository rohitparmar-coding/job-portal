import { Application } from "../models/applicationModel.js";
import { Job } from "../models/jobModel.js"
import Cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";


export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        const { country, postalCode, city, area, address, resumeUrl } = req.body;

        const resumeFile = req.files?.resume?.[0];

        if (resumeFile && resumeFile.mimetype !== "application/pdf") {
            return res.status(400).json({
                message: "Only PDF files allowed",
                success: false,
            });
        }

        let resume = "";

        // ✅ CASE 1: Upload to Cloudinary
        if (resumeFile) {
            const fileUri = getDataUri(resumeFile);

            const result = await Cloudinary.uploader.upload(
                fileUri.content,
                {
                    folder: "resumes",
                    resource_type: "auto", // ✅ important for pdf
                }
            );

            resume = result.secure_url; // ✅ STORE URL
        }

        // ✅ CASE 2: Existing resume
        else if (resumeUrl) {
            resume = resumeUrl;
        }

        // ❌ No resume
        else {
            return res.status(400).json({
                message: "Resume is required",
                success: false,
            });
        }

        // ✅ check duplicate
        const existingApplication = await Application.findOne({
            job: jobId,
            applicant: userId,
        });

        if (existingApplication) {
            return res.status(400).json({
                message: "You already applied",
                success: false,
            });
        }

        // ✅ check job
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false,
            });
        }

        // ✅ create application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
            country,
            postalCode,
            city,
            area,
            address,
            resume,
        });

        job.applications.push(newApplication._id);
        await job.save();

        return res.status(200).json({
            message: "Application submitted successfully",
            success: true,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};

// get all applications are user applied
// only for user 

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;

        const application = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: "job",
                populate: {
                    path: "company"
                }
            });

        if (application.length === 0) {
            return res.status(404).json({
                message: "No applications found.",
                success: false,
            });
        }

        return res.status(200).json({
            application,
            success: true,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

// recuiter 
// admin dekhega kitne user ne apply kiya hai 
// for spacific job ke liye
export const getApplicants = async (req, res) => {
    try {

        const jobId = req.params.id;

        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant'
            }
        })
        if (!job) {
            return res.status(404).json({
                message: 'Job not found',
                success: false,
            })
        }

        return res.status(200).json({
            job,
            success: true,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}



export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;

        if (!status) {
            return res.status(400).json({
                message: "Status is required",
                success: false,
            });
        }

        const application = await Application.findById(applicationId);

        if (!application) {
            return res.status(404).json({
                message: "Application not found.",
                success: false,
            });
        }

        // Normalize status (Accepted, Rejected, Pending)
        const formattedStatus =
            status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

        application.status = formattedStatus;

        await application.save();

        return res.status(200).json({
            message: "Status updated successfully.",
            application,
            success: true,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};