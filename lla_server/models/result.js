import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    givenAnswers: {
      type: Array,
      required: true,
    },
    total: {
      type: Number,
      required: true,
      default: 0,
    },
    score: {
      type: Number,
      required: true,
      default: 0,
    },
    timeTaken: {
      type: Number,
      required: true,
      default: 0,
    },
    attemptedQuiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
    },
    attemptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Result", resultSchema);
