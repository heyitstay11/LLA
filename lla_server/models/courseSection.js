import mongoose from "mongoose";

const courseSection = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  parts: {
    type: [Object],
    required: true,
    default: [],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  inCourse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
});

export default mongoose.model("CourseSection", courseSection);
