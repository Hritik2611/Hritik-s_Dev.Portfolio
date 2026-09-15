import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import dbConnect from "@/lib/mongodb";
import Otp from "@/models/Otp";

export async function POST() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const emailPass = process.env.EMAIL_APP_PASSWORD;

    if (!adminEmail || !emailPass) {
      return NextResponse.json(
        { success: false, message: "Email service not configured in .env.local" },
        { status: 500 }
      );
    }

    await dbConnect();

    // Purane saare OTP delete karo
    await Otp.deleteMany({});

    // 6-digit secure numeric OTP generate karo
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // MongoDB me save karo
    await Otp.create({ code: otpCode });

    // Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: adminEmail,
        pass: emailPass,
      },
    });

    const mailOptions = {
      from: `"Portfolio Security" <${adminEmail}>`,
      to: adminEmail,
      subject: "Your Admin Portal Login OTP",
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #0c0d12; color: #ffffff; padding: 30px; border-radius: 12px;">
          <h2 style="color: #10b981; margin-top: 0;">Admin Portal Recovery</h2>
          <p style="color: #9ca3af; font-size: 14px;">You requested a one-time passcode to log into your developer portfolio dashboard.</p>
          <div style="background-color: #1a1c24; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 18px; text-align: center; margin: 24px 0;">
            <span style="font-size: 32px; font-weight: 800; letter-spacing: 6px; color: #34d399;">${otpCode}</span>
          </div>
          <p style="color: #9ca3af; font-size: 12px; margin-bottom: 0;">This OTP is valid for <strong>10 minutes</strong>. If you did not request this, please ignore this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: `One-time passcode sent to ${adminEmail}` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Mail Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to send recovery OTP." },
      { status: 500 }
    );
  }
}