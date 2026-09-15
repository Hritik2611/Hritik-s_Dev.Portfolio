import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Otp from "@/models/Otp";

export async function POST(req) {
  try {
    const { otp } = await req.json();

    if (!otp) {
      return NextResponse.json({ success: false, message: "OTP is required" }, { status: 400 });
    }

    await dbConnect();
    const existingOtp = await Otp.findOne({ code: otp.trim() });

    if (!existingOtp) {
      return NextResponse.json({ success: false, message: "Invalid or expired OTP." }, { status: 401 });
    }

    // Ek baar use hone ke baad delete kar do
    await Otp.deleteMany({});

    // Server-side auth verification token return karo
    return NextResponse.json({
      success: true,
      message: "Authentication verified via OTP",
      adminKey: process.env.ADMIN_PASSWORD,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}