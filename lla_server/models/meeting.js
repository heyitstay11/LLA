import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    host: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    attendee: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    startTime: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Meeting", meetingSchema);
