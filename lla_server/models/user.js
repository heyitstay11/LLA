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
    default: "",
  },
  about: {
    type: String,
    default: "",
  },
  isMentor: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export default mongoose.model("User", userSchema);
