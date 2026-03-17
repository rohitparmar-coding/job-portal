import express from "express"
import { deleteJob, getAdminJobs, getAllJobs, getJobById, getSavedJobs, postJob, toggleSaveJob } from "../controllers/jobControllers.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";


const router = express.Router();

router.post("/post",isAuthenticated, postJob);
router.get("/get", getAllJobs);
router.get("/getadminjobs",isAuthenticated, getAdminJobs);
router.get("/get/:id",isAuthenticated, getJobById);

// Save / Unsave Job
router.post("/save/:id", isAuthenticated, toggleSaveJob);

// Get Saved Jobs
router.get("/saved", isAuthenticated, getSavedJobs);

// delete job
router.delete('/delete-Job/:id', isAuthenticated, deleteJob)
export default router;