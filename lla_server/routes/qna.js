import { Router } from "express";
import Question from "../models/question.js";
import User from "../models/user.js";
import Comment from "../models/comment.js";
import { requireAuth } from "../middlewares/auth.js";
const router = Router();

router.get("/", async (req, res) => {
  try {
    const questions = await Question.find()
      .select("question tags description _id")
      .limit(10);
    res.json(questions);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const qna = await Question.findById(id).select("-__v");
    if (!qna)
      return res.status(404).json({ message: "No such Question Found" });
    const comments = await Comment.find({ question: id })
      .populate("postedBy", "email name _id")
      .select("-updatedAt -__v");
    const findReply = comments.map(async (com) =>
      Comment.find({ parent: com._id })
        .populate("postedBy", "email name _id")
        .select("-updatedAt -__v")
    );
    const commentChilds = await Promise.all(findReply);
    for (let i = 0; i < comments.length; i++) {
      if (commentChilds[i].length > 0)
        comments[i]._doc.replies = commentChilds[i];
    }
    res.json({ qna, comments });
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
  const { comment, question, parent = undefined } = req.body;
  const { _id: userId } = req.user || {};
  try {
    const user = await User.findById(userId).select("_id");
    if (!user) return res.status(404).json({ message: "No such User Found" });
    const newComment = await Comment.create({
      comment,
      question,
      postedBy: userId,
      parent,
    });
    res.json({ id: newComment._id });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.delete("/comment/:id", requireAuth, async (req, res) => {
  const { id: commentId } = req.params;
  const { _id: userId } = req.user || {};
  try {
    const user = await User.findById(userId).select("_id");
    if (!user) return res.status(404).json({ message: "No such User Found" });

    const comment = await Comment.findById(commentId)
      .select("_id")
      .populate("postedBy", "_id");
    if (!comment)
      return res.status(404).json({ message: "No such Comment Exists" });

    if (comment.postedBy._id.toString() !== userId)
      return res.status(401).json({ message: "Unauthorized" });

    // delete the replies
    await Comment.deleteMany({ parent: comment._id });
    await comment.deleteOne();

    res.json({ id: commentId });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default router;
