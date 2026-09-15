import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Message from "@/models/Message";

export async function GET(req) {
  try {
    const authHeader = req.headers.get("x-admin-password");
    if (authHeader !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const messages = await Message.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: messages }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}