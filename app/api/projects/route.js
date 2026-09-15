import { NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";

// GET all projects
export async function GET() {
  try {
    await dbConnect();
    const projects = await Project.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: projects }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST new project
export async function POST(req) {
  try {
    const authHeader = req.headers.get("x-admin-password");
    if (authHeader !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Invalid admin password" },
        { status: 401 }
      );
    }

    const body = await req.json();
    await dbConnect();

    let tagsArray = body.tags;
    if (typeof tagsArray === "string") {
      tagsArray = tagsArray.split(",").map((t) => t.trim()).filter(Boolean);
    }

    const newProject = await Project.create({
      ...body,
      tags: tagsArray,
    });

    return NextResponse.json({ success: true, data: newProject }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// DELETE project
export async function DELETE(req) {
  try {
    const authHeader = req.headers.get("x-admin-password");
    if (authHeader !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Invalid admin password" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Project ID is required" },
        { status: 400 }
      );
    }

    // Agar ID valid MongoDB ObjectId nahi hai (jaise dummy starter ID "1" ya "2")
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: true, message: "Project removed successfully" },
        { status: 200 }
      );
    }

    await dbConnect();
    const deleted = await Project.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Project not found in database" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Project deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}