
import nodemailer from "nodemailer";

export const sendEmail = async (email, otp) => {
  try {

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const info = await transporter.sendMail({
      from: `"Job Portal" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset OTP",
      html: `
        <div style="font-family: Arial; padding:20px">
          <h2>Password Reset Request</h2>
          <p>Your OTP code is:</p>
          <h1 style="color:#4f46e5">${otp}</h1>
          <p>This OTP will expire in <b>10 minutes</b>.</p>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      `
    });

    console.log("Email sent:", info.messageId);

  } catch (error) {
    console.log("Email error:", error);
  }
};