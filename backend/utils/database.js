import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB connected ✅");
    } catch (error) {
        console.log("MongoDB connection error ❌");
        console.log(error.message);
        process.exit(1); // 👈 important
    }
};

export default connectDB;