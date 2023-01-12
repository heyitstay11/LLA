import { Router } from "express";
import Meeting from "../models/meeting.js";
import { requireAuth } from "../middlewares/auth.js";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto";
import User from "../models/user.js";

dotenv.config();
const router = Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZOR_KEY_ID,
  key_secret: process.env.RAZOR_KEY_SECRET,
});

router.get("/", async (req, res) => {
  try {
    const sessions = await Meeting.find({ booked: false })
      .populate("host", "name")
      .select("-createdAt -updatedAt -__v")
      .limit(20);
    res.json(sessions);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/my", requireAuth, async (req, res) => {
  const { _id: userId = "" } = req.user || {};
  try {
    const sessions = await Meeting.find({
      booked: true,
      $or: [{ host: userId }, { attendee: userId }],
    })
      .populate("host", "name")
      .select("-createdAt -updatedAt -__v");
    res.json(sessions);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/create", requireAuth, async (req, res) => {
  const { title, date, duration, price } = req.body;
  const { _id: userId = "" } = req.user || {};
  try {
    const session = await Meeting.create({
      host: userId,
      title,
      duration,
      startTime: date,
      price,
    });
    res.json(session);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/book", requireAuth, async (req, res) => {
  const { meetingId } = req.body;
  const { _id: userId = "" } = req.user || {};
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "No such user exists" });

    const meeting = await Meeting.findById(meetingId);
    if (!meeting)
      return res.status(404).json({ message: "No such session exists" });
    const options = {
      amount: meeting.price * 100,
      currency: "INR",
      receipt: meetingId,
      payment_capture: 1,
    };
    const razorResponse = await razorpay.orders.create(options);

    res.json({ ...razorResponse, orderId: meetingId });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
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
      const order = await Meeting.findById(orderId);
      order.booked = true;
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
