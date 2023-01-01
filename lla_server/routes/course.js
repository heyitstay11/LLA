import { Router } from "express";
import Course from "../models/course.js";
import CourseSection from "../models/courseSection.js";
import Order from "../models/order.js";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const courses = await Course.find()
      .limit(20)
      .populate("createdBy", "_id name email");
    res.json(courses);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/mycourses", requireAuth, async (req, res) => {
  const { _id: userId } = req.user || {};
  try {
    const courses = await Order.find({ userId: userId })
      .limit(20)
      .populate("courseId")
      .select("-updatedAt -__v -price -payment");
    res.json(courses);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { section = false } = req.query;
  try {
    const course = await Course.findById(id);
    if (!course)
      return res.send(404).json({ message: "No such course exists" });
    if (section) {
      let sections = await CourseSection.find({ inCourse: id });
      course._doc.sections = sections;
    }
    res.json(course);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/create", requireAuth, async (req, res) => {
  const { title, details, price, learnings, thumbnail, proficiency } = req.body;
  const { _id: userId } = req.user || {};
  try {
    const newCourse = await Course.create({
      title,
      details,
      price,
      learnings,
      thumbnail,
      proficiency,
      createdBy: userId,
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
