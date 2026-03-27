import { Job } from "../models/jobModel.js";
import { Notification } from "../models/notificationModel.js";
import { User } from "../models/userModel.js";
import { createNotification } from "../utils/createNotification.js";
import { sendBulkEmail } from "../utils/sendBulkEmail.js";

export const postJob = async (req, res) => {
    try {
        const {
            title,
            description,
            requirements,
            skills,
            salary,
            location,
            jobType,
            experience,
            position,
            companyId,
        } = req.body;

        const recruiterId = req.id;

        const recruiter = await User.findById(recruiterId);

        if (recruiter.role !== "recruiter") {
            return res.status(403).json({
                message: "Only recruiters can post jobs",
                success: false
            });
        }

        //  for Skills
        let formattedSkills;
        // ✅ If array
        if (Array.isArray(skills)) {
            formattedSkills = skills;
        }
        // ✅ If string with |
        else if (skills?.includes("|")) {
            formattedSkills = skills.split("|").map(s => s.trim());
        }
        // ✅ Single skill
        else if (skills) {
            formattedSkills = [skills];
        } else {
            formattedSkills = [];
        }
        // for requirements
        let formattedRequirements;
        // ✅ If frontend sends array → use directly
        if (Array.isArray(requirements)) {
            formattedRequirements = requirements;
        }
        // ✅ If string → split by custom separator
        else if (requirements.includes("|")) {
            formattedRequirements = requirements.split("|").map(r => r.trim());
        }
        // ✅ Otherwise treat as single requirement
        else {
            formattedRequirements = [requirements];
        }

        const job = await Job.create({
            title,
            description,
            requirements: formattedRequirements,
            skills: formattedSkills, // ✅ ADD THIS
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position: Number(position),
            company: companyId,
            created_by: recruiterId,
        });

        // 🔥 Notify all students
        const students = await User.find({ role: "student" });

        const notifications = students.map(student => ({
            receiver: student._id,
            sender: recruiterId,
            title: "New Job Posted",
            message: `${title} is now available`,
            type: "GENERAL"
        }));

        await Notification.insertMany(notifications);

        // extract emails
        const emails = students.map(student => student.email);
        // send email 
        sendBulkEmail(emails, title);

        return res.status(201).json({
            message: "Job created, notifications & emails sent",
            job,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};


export const getAllJobs = async (req, res) => {
    try {

        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({
            path: 'company'
        }).sort({ createdAt: -1 });

        if (jobs.length === 0) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            })
        }

        return res.status(200).json({
            jobs,
            success: true
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}


export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications'
        }).populate({
            path: 'company'
        }).populate({
            path: 'created_by'
        })

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            })
        }

        return res.status(200).json({
            job,
            success: true
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;

        const jobs = await Job.find({ created_by: adminId })
            .populate("company")
            .sort({ createdAt: -1 });   // ✅ correct way to sort

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            });
        }

        return res.status(200).json({
            jobs: jobs || [],
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Save / Unsave Job
export const toggleSaveJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        const user = await User.findById(userId);
        const job = await Job.findById(jobId);

        if (!user || !job) {
            return res.status(404).json({
                message: "User or Job not found",
                success: false
            });
        }

        const alreadySaved = user.savedJobs.includes(jobId);

        if (alreadySaved) {
            // 🔴 UNSAVE
            user.savedJobs = user.savedJobs.filter(
                (id) => id.toString() !== jobId
            );

            await user.save();

            // 🔔 Create notification for unsave
            await createNotification({
                receiver: userId,
                sender: job.created_by,
                title: "Job Removed",
                message: `You removed ${job.title} from saved jobs`,
                type: "SAVE"
            });

            return res.status(200).json({
                message: "Job removed from saved list",
                success: true
            });
        } else {
            // 🟢 Save
            user.savedJobs.push(jobId);
            await user.save();

            await createNotification({
                receiver: userId,
                sender: job.created_by,
                title: "Job Saved",
                message: `You saved ${job.title}`,
                type: "SAVE"
            });

            return res.status(200).json({
                message: "Job saved successfully",
                success: true
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


// get all user saved jobs
export const getSavedJobs = async (req, res) => {
    try {
        const userId = req.id;

        const user = await User.findById(userId)
            .populate({
                path: "savedJobs",
                populate: {
                    path: "company"
                }
            });

        return res.status(200).json({
            savedJobs: user.savedJobs,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};





// deleteJob

export const deleteJob = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findByIdAndDelete(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Job deleted successfully",
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};