import mongoose from "mongoose";

const quizQuestionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["text", "image", "audio", "audio2text"],
  },
  question: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  options: {
    type: [String],
  },
  answer: {
    type: String,
    required: true,
  },
  imgsrc: {
    type: String,
  },
  audios: {
    type: [String],
  },
  audio: {
    type: String,
  },
  createdIn: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
});

export default mongoose.model("QuizQuestion", quizQuestionSchema);
