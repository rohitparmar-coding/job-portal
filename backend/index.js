import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import connectDB from "./utils/database.js";
import userRoute from './routes/userRoute.js'
import companyRoute from './routes/companyRoute.js'
import jobRoute from "./routes/jobRoute.js"
import applicationRoute from "./routes/applicationRoute.js"
import notificationRoutes from './routes/notificationRoutes.js'

dotenv.config({});

const app = express()
const PORT = process.env.PORT || 8000

// middlerware

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            "http://localhost:5173",
            process.env.CLIENT_URL
        ];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
};
app.use(cors(corsOptions));


// routes // apis
app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});
app.use("/api/v1/user", userRoute)
app.use("/api/v1/company", companyRoute)
app.use("/api/v1/job", jobRoute)
app.use("/api/v1/application", applicationRoute)
app.use("/api/v1/notification", notificationRoutes);


app.listen(PORT, () => {
    connectDB()
    console.log(`Server running ata port ${PORT}`)
})