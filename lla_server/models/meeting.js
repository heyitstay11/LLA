import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema(
  {
    host: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    attendee: {
      type: [mongoose.Types.ObjectId],
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Meeting", meetingSchema);
