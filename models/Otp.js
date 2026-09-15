import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    // MongoDB auto-deletes expired OTP document automatically after 10 minutes
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 600, // 600 seconds = 10 minutes
    },
  },
  { timestamps: false }
);

export default mongoose.models.Otp || mongoose.model("Otp", OtpSchema);