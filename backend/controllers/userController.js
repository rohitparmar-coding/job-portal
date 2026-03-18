
import { User } from "../models/userModel.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import getDataUri from "../utils/datauri.js";
import Cloudinary from "../utils/cloudinary.js";
import { sendEmail } from "../utils/sentEmail.js";


export const register = async (req, res) => {

    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        // console.log(fullname, email, phoneNumber, password, role);
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            })
        }

        // cloudinary 
        let cloudResponse;
        if (req.files?.file) {
            const fileUri = getDataUri(req.files?.file[0]);
            cloudResponse = await Cloudinary.uploader.upload(fileUri.content);
        }


        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exist in this email",
                success: false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: cloudResponse.secure_url,
            }

        })

        return res.status(201).json({
            message: "Account created Successfully",
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


//login
export const login = async (req, res) => {
    try {

        const { email, password, role } = req.body;
        // console.log(email, password, role)
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            })
        }

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User is not exist. Go for Signup",
                success: false
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        }

        // /check role
        if (role !== user.role) {
            return res.status(400).json({
                message: "Role is not match",
                success: false
            })
        }

        // token
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' })


        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        // cookie
        return res.status(200).cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax"
        }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}


// logOut
export const logout = async (req, res) => {
    try {

        res.cookie("token", "", {
            httpOnly: true,
            maxAge: 0,
            expires: new Date(0),
        })

        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Logout failed",
        });
    }
}




export const updateProfile = async (req, res) => {
    try {
        const userId = req.id;

        const { fullname, email, phoneNumber, bio, skills } = req.body || {};

        let skillsArray;
        if (skills && typeof skills === "string") {
            skillsArray = skills
                .split(",")
                .map(skill => skill.trim())
                .filter(skill => skill.length > 0);
        }

        // ✅ First fetch user (IMPORTANT)
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Ensure profile exists
        if (!user.profile) {
            user.profile = {};
        }

        /* Resume Upload */
        if (req.files?.resume) {
            const fileUri = getDataUri(req.files.resume[0]);

            const resumeResponse = await Cloudinary.uploader.upload(
                fileUri.content
            );

            user.profile.resume = resumeResponse.secure_url;
            user.profile.resumeOriginalName =
                req.files.resume[0].originalname;
        }

        /* Profile Image Upload */
        if (req.files?.profileImage) {
            const fileUri = getDataUri(req.files.profileImage[0]);

            const profileImageResponse = await Cloudinary.uploader.upload(
                fileUri.content
            );

            user.profile.profilePhoto = profileImageResponse.secure_url;
        }

        // Update allowed fields
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skillsArray) user.profile.skills = skillsArray;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                profile: user.profile,
            },
        });

    } catch (error) {
        console.error("Update Profile Error:", error);
        return res.status(500).json({
            success: false,
            message: "Profile not updated",
        });
    }
};




// forgot password

// sending otp to email
export const forgotPassword = async (req, res) => {
    try {

        const { email } = req.body;

        const user = await User.findOne({ email });

        // console.log(user)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000);

        user.resetOTP = otp;
        user.resetOTPExpire = Date.now() + 10 * 60 * 1000;

        await user.save();

        await sendEmail(email, otp);

        res.status(200).json({
            success: true,
            message: "OTP sent to email"
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}


// verify otp
export const verifyOTP = async (req, res) => {
    try {

        const { email, otp } = req.body;

        const user = await User.findOne({
            email,
            resetOTP: otp,
            resetOTPExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired OTP"
            });
        }

        res.status(200).json({
            success: true,
            message: "OTP verified"
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}


// reset password

export const resetPassword = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.resetOTP = undefined;
        user.resetOTPExpire = undefined;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Password reset successful"
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}