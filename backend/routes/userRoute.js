import express from "express"
import { forgotPassword, login, logout, register, resetPassword, updateProfile, verifyOTP } from "../controllers/userController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/register", singleUpload, register)
router.post("/login", login)
router.get("/logout", logout)
router.post("/profile/update", isAuthenticated, singleUpload, updateProfile)


router.post('/forgot-password', forgotPassword)
router.post('/verify-otp', verifyOTP);
router.post('/reset-password', resetPassword)
export default router;