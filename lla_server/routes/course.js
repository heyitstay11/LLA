import { Router } from "express";
import Course from "../models/course.js";

const router = Router();

router.get("/", (_, res) => {
  res.send("Course");
});

router.post("/create", async (req, res) => {
  const { title, details, price, learnings, thumbnail, proficiency } = req.body;
  try {
    const newCourse = await Course.create({
      title,
      details,
      price,
      learnings,
      thumbnail,
      proficiency,
    });
    res.status(201).json({ id: newCourse._id });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default router;
