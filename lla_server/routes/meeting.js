import { Router } from "express";
import Meeting from "../models/meeting.js";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const sessions = await Meeting.find().limit(20);
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
    const session = await Meeting.findByIdAndUpdate(
      meetingId,
      {
        $set: { attendee: userId },
      },
      { new: true }
    );
    res.json(session);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default router;
