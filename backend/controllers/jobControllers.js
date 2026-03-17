import { Job } from "../models/jobModel.js";
import { Notification } from "../models/notificationModel.js";
import { User } from "../models/userModel.js";
import { createNotification } from "../utils/createNotification.js";

// export const postJob = async (req, res) => {
//     try {
//         const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;

//         const userId = req.id;

//         if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
//             return res.status(400).json({
//                 message: "Something is missing",
//                 success: false
//             })
//         }

//         const job = await Job.create({
//             title,
//             description,
//             requirements: requirements.split(","),
//             salary: Number(salary),
//             location,
//             jobType,
//             experienceLevel: experience,
//             position,
//             company: companyId,
//             created_by: userId
//         })

//         return res.status(201).json({
//             message: "new job created successfully",
//             job,
//             success: true,

//         })

//     } catch (error) {
//         console.log(error)
//     }
// }

// get all job


// export const postJob = async (req, res) => {
//     try {
//         const {
//             title,
//             description,
//             requirements,
//             salary,
//             location,
//             jobType,
//             experience,
//             position,
//             companyId,
//         } = req.body

//         const userId = req.id

//         if (
//             !title ||
//             !description ||
//             !requirements ||
//             !salary ||
//             !location ||
//             !jobType ||
//             !experience ||
//             !position ||
//             !companyId
//         ) {
//             return res.status(400).json({
//                 message: "All fields are required",
//                 success: false,
//             })
//         }

//         const job = await Job.create({
//             title,
//             description,
//             requirements: requirements.split(",").map((req) => req.trim()),
//             salary: Number(salary),
//             location,
//             jobType,
//             experienceLevel: experience,
//             position: Number(position),
//             company: companyId,
//             created_by: userId,
//         })

//         return res.status(201).json({
//             message: "New job created successfully",
//             job,
//             success: true,
//         })
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({
//             message: "Server error",
//             success: false,
//         })
//     }
// }

export const postJob = async (req, res) => {
    try {
        const {
            title,
            description,
            requirements,
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

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(",").map(r => r.trim()),
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

        return res.status(201).json({
            message: "Job created & notifications sent",
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


//admin ki job 
// export const getAdminJobs = async (req, res) => {
//     try {
//         const adminId = req.id;
//         const jobs = await Job.find({ created_by: adminId }).populate({
//             path: "company",
//             options: { sort: { createdAt: -1 } }
//         })

//         if (!jobs) {
//             return res.status(404).json({
//                 message: "job not found.",
//                 success: false
//             })
//         }
//         return res.status(200).json({
//             jobs,
//             success: true
//         })

//     } catch (error) {
//         console.log(error)
//     }
// }

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




// user Save Job
// Save / Unsave Job
// export const toggleSaveJob = async (req, res) => {
//     try {
//         const userId = req.id; // from auth middleware
//         const jobId = req.params.id;

//         const user = await User.findById(userId);
//         const job = await Job.findById(jobId);

//         if (!job) {
//             return res.status(404).json({
//                 message: "Job not found",
//                 success: false
//             });
//         }

//         const alreadySaved = user.savedJobs.includes(jobId);

// // for notificatiion
//         if (!alreadySaved) {
//             user.savedJobs.push(jobId);
//             await user.save();

//             await createNotification({
//                 receiver: userId,
//                 sender: userId,
//                 title: "Job Saved",
//                 message: `You saved ${job.title}`,
//                 type: "SAVE"
//             });
//         }

//         if (alreadySaved) {
//             // Unsave job
//             user.savedJobs = user.savedJobs.filter(
//                 (id) => id.toString() !== jobId
//             );

//             await user.save();

//             return res.status(200).json({
//                 message: "Job removed from saved list",
//                 success: true
//             });
//         } else {
//             // Save job
//             user.savedJobs.push(jobId);
//             await user.save();

//             return res.status(200).json({
//                 message: "Job saved successfully",
//                 success: true
//             });
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             message: "Internal server error",
//             success: false
//         });
//     }
// };

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