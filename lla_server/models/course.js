import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  proficiency: {
    type: String,
    required: true,
    default: "Beginner",
  },
  price: {
    type: String,
    required: true,
    default: 0,
  },
  thumbnail: {
    type: String,
    required: true,
    default: "https://via.placeholder.com/600x400.png",
  },
  learnings: {
    type: [String],
    required: true,
    default: [],
  },
  enrolled: {
    type: Number,
    required: true,
    default: 1,
  },
  ratings: {
    type: Number,
    required: true,
    default: 1,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Course", courseSchema);
