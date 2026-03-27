import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    requirements: [
        {
            type: String,
            trim: true,
        }
    ],
    skills: [
        {
            type: String,
            trim: true,
        }
    ],
    experienceLevel: {
        type: Number,
        required: true,
        min: 0,
    },

    salary: {
        type: Number,
        required: true,
        min: 0,
    },
    location: {
        type: String,
        required: true,
    },
    jobType: {
        type: String,
        required: true,
        enum: ["Full-time", "Part-time", "Internship", "Remote"],
    },
    position: {
        type: Number,
        required: true,
        min: 1,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    applications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
    }]
}, { timestamps: true });
export const Job = mongoose.model('Job', jobSchema);
