import { Router } from "express";
import Course from "../models/course.js";
import CourseSection from "../models/courseSection.js";

const router = Router();

router.get("/", (_, res) => {
  res.send("Course");
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findById(id);
    if (!course)
      return res.send(404).json({ message: "No such course exists" });
    res.json(course);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
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

router.post("/createSection", async (req, res) => {
  const { title, description, courseID, parts } = req.body;
  try {
    const course = await Course.findById(courseID).select("_id createdBy");
    if (!course)
      return res.status(404).json({ message: "No Such Course Exists" });
    const newSection = await CourseSection.create({
      title,
      description,
      parts,
      inCourse: course._id,
    });
    res.status(201).json({ id: newSection._id });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default router;
