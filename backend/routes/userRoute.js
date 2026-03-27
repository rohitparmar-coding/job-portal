import express from "express"
import { forgotPassword, login, logout, register, resetPassword, updateProfile, verifyOTP } from "../controllers/userController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";
import { User } from "../models/userModel.js";

const router = express.Router();

router.post("/register", singleUpload, register)
router.post("/login", login)
router.get("/logout", logout)
router.post("/profile/update", isAuthenticated, singleUpload, updateProfile)

// ✅ GET CURRENT USER
router.get("/me", isAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.id).select("-password");

        return res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch user"
        });
    }
});

router.post('/forgot-password', forgotPassword)
router.post('/verify-otp', verifyOTP);
router.post('/reset-password', resetPassword)



export default router;