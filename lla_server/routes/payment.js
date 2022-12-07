import { Router } from "express";
import Order from "../models/order.js";
import crypto from "crypto";
import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();
const router = Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZOR_KEY_ID,
  key_secret: process.env.RAZOR_KEY_SECRET,
});

router.get("/", (req, res) => {
  res.send("hello");
});

router.post("/razorpay", async (req, res) => {
  const { price, courseId } = req.body;
  try {
    const order = await Order.create({
      courseId,
      price,
      userId: "",
    });

    const options = {
      amount: order.price * 100,
      currency: "INR",
      receipt: courseId,
      payment_capture: 1,
    };

    const razorResponse = await razorpay.orders.create(options);
    res.json({ ...razorResponse, orderId: order._id });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/verify", async (req, res) => {
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    orderId,
  } = req.body;
  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  try {
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZOR_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");
    if (razorpay_signature === expectedSign) {
      const order = await Order.findById(orderId);
      order.payment = "done";
      await order.save();
      return res.json({ msg: "Payment Verified" });
    }
    return res.status(400).json({ err: "Invalid Signature" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

export default router;
