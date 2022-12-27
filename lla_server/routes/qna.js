import { Router } from "express";
import Question from "../models/question.js";
import User from "../models/user.js";
import Comment from "../models/comment.js";
import { requireAuth } from "../middlewares/auth.js";
const router = Router();

router.get("/", (req, res) => {
  res.send("QNA");
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const qna = await Question.findById(id).select("-__v");
    if (!qna)
      return res.status(404).json({ message: "No such Question Found" });
    res.json(qna);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/create", requireAuth, async (req, res) => {
  const { question, description, tags = [] } = req.body;
  const { _id: userId } = req.user || {};
  try {
    const user = await User.findById(userId).select("_id");
    if (!user) return res.status(404).json({ message: "No such User Found" });
    const newQuestion = await Question.create({
      question,
      description,
      tags,
      postedBy: userId,
    });
    res.status(201).json({ id: newQuestion._id });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/comment", requireAuth, async (req, res) => {
  const { comment, question } = req.body;
  const { _id: userId } = req.user || {};
  try {
    const user = await User.findById(userId).select("_id");
    if (!user) return res.status(404).json({ message: "No such User Found" });
    const newComment = await Comment.create({
      comment,
      question,
      postedBy: userId,
    });
    res.json({ id: newComment._id });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default router;
