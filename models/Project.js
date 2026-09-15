import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
    },
    tags: {
      type: [String],
      default: [],
    },
    githubUrl: {
      type: String,
      default: "https://github.com/Hritik2611",
    },
    liveUrl: {
      type: String,
      default: "#",
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);