import nodemailer from "nodemailer";

export const sendBulkEmail = async (emails, jobTitle) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // send to multiple users
        await transporter.sendMail({
            from: `"Job Portal" <${process.env.EMAIL_USER}>`,
            bcc: emails, // 🔥 IMPORTANT (hide emails from each other)
            subject: "🚀 New Job Opportunity",
            html: `
             <div style="font-family: Arial; padding:20px">
               <h1 style="color:#4f46e5;">🚀 New Job Alert</h1>
               <p>A new job has been posted:</p>
               <h2>${jobTitle}</h2>
               <p>Don't miss this opportunity!</p>

             <a href="${process.env.CLIENT_URL}/jobs"
                style="padding:10px 20px;background:#4f46e5;color:white;text-decoration:none;border-radius:5px;">
                Apply Now
            </a>
           <p></p>
            </div>
      `,
        });

        console.log("Emails sent successfully");
    } catch (error) {
        console.log("Email error:", error);
    }
};