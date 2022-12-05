import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    courseId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    payment: {
      type: String,
      required: true,
      default: "hanging",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
