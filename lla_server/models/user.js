import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    default: "",
  },
  about: {
    type: String,
    required: true,
    default: "",
  },
  isMentor: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export default mongoose.model("User", userSchema);
