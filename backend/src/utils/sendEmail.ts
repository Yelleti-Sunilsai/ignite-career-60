import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOtpEmail = async (email: string, otp: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER || "noreply@ignitecareer.com",
    to: email,
    subject: "Your Account Verification OTP",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Welcome to Ignite Career!</h2>
        <p>Please click the link below or use the following 6-digit code to verify your account.</p>
        <div style="background-color: #f4f4f4; padding: 12px; font-size: 24px; font-weight: bold; text-align: center; letter-spacing: 4px; margin-bottom: 20px;">
          ${otp}
        </div>
        <a href="http://localhost:5173/signup?email=${encodeURIComponent(email)}&otp=${otp}" style="display: inline-block; padding: 12px 24px; background-color: #7c3aed; color: white; text-decoration: none; border-radius: 4px; font-weight: bold;">Verify Account</a>
        <p style="margin-top: 20px;">This code and link will expire in 10 minutes.</p>
        <p>If you did not request this, please ignore this email.</p>
      </div>
    `,
  };

  try {
    // If credentials are not provided, just log it for testing
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log(`[TEST MODE] Would send OTP ${otp} to ${email}`);
      return;
    }
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Could not send verification email");
  }
};
